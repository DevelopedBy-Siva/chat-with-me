const logger = require("../../logger");
const messageQueue = require("../queue/sqs");
const db = require("../../socket/db");
const { decrypt } = require("../../utils/messages");

let isRunning = false;
let pollTimeout = null;
const processingMessages = new Set();

let getSocketServer = null;
let JOINED_IDS = null;

function initialize(socketModule) {
  getSocketServer = socketModule.getSocketServer;
  JOINED_IDS = socketModule.JOINED_IDS;

  if (!getSocketServer || !JOINED_IDS) {
    logger.error("Worker initialization failed: Missing socket dependencies");
    return false;
  }

  logger.info("Worker initialized with socket dependencies");
  return true;
}

function isRecipientOnline(recipientId) {
  if (!JOINED_IDS) return false;

  const ids = [...JOINED_IDS];
  const found = ids.some((id) => id.startsWith(recipientId));

  if (found) {
    logger.info(`${recipientId} is ONLINE`);
  } else {
    logger.info(`${recipientId} is OFFLINE`);
  }

  return found;
}

function getConnectionId(recipientId) {
  if (!JOINED_IDS) return recipientId;

  const ids = [...JOINED_IDS];
  const found = ids.find((id) => id.startsWith(recipientId));
  return found || recipientId;
}

async function deliverMessage(messageData) {
  const {
    recipientId,
    chatId,
    data,
    isPrivate,
    senderEmail,
    senderName,
    senderAvatarId,
    exists,
  } = messageData;

  try {
    if (!isRecipientOnline(recipientId)) {
      return { delivered: false, reason: "offline" };
    }

    const io = getSocketServer ? getSocketServer() : null;
    if (!io) {
      logger.error("Socket server not available");
      return { delivered: false, reason: "no_socket_server" };
    }

    const connectionId = getConnectionId(recipientId);

    let newContact;
    if (!exists) {
      newContact = await db.getUserDetails(senderEmail);
      if (newContact) {
        newContact.chatId = chatId;
        newContact.lastMessage = {
          message: data.message,
          timestamp: data.createdAt,
          uuid: data.msgId,
        };
      }
    }

    io.to(connectionId).emit("receive-message", {
      data: data, // Send encrypted (client decrypts)
      chatId: chatId,
      isPrivate: isPrivate,
      senderName: senderName || "",
      senderAvatarId: senderAvatarId || "",
      senderEmail: senderEmail,
      newContact: newContact,
    });

    logger.info(`Message delivered to ${recipientId}`);
    return { delivered: true };
  } catch (error) {
    logger.error(`Failed to deliver message:`, error);
    return { delivered: false, reason: error.message };
  }
}

async function processMessage(message) {
  const messageId = message.MessageId;
  const receiptHandle = message.ReceiptHandle;

  if (processingMessages.has(messageId)) {
    return;
  }

  processingMessages.add(messageId);

  try {
    const messageData = JSON.parse(message.Body);

    logger.info(`Processing message: ${messageData.messageId}`);
    logger.info(
      `   From: ${messageData.senderEmail} → To: ${messageData.recipientId}`
    );

    const result = await deliverMessage(messageData);

    if (result.delivered) {
      await messageQueue.deleteMessage(receiptHandle);
      logger.info(`Message processed and deleted from queue`);
    } else {
      logger.warn(`Delivery failed (${result.reason}), will retry`);
    }
  } catch (error) {
    logger.error(`Error processing message:`, error);
  } finally {
    processingMessages.delete(messageId);
  }
}

async function pollQueue() {
  if (!isRunning) {
    logger.info("Polling stopped");
    return;
  }

  try {
    const messages = await messageQueue.receiveMessages(10);

    if (messages.length > 0) {
      logger.info(`Received ${messages.length} messages from queue`);
      await Promise.all(messages.map((msg) => processMessage(msg)));
    }

    const metrics = await messageQueue.getQueueMetrics();
    if (
      metrics &&
      (metrics.messagesAvailable > 0 || metrics.messagesInFlight > 0)
    ) {
      logger.info(
        `Queue: ${metrics.messagesAvailable} waiting, ${metrics.messagesInFlight} in-flight`
      );
    }
  } catch (error) {
    logger.error("Polling error:", error);
  }

  if (isRunning) {
    pollTimeout = setTimeout(pollQueue, 1000);
  }
}

function start(socketModule) {
  if (isRunning) {
    logger.warn("Worker already running");
    return;
  }

  const initialized = initialize(socketModule);
  if (!initialized) {
    logger.error("Worker start failed");
    return;
  }

  logger.info("Starting message worker...");
  logger.info("Polling SQS queue...");

  isRunning = true;
  pollQueue();
}

async function stop() {
  if (!isRunning) {
    return;
  }

  logger.info("Stopping worker...");
  isRunning = false;

  if (pollTimeout) {
    clearTimeout(pollTimeout);
    pollTimeout = null;
    logger.info("Cleared polling timeout");
  }

  let waitCount = 0;
  while (processingMessages.size > 0 && waitCount < 30) {
    logger.info(`Waiting for ${processingMessages.size} messages to finish...`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    waitCount++;
  }

  if (processingMessages.size > 0) {
    logger.warn(
      `Force stopping with ${processingMessages.size} messages still processing`
    );
  }

  logger.info("Worker stopped");
}

function getStatus() {
  return {
    running: isRunning,
    processingCount: processingMessages.size,
  };
}

module.exports = {
  start,
  stop,
  getStatus,
};

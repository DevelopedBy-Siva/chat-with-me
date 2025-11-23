const config = require("config");
const { Server } = require("socket.io");

const db = require("./db");
const logger = require("../logger");
const { authorizeSocket } = require("../auth");
const { ErrorCodes } = require("../exceptions");
const messageQueue = require("../services/queue/sqs");
const cloudwatch = require("../services/monitoring/cloudwatch"); // ADD THIS

const JOINED_IDS = new Set();

let io;

module.exports.getSocketServer = () => io;

module.exports.connect = (server) => {
  const sqsEnabled = messageQueue.initializeSQS();
  if (sqsEnabled) {
    logger.info("Message queueing enabled (AWS SQS)");
  } else {
    logger.info("Direct delivery mode (SQS disabled)");
  }

  io = new Server(server, {
    cors: {
      origin: config.get("client_url"),
    },
  });

  io.use((socket, next) => {
    const id = socket.handshake.query.id;
    const token = socket.handshake.query.token;

    if (!authorizeSocket(token))
      return next(new Error(ErrorCodes.ERR_FORBIDDEN));

    const isOn = isUserAlreadyLoggedIn(id);
    if (isOn) return next(new Error(ErrorCodes.ERR_DEVICE_ALREADY_CONNECTED));

    next();
  });

  io.on("connection", (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);
    JOINED_IDS.add(id);

    logger.info(`User connected: ${id}`);

    cloudwatch.Metrics.userConnected();
    cloudwatch.Metrics.activeUsers(JOINED_IDS.size);

    socket.on("getOnline", () => {
      io.emit("online", { online: getOnlineIds() });
    });

    socket.on("send-message", async (payload, callback) => {
      const startTime = Date.now();
      try {
        const {
          recipients = [],
          data,
          chatId,
          isPrivate,
          senderName,
          senderAvatarId,
          senderEmail,
        } = payload;

        logger.info(`Message from ${senderEmail} to chat ${chatId}`);

        const exists = await db.addContactIfNotExists(
          isPrivate,
          recipients,
          senderEmail,
          chatId
        );

        const chat = await db.saveMessageToChatIfExists(data, chatId, [
          senderEmail,
        ]);

        if (!chat) {
          return callback({
            success: false,
            error: "Failed to save message",
          });
        }

        if (messageQueue.isEnabled()) {
          // Queue for delivery via SQS worker
          const recipientList = isPrivate
            ? recipients
            : await getGroupRecipients(chatId, senderEmail);

          for (const recipientId of recipientList) {
            await messageQueue.enqueueMessage({
              messageId: data.msgId,
              recipientId: recipientId,
              chatId: chatId,
              data: data,
              isPrivate: isPrivate,
              senderEmail: senderEmail,
              senderName: senderName,
              senderAvatarId: senderAvatarId,
              exists: exists,
              timestamp: new Date().toISOString(),
            });
          }

          callback({
            success: true,
            messageId: data.msgId,
            queued: true,
            recipients: recipientList.length,
          });
        } else {
          await deliverMessageDirect(socket, {
            recipients,
            data,
            chatId,
            isPrivate,
            senderEmail,
            senderName,
            senderAvatarId,
            exists,
          });

          callback({
            success: true,
            messageId: data.msgId,
            direct: true,
          });
        }

        cloudwatch.Metrics.messagesQueued();
        const latency = Date.now() - startTime;
        cloudwatch.Metrics.apiLatency(latency);

        callback({ success: true, messageId: data.msgId, queued: true });
      } catch (ex) {
        logger.error("Send message error:", ex);
        cloudwatch.Metrics.apiError();
        callback({ success: false, error: ex.message });
      }
    });

    socket.on("disconnect", () => {
      JOINED_IDS.delete(id);
      logger.info(`User disconnected: ${id}`);
      io.emit("online", { online: getOnlineIds() });

      cloudwatch.Metrics.userDisconnected();
      cloudwatch.Metrics.activeUsers(JOINED_IDS.size);
    });
  });
};

async function getGroupRecipients(chatId, senderEmail) {
  try {
    const groupChat = await db.getGroupDetails(chatId);
    if (groupChat) {
      return groupChat.members
        .filter((m) => m.email !== senderEmail)
        .map((m) => m.ref);
    }
  } catch (err) {
    logger.error("Error getting group recipients:", err);
  }
  return [];
}

async function deliverMessageDirect(socket, payload) {
  const {
    recipients,
    data,
    chatId,
    isPrivate,
    senderEmail,
    senderName,
    senderAvatarId,
    exists,
  } = payload;

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

  let finalRecipients = recipients;
  if (!isPrivate) {
    finalRecipients = await getGroupRecipients(chatId, senderEmail);
  }

  finalRecipients.forEach((to) => {
    const connectionId = getConnectionId(to);
    socket.broadcast.to(connectionId).emit("receive-message", {
      data,
      chatId,
      isPrivate,
      senderName,
      senderAvatarId,
      senderEmail,
      newContact,
    });
  });
}

function getOnlineIds() {
  let onlineIds = [];
  [...JOINED_IDS].forEach((i) => {
    if (i) {
      const splitted = i.split("--__--");
      if (splitted && splitted.length > 0) onlineIds.push(splitted[0]);
    }
  });
  return onlineIds;
}

function isUserAlreadyLoggedIn(id) {
  const ids = [...JOINED_IDS];
  const lookup = id.split("--__--")[0];
  const index = ids.findIndex((i) => i.startsWith(lookup));
  return index !== -1;
}

function getConnectionId(id) {
  const ids = [...JOINED_IDS];
  const index = ids.findIndex((i) => i.startsWith(id));
  return index === -1 ? id : ids[index];
}

module.exports.getConnectionId = getConnectionId;
module.exports.getSocketServer = () => io;
module.exports.JOINED_IDS = JOINED_IDS;

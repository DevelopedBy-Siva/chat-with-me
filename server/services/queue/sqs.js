const {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  GetQueueAttributesCommand,
} = require("@aws-sdk/client-sqs");
const logger = require("../../logger");
const config = require("config");

let sqsClient = null;
let queueUrl = null;
let dlqUrl = null;

function initializeSQS() {
  const region = config.get("sqs.region");
  queueUrl = config.get("sqs.url");
  dlqUrl = config.get("sqs.dlq_url");

  if (!region || !queueUrl) {
    logger.warn("SQS not configured. Set AWS_REGION and SQS_QUEUE_URL");
    return false;
  }

  try {
    sqsClient = new SQSClient({
      region: region,
      credentials: {
        accessKeyId: config.get("sqs.key"),
        secretAccessKey: config.get("sqs.secret"),
      },
    });

    logger.info(`SQS Client initialized (Region: ${region})`);
    logger.info(`Queue URL: ${queueUrl}`);
    return true;
  } catch (error) {
    logger.error("Failed to initialize SQS:", error);
    return false;
  }
}

async function enqueueMessage(messageData) {
  if (!sqsClient || !queueUrl) {
    logger.warn("SQS not initialized, skipping queue");
    return null;
  }

  try {
    const command = new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(messageData),
      MessageAttributes: {
        MessageType: {
          DataType: "String",
          StringValue: "chat-message",
        },
        Priority: {
          DataType: "Number",
          StringValue: messageData.priority || "1",
        },
        Timestamp: {
          DataType: "String",
          StringValue: new Date().toISOString(),
        },
      },
    });

    const response = await sqsClient.send(command);

    logger.info(`Message queued: ${response.MessageId}`);
    logger.info(
      `   Chat: ${messageData.chatId}, Recipient: ${messageData.recipientId}`
    );

    return {
      messageId: response.MessageId,
      success: true,
    };
  } catch (error) {
    logger.error("Failed to enqueue message:", error);
    throw error;
  }
}

async function receiveMessages(maxMessages = 10) {
  if (!sqsClient || !queueUrl) {
    return [];
  }

  try {
    const command = new ReceiveMessageCommand({
      QueueUrl: queueUrl,
      MaxNumberOfMessages: maxMessages,
      WaitTimeSeconds: 20,
      MessageAttributeNames: ["All"],
      VisibilityTimeout: 30,
    });

    const response = await sqsClient.send(command);

    if (response.Messages && response.Messages.length > 0) {
      logger.info(
        `📨 Received ${response.Messages.length} messages from queue`
      );
      return response.Messages;
    }

    return [];
  } catch (error) {
    logger.error("Failed to receive messages:", error);
    return [];
  }
}

async function deleteMessage(receiptHandle) {
  if (!sqsClient || !queueUrl) {
    return false;
  }

  try {
    const command = new DeleteMessageCommand({
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    });

    await sqsClient.send(command);
    logger.info("Message deleted from queue");
    return true;
  } catch (error) {
    logger.error("Failed to delete message:", error);
    return false;
  }
}

async function getQueueMetrics() {
  if (!sqsClient || !queueUrl) {
    return null;
  }

  try {
    const command = new GetQueueAttributesCommand({
      QueueUrl: queueUrl,
      AttributeNames: [
        "ApproximateNumberOfMessages",
        "ApproximateNumberOfMessagesNotVisible",
        "ApproximateNumberOfMessagesDelayed",
      ],
    });

    const response = await sqsClient.send(command);

    return {
      messagesAvailable: parseInt(
        response.Attributes.ApproximateNumberOfMessages
      ),
      messagesInFlight: parseInt(
        response.Attributes.ApproximateNumberOfMessagesNotVisible
      ),
      messagesDelayed: parseInt(
        response.Attributes.ApproximateNumberOfMessagesDelayed
      ),
    };
  } catch (error) {
    logger.error("Failed to get queue metrics:", error);
    return null;
  }
}

function isEnabled() {
  return sqsClient !== null && queueUrl !== null;
}

module.exports = {
  initializeSQS,
  enqueueMessage,
  receiveMessages,
  deleteMessage,
  getQueueMetrics,
  isEnabled,
};

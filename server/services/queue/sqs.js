const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const config = require("config");
const logger = require("../../logger");

// SQS Client (will be configured with AWS credentials)
let sqsClient = null;

function initializeSQS() {
  if (!process.env.AWS_REGION) {
    logger.warn("AWS_REGION not set, SQS disabled");
    return;
  }

  sqsClient = new SQSClient({
    region: process.env.AWS_REGION,
    // Credentials will be loaded from environment or IAM role
  });

  logger.info("SQS Client initialized");
}

async function enqueueMessage(messageData) {
  if (!sqsClient) {
    logger.warn("SQS not initialized, skipping queue");
    return null;
  }

  try {
    const command = new SendMessageCommand({
      QueueUrl: process.env.SQS_QUEUE_URL,
      MessageBody: JSON.stringify(messageData),
      MessageAttributes: {
        MessageType: {
          DataType: "String",
          StringValue: "chat-message",
        },
      },
    });

    const response = await sqsClient.send(command);
    logger.info(`Message queued: ${response.MessageId}`);
    return response;
  } catch (error) {
    logger.error("Failed to enqueue message:", error);
    throw error;
  }
}

module.exports = {
  initializeSQS,
  enqueueMessage,
};

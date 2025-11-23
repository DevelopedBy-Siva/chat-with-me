const {
  CloudWatchClient,
  PutMetricDataCommand,
} = require("@aws-sdk/client-cloudwatch");
const logger = require("../../logger");
const config = require("config");

let cloudwatchClient = null;
const NAMESPACE = "ChatApp/Production";

function initializeCloudWatch() {
  const region = config.get("sqs.region");

  if (!region) {
    logger.warn("CloudWatch not configured. Set AWS_REGION");
    return false;
  }

  try {
    cloudwatchClient = new CloudWatchClient({
      region: region,
      credentials: {
        accessKeyId: config.get("sqs.key"),
        secretAccessKey: config.get("sqs.secret"),
      },
    });

    logger.info(`CloudWatch initialized (Region: ${region})`);
    return true;
  } catch (error) {
    logger.error("Failed to initialize CloudWatch:", error);
    return false;
  }
}

async function putMetric(metricName, value, unit = "Count") {
  if (!cloudwatchClient) {
    return;
  }

  try {
    const command = new PutMetricDataCommand({
      Namespace: NAMESPACE,
      MetricData: [
        {
          MetricName: metricName,
          Value: value,
          Unit: unit,
          Timestamp: new Date(),
        },
      ],
    });

    await cloudwatchClient.send(command);
    logger.info(`CloudWatch metric: ${metricName} = ${value}`);
  } catch (error) {
    logger.error(`Failed to send metric ${metricName}:`, error);
  }
}

async function putMetrics(metrics) {
  if (!cloudwatchClient || !metrics || metrics.length === 0) {
    return;
  }

  try {
    const metricData = metrics.map((metric) => ({
      MetricName: metric.name,
      Value: metric.value,
      Unit: metric.unit || "Count",
      Timestamp: new Date(),
      Dimensions: metric.dimensions || [],
    }));

    const command = new PutMetricDataCommand({
      Namespace: NAMESPACE,
      MetricData: metricData,
    });

    await cloudwatchClient.send(command);
    logger.info(`Sent ${metrics.length} metrics to CloudWatch`);
  } catch (error) {
    logger.error("Failed to send metrics:", error);
  }
}

const Metrics = {
  queueDepth: (depth) => putMetric("QueueDepth", depth, "Count"),
  messagesQueued: () => putMetric("MessagesQueued", 1, "Count"),
  messagesDelivered: () => putMetric("MessagesDelivered", 1, "Count"),
  messagesFailed: () => putMetric("MessagesFailed", 1, "Count"),

  apiRequest: () => putMetric("APIRequests", 1, "Count"),
  apiLatency: (ms) => putMetric("APILatency", ms, "Milliseconds"),
  apiError: () => putMetric("ErrorCount", 1, "Count"),

  activeUsers: (count) => putMetric("ActiveUsers", count, "Count"),
  userConnected: () => putMetric("UserConnections", 1, "Count"),
  userDisconnected: () => putMetric("UserDisconnections", 1, "Count"),

  workerProcessing: (count) => putMetric("WorkerProcessing", count, "Count"),
};

module.exports = {
  initializeCloudWatch,
  putMetric,
  putMetrics,
  Metrics,
};

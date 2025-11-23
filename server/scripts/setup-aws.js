const {
  CloudWatchClient,
  PutDashboardCommand,
} = require("@aws-sdk/client-cloudwatch");
const config = require("config");

async function createDashboard() {
  const client = new CloudWatchClient({ region: config.get("sqs.region") });

  const dashboardBody = {
    widgets: [
      {
        type: "metric",
        properties: {
          metrics: [
            ["ChatApp/Production", "QueueDepth"],
            [".", "MessagesQueued"],
            [".", "MessagesDelivered"],
          ],
          period: 60,
          stat: "Sum",
          region: config.get("sqs.region"),
          title: "Message Queue Metrics",
        },
      },
      {
        type: "metric",
        properties: {
          metrics: [
            ["ChatApp/Production", "ActiveUsers"],
            [".", "UserConnections"],
            [".", "UserDisconnections"],
          ],
          period: 60,
          stat: "Sum",
          region: config.get("sqs.region"),
          title: "User Activity",
        },
      },
      {
        type: "metric",
        properties: {
          metrics: [["ChatApp/Production", "APILatency"]],
          period: 60,
          stat: "Average",
          region: config.get("sqs.region"),
          title: "API Performance",
          yAxis: { left: { min: 0 } },
        },
      },
      {
        type: "metric",
        properties: {
          metrics: [["ChatApp/Production", "ErrorCount"]],
          period: 60,
          stat: "Sum",
          region: config.get("sqs.region"),
          title: "Errors",
        },
      },
    ],
  };

  const command = new PutDashboardCommand({
    DashboardName: "ChatApp-Metrics",
    DashboardBody: JSON.stringify(dashboardBody),
  });

  await client.send(command);
  console.log("CloudWatch dashboard created!");
  console.log(
    "View at: https://console.aws.amazon.com/cloudwatch/home?region=" +
      config.get("sqs.region") +
      "#dashboards:name=ChatApp-Metrics"
  );
}

createDashboard().catch(console.error);

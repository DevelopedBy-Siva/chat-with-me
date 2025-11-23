require("dotenv").config();
const express = require("express");
const http = require("http");
const config = require("config");

const app = express();

const logger = require("./logger");
const socket = require("./socket");
const messageWorker = require("./services/workers/messageWorker");
const cloudwatch = require("./services/monitoring/cloudwatch");

require("./exceptions/globalExceptions");
require("./db");
require("express-async-errors");
require("./routes/route")(app);

const server = http.createServer(app);

socket.connect(server);

const port = config.get("api_port");
server.listen(port, async () => {
  logger.info(`Server running on port ${port}`);
  logger.info(`API: http://localhost:${port}/api`);
  logger.info(`Socket.io: http://localhost:${port}`);
  logger.info(`Health: http://localhost:${port}/health`);

  cloudwatch.initializeCloudWatch();

  if (config.get("use_sqs")) {
    logger.info("Starting message worker...");

    setTimeout(() => {
      messageWorker.start(socket);
    }, 2000);
  }
});

async function shutdown(signal) {
  logger.info(`\n${signal} received, shutting down...`);

  if (config.get("use_sqs")) {
    await messageWorker.stop();
  }

  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });

  setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  shutdown("UNCAUGHT_EXCEPTION");
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  shutdown("UNHANDLED_REJECTION");
});

module.exports = { app, server };

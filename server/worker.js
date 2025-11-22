const logger = require("./logger");
require("./db");

logger.info("🚀 Message Worker starting...");

setInterval(() => {
  logger.info("Worker heartbeat...");
}, 60000);

process.on("SIGTERM", () => {
  logger.info("Worker shutting down...");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("Worker shutting down...");
  process.exit(0);
});

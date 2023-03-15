const logger = require("../logger");

/**
 * Handles Uncaught exceptions in the application
 */
process.on("uncaughtException", (ex) => {
  logger.error(ex);
  process.exit(1);
});

/**
 * Handles Unhandled rejections in the application
 */
process.on("unhandledRejection", (ex) => {
  logger.error(ex);
  process.exit(1);
});

const mongoose = require("mongoose");
const config = require("../utils/config");
const scheduler = require("node-schedule");

const logger = require("../logger");
const ChatCollection = require("./model/Chat");
const { AppError, ErrorCodes } = require("../exceptions");

const URL = config.DB_URL;
const CLEANUP_MSGS_OLDER_THAN = config.CLEANUP_OLDER_MSGS;

mongoose
  .connect(URL)
  .then(() => {
    logger.info("Connected to MongoDB successfully...");
  })
  .catch((ex) => {
    throw new AppError(ErrorCodes.ERR_MONGODB_CONNECTION_FAILED, ex);
  });

scheduler.scheduleJob("0 0 0 * * *", async () => {
  try {
    const cleanupMessagesOlderthan = parseInt(CLEANUP_MSGS_OLDER_THAN);
    if (
      !cleanupMessagesOlderthan ||
      isNaN(cleanupMessagesOlderthan) ||
      cleanupMessagesOlderthan <= 0
    )
      return;

    logger.info(
      `Scheduler: Removing messages older than: ${cleanupMessagesOlderthan}`
    );

    const cutoffDate = new Date(
      Date.now() - cleanupMessagesOlderthan * 24 * 60 * 60 * 1000
    );
    const chats = await ChatCollection.find({});
    chats.forEach((item) => {
      const messages = item.messages.filter((msg) => {
        const tmstp = new Date(msg.createdAt);
        const isValid = tmstp && !isNaN(tmstp) && tmstp instanceof Date;
        if (isValid) {
          if (tmstp < cutoffDate) return false;
        }
        return true;
      });
      item.messages = messages;
      item.save();
    });
  } catch (ex) {
    logger.error(
      `Scheduler: Failed to cleanup messages older than: ${CLEANUP_MSGS_OLDER_THAN}`
    );
  }
});

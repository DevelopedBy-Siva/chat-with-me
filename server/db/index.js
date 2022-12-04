const mongoose = require("mongoose");
const config = require("config");
const logger = require("../logger");
const { AppError, ErrorCodes } = require("../exceptions");

const URL = config.get("db.url");

mongoose
  .connect(URL)
  .then(() => {
    logger.info("Connected to MongoDB successfully...");
  })
  .catch((ex) => {
    throw new AppError(ErrorCodes.ERR_MONGODB_CONNECTION_FAILED, ex);
  });

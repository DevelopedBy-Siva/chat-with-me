const logger = require("../logger/logger");
const AppError = require("../models/AppError");

/**
 * Module that handles uncaught/ unhandled exceptions & rejections
 */
module.exports = function (exception, req, resp, next) {
  logger.error(exception);
  resp
    .status(500)
    .send(new AppError("UNKNOWN_ERROR", "Unknown error occured. Try again..."));
};

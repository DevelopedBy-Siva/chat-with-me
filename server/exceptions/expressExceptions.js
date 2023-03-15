const logger = require("../logger");
const { AppError, ErrorCodes } = require(".");

/**
 * Module that handles uncaught/ unhandled exceptions & rejections
 */
module.exports = function (exception, req, resp, next) {
  logger.error(exception);
  resp
    .status(500)
    .send(
      new AppError(
        ErrorCodes.ERR_UNKNOWN,
        "Unknown error occured. Try again..."
      )
    );
};

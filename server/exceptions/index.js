/**
 * Application Error Model which takes two arguments, errorCode & errorDescription
 */

class AppError {
  constructor(errorCode, errorDescription) {
    this.errorCode = String(errorCode);
    this.errorDescription = String(errorDescription);
  }
}

const ErrorCodes = {
  ERR_INVALID_REQUEST: "ERR_INVALID_REQUEST",
  ERR_UNAUTHORIZED: "ERR_UNAUTHORIZED",
  ERR_FORBIDDEN: "ERR_FORBIDDEN",
  ERR_UNKNOWN: "ERR_UNKNOWN",
  ERR_MAIL_FAILED: "ERR_MAIL_FAILED",
  ERR_USR_NOT_FOUND: "ERR_USR_NOT_FOUND",
  ERR_VERIFY_CODE_EXPIRED: "ERR_VERIFY_CODE_EXPIRED",
  ERR_INVALID_VERIFY_CODE: "ERR_INVALID_VERIFY_CODE",
  ERR_MONGODB_CONNECTION_FAILED: "ERR_MONGODB_CONNECTION_FAILED",
  ERR_DEVICE_ALREADY_CONNECTED: "ERR_DEVICE_ALREADY_CONNECTED",
};

module.exports.AppError = AppError;
module.exports.ErrorCodes = ErrorCodes;

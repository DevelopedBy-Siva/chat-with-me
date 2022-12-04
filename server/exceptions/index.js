/**
 * Application Error Model which takes two arguments, errorCode & errorDescription
 */

class AppError {
  constructor(errorCode, errorDescription) {
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
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
};

module.exports.AppError = AppError;
module.exports.ErrorCodes = ErrorCodes;

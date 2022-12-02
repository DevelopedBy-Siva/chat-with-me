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
};

module.exports.AppError = AppError;
module.exports.ErrorCodes = ErrorCodes;

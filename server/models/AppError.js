/**
 * Application Error Model which takes two arguments, errorCode & errorDescription
 */

class AppError {
  constructor(errorCode, errorDescription) {
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

module.exports = AppError;

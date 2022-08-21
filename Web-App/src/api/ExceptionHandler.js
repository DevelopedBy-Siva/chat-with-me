const ErrorCode = {
  API_TIMEOUT_ERROR: "ECONNABORTED",
};

export default function retrieveError(code, errorResponse = {}) {
  let message;
  switch (code) {
    case ErrorCode.API_TIMEOUT_ERROR:
      message = "Server timed out. Try again.";
      break;

    default:
      message = "Unexpected error occured. Try again.";
      break;
  }
  return message;
}

const ErrorCode = {
  API_TIMEOUT_ERROR: "ECONNABORTED",
};

export default function retrieveError(code, errorResponse = {}) {
  let message;
  let addToast = false;
  switch (code) {
    case ErrorCode.API_TIMEOUT_ERROR:
      message = "Server timed out. Try again.";
      addToast = true;
      break;

    default:
      message = "Unexpected error occured. Try again.";
      addToast = true;
      break;
  }
  return { message, addToast };
}

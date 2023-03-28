export default function retrieveError(error = {}) {
  let message;
  let toastId;
  let status = 0;
  try {
    status = error.response.status;
  } catch (_) {}

  switch (status) {
    case 400:
      message =
        "There was a problem with your submission. Please review your submission";
      toastId = "INVALID_REQUEST";
      break;
    case 401:
      message = "Incorrect email or password";
      toastId = "AUTH_ERROR";
      break;
    case 403:
      message = "Request is forbidden. Please login to continue";
      toastId = "FORBIDDEN_ERROR";
      break;
    default:
      message = "Oops, something went wrong. Failed to process your request";
      toastId = "UNKNOW_ERROR";
      break;
  }
  return { message, toastId };
}

export default function retrieveError(error = {}, isPublicError = false) {
  let message;
  let toastId;
  let isInfo = false;
  let status = 0;
  try {
    status = error.response.status;
  } catch (_) {}

  let type;
  if (isPublicError) type = "public";

  switch (type) {
    case "public":
      switch (status) {
        case 400:
          message =
            "There was a problem with your submission. Please review your submission";
          toastId = "INVALID_REQUEST";
          break;
        case 401:
        case 403:
          message = "Unable to sign in. Please check your email or password";
          toastId = "AUTH_ERROR";
          break;
        case 409:
          message = "Email already registered. Please sign in";
          toastId = "ALREADY_REGISTERED";
          isInfo = true;
          break;
        case 404:
          message = "Email not registered. Please enter a valid email";
          toastId = "ALREADY_REGISTERED";
          isInfo = true;
          break;
        default:
          message =
            "Oops, something went wrong. Failed to process your request";
          toastId = "UNKNOW_ERROR";
          break;
      }
      toastId = "PUB_" + toastId;
      break;

    default:
      switch (status) {
        case 400:
          message =
            "There was a problem with your submission. Please review your submission";
          toastId = "INVALID_REQUEST";
          break;
        case 401:
        case 403:
          message = "Request is forbidden. Please login to continue";
          toastId = "FORBIDDEN_ERROR";
          break;
        default:
          message =
            "Oops, something went wrong. Failed to process your request";
          toastId = "UNKNOW_ERROR";
          break;
      }
      toastId = "DEF_" + toastId;
      break;
  }

  return { message, toastId, isInfo };
}

import { toast } from "react-toastify";

export const USER_TOAST_LIMIT = 1;
export const USER_TOAST_ID_PREFIX = "USR_";
export const USER_TOAST_CONTAINER_ID = "user-toast-container";
export const TOAST_DISMISS_ID = "dismiss_toast";

const DEFAULT_MESSAGE = "Hey...How do you do?";

const TOAST_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
};

const TOAST_DEFAULT_PROPS = {
  position: "bottom-center",
  autoClose: 4000,
  delay: 400,
  containerId: USER_TOAST_CONTAINER_ID,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  draggable: true,
  progress: undefined,
  closeButton: false,
  style: {},
};

export const success = (message, props) => {
  handleDefaultToast(TOAST_TYPE.SUCCESS, message, props);
};

export const error = (message, props) => {
  handleDefaultToast(TOAST_TYPE.ERROR, message, props);
};

export const dismiss = (id) => {
  if (id) {
    toast.dismiss(id);
    return;
  }
  id = USER_TOAST_ID_PREFIX + TOAST_DISMISS_ID;
  toast.dismiss(id);
};

const handleDefaultToast = (toastType, message = DEFAULT_MESSAGE, props) => {
  let TOAST_ID;
  if (props && props.toastId) TOAST_ID = USER_TOAST_ID_PREFIX + props.toastId;
  props = {
    ...TOAST_DEFAULT_PROPS,
    ...props,
  };
  if (!TOAST_ID) TOAST_ID = USER_TOAST_ID_PREFIX + message;

  props.toastId = TOAST_ID;

  switch (toastType) {
    case TOAST_TYPE.SUCCESS:
      toast.success(message, props);
      break;

    case TOAST_TYPE.ERROR:
      toast.error(message, props);
      break;

    default:
      break;
  }
};

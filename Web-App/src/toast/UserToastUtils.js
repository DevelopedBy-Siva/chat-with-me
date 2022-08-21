import { toast } from "react-toastify";

export const USER_TOAST_LIMIT = 1;
export const USER_TOAST_ID_PREFIX = "USR_";
export const USER_TOAST_CONTAINER_ID = "user-toast-container";

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

const handleDefaultToast = (
  toastType,
  message = DEFAULT_MESSAGE,
  props = { ...TOAST_DEFAULT_PROPS }
) => {
  props = {
    ...TOAST_DEFAULT_PROPS,
    ...props,
    ...props.style,
  };
  const TOAST_ID = USER_TOAST_ID_PREFIX + message;
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

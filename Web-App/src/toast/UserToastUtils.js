import { toast } from "react-toastify";

export const USER_TOAST_LIMIT = 2;
export const USER_TOAST_ID_PREFIX = "USR_";
export const USER_TOAST_CONTAINER_ID = "user-toast-container";

const DEFAULT_MESSAGE = "Hey...How do you do?";

const TOAST_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
};

const DEFAULT_STYLE = {
  background: "white",
  minWidth: "220px",
  maxWidth: "350px",
  margin: "4px auto 0 auto",
  padding: "8px 10px",
  borderRadius: "8px",
  boxShadow: "0 3px 10px rgb(0 0 0 / 10%), 0 3px 3px rgb(0 0 0 / 5%)",
  fontFamily: "Ubuntu, sans-serif",
  fontSize: "12px",
  WebkitUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
  cursor: "pointer",
  overflow: "hidden",
};

const TOAST_DEFAULT_PROPS = {
  position: "bottom-center",
  autoClose: 400000,
  containerId: USER_TOAST_CONTAINER_ID,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  draggable: true,
  progress: undefined,
  closeButton: false,
  style: { ...DEFAULT_STYLE },
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
    style: { ...TOAST_DEFAULT_PROPS.style, ...props.style },
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

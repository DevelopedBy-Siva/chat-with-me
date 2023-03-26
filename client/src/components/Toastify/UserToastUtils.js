import { toast } from "react-toastify";

export const USER_TOAST_LIMIT = 2;
export const USER_TOAST_CONTAINER_ID = "user-toast-container";
export const USER_TOAST_ID = "user-toast-id";

const defaultProps = {
  containerId: USER_TOAST_CONTAINER_ID,
  toastId: USER_TOAST_ID,
};

export const success = (message, props = {}) =>
  toast.success(message, { ...defaultProps, ...props });

export const error = (message, props = {}) =>
  toast.error(message, { ...defaultProps, ...props });

export const dismiss = () => toast.dismiss(defaultProps.toastId);

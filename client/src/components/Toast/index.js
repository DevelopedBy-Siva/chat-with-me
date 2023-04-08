import { enqueueSnackbar, closeSnackbar } from "notistack";

import GeneralToast from "./GeneralToast";
import MsgToastContainer from "./MsgToastContainer";

const toastBg = {
  error: "#FF2B20",
  success: "#2d9d41",
  info: "#3C90AB",
};

const notify = (key, message, props = {}) => {
  enqueueSnackbar(<GeneralToast type={key} message={message} />, {
    autoHideDuration: 5000,
    style: {
      background: toastBg[key],
      width: "100%",
      maxWidth: "280px",
      borderRadius: "8px",
    },
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    ...props,
  });
};

const notifyMsg = (message, from, avatarId) => {
  enqueueSnackbar(
    <MsgToastContainer message={message} from={from} avatarId={avatarId} />
  );
};

const remove = () => {
  closeSnackbar();
};

const toastProps = {
  user: {
    persist: {
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
      persist: true,
    },
    nonPersist: {
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    },
    network: {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
      persist: true,
    },
  },
  message: {},
};

const toExpose = {
  success: (message, props) => notify("success", message, props),
  error: (message, props) => notify("error", message, props),
  info: (message, props) => notify("info", message, props),
  msg: (message, from, avatarId) => notifyMsg(message, from, avatarId),
  remove: () => remove(),
  props: toastProps,
};

export default toExpose;

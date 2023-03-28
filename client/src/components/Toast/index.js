import { toast } from "react-hot-toast";

import GeneralToast from "./GeneralToast";
import MsgToastContainer from "./MsgToastContainer";

export const MSG_TOAST_ID_PREFIX = "msg_tst_pfx_";
const GNRL_TOAST_ID = "gnrl_tst_pfx";

const notify = (key, message, props = {}) => {
  toast.custom(<GeneralToast type={key} message={message} />, {
    position: "bottom-center",
    id: GNRL_TOAST_ID,
    duration: 5000,
    ...props,
  });
};

const notifyMsg = (message, from, avatarId) => {
  toast.custom(
    <MsgToastContainer message={message} from={from} avatarId={avatarId} />,
    { id: MSG_TOAST_ID_PREFIX + Date.now(), duration: 8000 }
  );
};

const toExpose = {
  success: (message, props) => notify("success", message, props),
  error: (message, props) => notify("error", message, props),
  info: (message, props) => notify("info", message, props),
  msg: (message, from, avatarId) => notifyMsg(message, from, avatarId),
};

export default toExpose;

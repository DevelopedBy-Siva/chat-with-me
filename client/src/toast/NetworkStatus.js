import { toast } from "react-toastify";

import * as u_toast from "./UserToastUtils";

const ONLINE = "online";
const OFFLINE = "offline";

export default function NetworkStatus({ type }) {
  if (type === ONLINE) {
    toast.dismiss();
    u_toast.success("App is back online", {
      autoClose: 2000,
      draggable: false,
      delay: 200,
      theme: "colored",
      style: {
        background: "#07bc0c",
        color: "#FFFFFF",
      },
    });
  } else if (type === OFFLINE) {
    toast.clearWaitingQueue();
    toast.dismiss();
    u_toast.error("App is offline. Please check your internet connection", {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      theme: "colored",
      style: {
        background: "#e74c3c",
        color: "#FFFFFF",
      },
    });
  }
}

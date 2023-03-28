import { toast } from "react-hot-toast";
import notify from ".";

const ONLINE = "online";
const OFFLINE = "offline";

export default function NetworkStatus({ type }) {
  toast.remove();
  if (type === ONLINE) {
    toast.remove(OFFLINE);
    notify.info("Application is back online", {
      id: ONLINE,
      duration: 1000,
    });
  } else if (type === OFFLINE) {
    notify.error("Application offline. Please check your internet connection", {
      duration: Infinity,
      id: OFFLINE,
    });
  }
}

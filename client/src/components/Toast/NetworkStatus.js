import toast from ".";

const ONLINE = "online";
const OFFLINE = "offline";

export default function NetworkStatus({ type }) {
  toast.remove();
  if (type === ONLINE) {
    toast.remove(OFFLINE);
    toast.success("Application is back online", {
      ...toast.props.user.network,
      persist: false,
      autoHideDuration: 2000,
    });
  } else if (type === OFFLINE) {
    toast.error(
      "Application is offline. Please check your internet connection",
      {
        ...toast.props.user.network,
        key: OFFLINE,
      }
    );
  }
}

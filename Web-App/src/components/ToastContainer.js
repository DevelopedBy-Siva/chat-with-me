import { ToastContainer as Toaster } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../toast/style.css";

export default function ToastContainer({ containerId, limit }) {
  return (
    <Toaster enableMultiContainer containerId={containerId} limit={limit} />
  );
}

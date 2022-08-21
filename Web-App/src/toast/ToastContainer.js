import { ToastContainer as Toaster } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./style.css";

export default function ToastContainer({ containerId, limit }) {
  return (
    <Toaster
      draggablePercent={40}
      enableMultiContainer
      containerId={containerId}
      limit={limit}
    />
  );
}

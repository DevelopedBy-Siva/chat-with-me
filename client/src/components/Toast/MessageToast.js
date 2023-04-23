import { Toaster } from "react-hot-toast";

export default function MessageToast() {
  return (
    <Toaster
      toastOptions={{
        duration: 8000,
        style: {
          padding: 0,
          background: "none",
        },
      }}
    />
  );
}

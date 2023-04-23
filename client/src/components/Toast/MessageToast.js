import { useEffect } from "react";
import { Toaster, toast, useToasterStore } from "react-hot-toast";

export default function MessageToast() {
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 3;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

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

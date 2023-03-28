import React, { useEffect } from "react";
import { toast, Toaster, useToasterStore } from "react-hot-toast";

import { MSG_TOAST_ID_PREFIX } from ".";

export default function AppToast() {
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 3;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => {
        if (t.id.startsWith(MSG_TOAST_ID_PREFIX)) toast.dismiss(t.id);
      });
  }, [toasts]);

  return <Toaster position="top-center" reverseOrder={false} gutter={10} />;
}

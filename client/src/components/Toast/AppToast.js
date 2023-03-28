import React, { useEffect } from "react";
import { toast, Toaster, useToasterStore } from "react-hot-toast";

import { GNRL_TOAST_ID_PREFIX, MSG_TOAST_ID_PREFIX } from ".";

export default function AppToast() {
  const { toasts } = useToasterStore();

  const MSG_TOAST_LIMIT = 3;
  const GNRL_TOAST_LIMIT = 1;

  useEffect(() => {
    const visibleToasts = toasts.filter((t) => t.visible);

    const msgToasts = visibleToasts.filter((t) =>
      t.id.startsWith(MSG_TOAST_ID_PREFIX)
    );
    msgToasts
      .filter((_, index) => index >= MSG_TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));

    const generalToasts = visibleToasts.filter((t) =>
      t.id.startsWith(GNRL_TOAST_ID_PREFIX)
    );
    generalToasts
      .filter((_, index) => index >= GNRL_TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  return <Toaster position="top-center" reverseOrder={false} gutter={10} />;
}

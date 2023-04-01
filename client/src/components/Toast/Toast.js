import React, { useRef } from "react";
import { SnackbarProvider } from "notistack";

export default function Toast() {
  const msgToast = useRef(null);
  const userToast = useRef(null);

  return (
    <>
      <SnackbarProvider ref={msgToast} />
      <SnackbarProvider ref={userToast} />
    </>
  );
}

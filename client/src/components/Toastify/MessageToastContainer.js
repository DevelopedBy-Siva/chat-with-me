import React from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

import {
  MESSAGE_TOAST_CONTAINER_ID,
  MESSAGE_TOAST_LIMIT,
} from "./MessageToastUtils";

export default function MessageToastContainer() {
  return (
    <Container
      position="top-center"
      autoClose={8000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      draggable
      pauseOnFocusLoss={false}
      closeButton={false}
      draggablePercent={40}
      enableMultiContainer
      containerId={MESSAGE_TOAST_CONTAINER_ID}
      limit={MESSAGE_TOAST_LIMIT}
    />
  );
}

const Container = styled(ToastContainer)`
  .Toastify__toast {
    font-family: "Roboto", sans-serif;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 1.2rem;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    background: ${(props) => props.theme.toast.bg};
    color: ${(props) => props.theme.toast.default};
  }

  .Toastify__toast-body {
    overflow: hidden;
  }

  .Toastify__toast-body > div:last-child {
    overflow: hidden;
  }
`;

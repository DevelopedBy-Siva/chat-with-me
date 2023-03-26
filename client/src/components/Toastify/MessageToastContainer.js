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
      autoClose={6000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      draggable
      theme="colored"
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
    width: 90%;
    min-height: 48px !important;
    font-family: "Roboto", sans-serif;
    border-radius: 14px;
    margin: auto;
    margin-top: 1.4rem;
    text-align: left;
    justify-content: center !important;
    letter-spacing: 1px;
    font-size: 0.68rem;
    line-height: 16px;
    font-weight: 300;
  }
  .Toastify__toast--success {
    background-color: #2d9d41;
  }
  .Toastify__toast--warning {
    background-color: #c5a421;
  }
  .Toastify__toast-body {
    div:last-child {
      margin-left: 6px;
    }
  }
`;

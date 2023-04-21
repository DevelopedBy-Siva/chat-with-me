import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export default function MessageToast() {
  return (
    <Container
      position="top-center"
      autoClose={5000}
      limit={2}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
}

const Container = styled(ToastContainer)`
  .Toastify__toast {
    width: 100%;
    max-width: 310px;
    margin: auto;
    margin-top: 6px;
    background: #adc6d2;
  }

  .Toastify__toast {
    padding: 8px 10px;
    position: relative;
  }

  .Toastify__close-button {
    position: absolute;
    right: 8px;
    top: 8px;
  }

  .Toastify__close-button > svg {
    height: 13px;
    width: 13px;
    color: #1b1b1b;
  }

  .Toastify__toast-body {
    overflow: hidden;
    width: 100%;
  }

  .Toastify__toast-body > div:last-child {
    overflow: hidden;
  }
`;

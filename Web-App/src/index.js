import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import MessageToaster from "./components/ToastContainer";
import UserToaster from "./components/ToastContainer";
import GlobalStyles from "./styles/GlobalStyles";
import {
  MESSAGE_TOAST_CONTAINER_ID,
  MESSAGE_TOAST_LIMIT,
} from "./toast/MessageToastUtils";
import {
  USER_TOAST_CONTAINER_ID,
  USER_TOAST_LIMIT,
} from "./toast/UserToastUtils";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GlobalStyles />
    <MessageToaster
      containerId={MESSAGE_TOAST_CONTAINER_ID}
      limit={MESSAGE_TOAST_LIMIT}
    />
    <UserToaster
      containerId={USER_TOAST_CONTAINER_ID}
      limit={USER_TOAST_LIMIT}
    />
    <App />
  </BrowserRouter>
);

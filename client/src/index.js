import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import Toaster from "./toast/AppToastWrapper";
import GlobalStyles from "./assets/styles/GlobalStyles";
import { DarkTheme } from "./assets/styles/Themes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GlobalStyles />
    <ThemeProvider theme={DarkTheme}>
      <Toaster />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

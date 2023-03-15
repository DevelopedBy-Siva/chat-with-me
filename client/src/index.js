import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "react-tooltip/dist/react-tooltip.css";
import "nprogress/nprogress.css";

import App from "./App";
import Toaster from "./components/Toastify";
import GlobalStyles from "./assets/styles/GlobalStyles";
import { ThemeContext } from "./context/ThemeContext";
import { getStyles, getTheme, updateTheme } from "./utils/UserLocal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Wrapper />
  </BrowserRouter>
);

function Wrapper() {
  const localTheme = getTheme();
  const [appTheme, setAppTheme] = useState(localTheme);

  const handleTheme = (val) => {
    const theme = updateTheme(val);
    setAppTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ appTheme, handleTheme }}>
      <ThemeProvider theme={getStyles(appTheme)}>
        <GlobalStyles />
        <Toaster />
        <App />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

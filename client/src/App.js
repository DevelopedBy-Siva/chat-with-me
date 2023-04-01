import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { SnackbarProvider as Toast } from "notistack";
import "react-tooltip/dist/react-tooltip.css";
import "nprogress/nprogress.css";

import GlobalStyles from "./assets/styles/GlobalStyles";
import networkStatus from "./components/Toast/NetworkStatus";
import Routes from "./Routes";
import { ThemeContext } from "./context/ThemeContext";
import { getStyles, getTheme, updateTheme } from "./utils/UserLocal";

export default function App() {
  useEffect(() => {
    window.addEventListener("online", networkStatus);
    window.addEventListener("offline", networkStatus);

    return () => {
      window.removeEventListener("online", networkStatus);
      window.removeEventListener("offline", networkStatus);
    };
  });

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
        <Toast maxSnack={1} />
        <Routes />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

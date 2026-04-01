import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Main from "./main";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

themeManager.init();

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <Main />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);

import * as React from "react";
import { createRoot } from "react-dom/client";
import Main from "./main";

const cs = new CSInterface();

themeManager.init();

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main cs={cs} />
  </React.StrictMode>
);

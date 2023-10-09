import React from "react";
import ReactDOM from "react-dom/client";
import AppProvider from "./providers/AppProvider.tsx";
import { registerSW } from "virtual:pwa-register";
import "./index.css";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider />
  </React.StrictMode>
);

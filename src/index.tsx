import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@app/store.ts";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const thisWindow = window as Window &
  typeof globalThis & {
    Cypress: Cypress.Cypress;
    store: typeof store;
  };

if (thisWindow.Cypress) {
  console.log("CYPRESS WINDOW");
  thisWindow.store = store;
}

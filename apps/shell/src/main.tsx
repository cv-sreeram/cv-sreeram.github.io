import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { addErrorHandler, registerApplication, start } from "single-spa";
import { AppShell } from "./shell";
import "./styles/theme.css";
import { emitMfeError } from "@my-portal/utils";

registerApplication({
  name: "mfe-react-home",
  app: () => import("mfe-react-home/src/single-spa"),
  activeWhen: (location) => location.pathname === "/home",
  customProps: {
    domElementGetter: () => document.getElementById("mfe-container") as HTMLElement
  }
});

registerApplication({
  name: "mfe-angular-about",
  app: () => import("mfe-angular-about/src/single-spa"),
  activeWhen: (location) => location.pathname.startsWith("/about"),
  customProps: {
    domElementGetter: () => document.getElementById("mfe-container") as HTMLElement
  }
});

registerApplication({
  name: "mfe-vue-page",
  app: () => import("mfe-vue-page/src/single-spa"),
  activeWhen: (location) => location.pathname.startsWith("/experience"),
  customProps: {
    domElementGetter: () => document.getElementById("mfe-container") as HTMLElement
  }
});

registerApplication({
  name: "mfe-webcomponent-education",
  app: () => import("mfe-webcomponent-education/src/single-spa"),
  activeWhen: (location) => location.pathname.startsWith("/education"),
  customProps: {
    domElementGetter: () => document.getElementById("mfe-container") as HTMLElement
  }
});

registerApplication({
  name: "mfe-svelte-page",
  app: () => import("mfe-svelte-page/src/single-spa"),
  activeWhen: (location) => location.pathname.startsWith("/micro-apps"),
  customProps: {
    domElementGetter: () => document.getElementById("mfe-container") as HTMLElement
  }
});

addErrorHandler((error) => {
  emitMfeError(error.appOrParcelName ?? "unknown", error.message);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </React.StrictMode>
);

// Defer start() by one task so that the history.replaceState call in index.html
// (which restores the real path from the ?p= query param on GitHub Pages) has
// been committed to window.location before single-spa evaluates activeWhen.
// On iOS WebKit (used by both Safari and Chrome on iOS), replaceState called
// in <head> scripts may not be reflected in location.pathname synchronously
// when module scripts execute, causing all MFEs to miss their activeWhen check
// and leaving a blank page after a hard refresh.
setTimeout(() => {
  start();
}, 0);

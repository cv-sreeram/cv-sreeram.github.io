import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { addErrorHandler, registerApplication, start } from "single-spa";
import { AppShell } from "./shell";
import "./styles/theme.css";
import { emitMfeError } from "@my-portal/utils";

// ── GitHub Pages SPA path restoration ────────────────────────────────────────
// The 404.html redirect encodes the real path as /?p=/some/path.
// The inline <head> script in index.html calls history.replaceState to restore
// it, but on iOS WebKit that replaceState may not be reflected in
// window.location by the time this ES module executes.
// We repeat the restoration here — synchronously, before React or single-spa
// read window.location — so both BrowserRouter and single-spa activeWhen
// always see the correct pathname.
(function restoreSpaPath() {
  const query = window.location.search;
  if (query.slice(0, 3) === "?p=") {
    const decoded = query.slice(3).replace(/~and~/g, "&").split("&q=");
    const path = decoded[0];
    const search = decoded[1] ? "?" + decoded[1].replace(/~and~/g, "&") : "";
    window.history.replaceState(null, "", path + search + window.location.hash);
  }
})();
// ─────────────────────────────────────────────────────────────────────────────

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

start();

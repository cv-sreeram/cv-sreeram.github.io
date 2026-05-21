import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { addErrorHandler, registerApplication, start } from "single-spa";
import { AppShell } from "./shell";
import "./styles/theme.css";
import { emitMfeError } from "@my-portal/utils";

// ── GitHub Pages SPA path restoration ────────────────────────────────────────
// On iOS WebKit, history.replaceState called in an inline <head> script may
// not be reflected in window.location.pathname by the time this ES module
// executes. We re-run the same restoration here — synchronously, as the very
// first thing — so that both BrowserRouter (which reads window.location at
// construction time) and single-spa activeWhen always see the real pathname.
(function () {
  var query = window.location.search;
  if (query.slice(0, 3) === "?p=") {
    var decoded = query.slice(3).replace(/~and~/g, "&").split("&q=");
    var path = decoded[0];
    var search = decoded[1] ? "?" + decoded[1].replace(/~and~/g, "&") : "";
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

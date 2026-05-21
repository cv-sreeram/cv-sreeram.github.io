import React from "react";
import ReactDOM from "react-dom/client";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { UNSAFE_createBrowserHistory as createBrowserHistory } from "react-router-dom";
import { addErrorHandler, registerApplication, start } from "single-spa";
import { AppShell } from "./shell";
import "./styles/theme.css";
import { emitMfeError } from "@my-portal/utils";

// ── GitHub Pages SPA path restoration ────────────────────────────────────────
// On a hard refresh of e.g. /home, GitHub Pages serves 404.html which
// redirects to /?p=/home. The index.html <head> script calls replaceState to
// restore the real path, but on iOS WebKit that replaceState may not be
// reflected in window.location by the time this ES module executes.
//
// We decode the ?p= param ourselves and call the native window.history.replaceState
// BEFORE creating the history instance, so createBrowserHistory() constructs
// itself with the correct pathname from the very first read. No race condition.
(function () {
  const query = window.location.search;
  if (query.slice(0, 3) === "?p=") {
    const decoded = query.slice(3).replace(/~and~/g, "&").split("&q=");
    const path = decoded[0]; // e.g. "/home"
    const search = decoded[1] ? "?" + decoded[1].replace(/~and~/g, "&") : "";
    const restored = path + search + window.location.hash;
    // Use the native API directly — this is synchronous and committed before
    // the next line executes, unlike the <head> script which runs in a
    // different execution context on iOS WebKit.
    window.history.replaceState(window.history.state, "", restored);
  }
})();
// ─────────────────────────────────────────────────────────────────────────────

// Create the history instance AFTER the URL has been corrected above.
// BrowserRouter auto-reads window.location at construction — by using an
// explicit history instance we guarantee it sees the real pathname.
const history = createBrowserHistory();

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
    <HistoryRouter history={history}>
      <AppShell />
    </HistoryRouter>
  </React.StrictMode>
);

start();

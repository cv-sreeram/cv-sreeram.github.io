import React from "react";
import ReactDOM from "react-dom/client";
import singleSpaReact from "single-spa-react";
import { HomePage as HomeApp } from "./components";
import { emitMfeError, emitMfeState } from "@my-portal/utils";

const baseLifecycles = singleSpaReact({
  React,
  ReactDOMClient: ReactDOM,
  rootComponent: HomeApp,
  domElementGetter: (props: { domElementGetter?: () => HTMLElement }) =>
    props.domElementGetter ? props.domElementGetter() : (document.getElementById("mfe-container") as HTMLElement),
  errorBoundary: () => <div>Failed to load Home MFE.</div>
});

export const bootstrap = baseLifecycles.bootstrap;

export async function mount(props: Parameters<typeof baseLifecycles.mount>[0]) {
  emitMfeState("mfe-react-home", "loading", "Preparing React experience...");
  try {
    await baseLifecycles.mount(props);
    emitMfeState("mfe-react-home", "ready", "React experience ready.");
  } catch (error) {
    emitMfeState("mfe-react-home", "error", "Unable to render React page.");
    emitMfeError("mfe-react-home", error instanceof Error ? error.message : "Unknown React mount error.");
    throw error;
  }
}

export const unmount = baseLifecycles.unmount;

if (!(window as { singleSpaNavigate?: unknown }).singleSpaNavigate) {
  const root = ReactDOM.createRoot(document.getElementById("root")!);
  root.render(<HomeApp />);
}

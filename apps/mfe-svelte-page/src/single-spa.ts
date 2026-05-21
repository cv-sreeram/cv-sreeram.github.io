import singleSpaSvelte from "single-spa-svelte";
import App from "./components/MicroAppsPage.svelte";
import { emitFrameworkActive, emitMfeError, emitMfeState } from "@my-portal/utils";

const lifecycles = singleSpaSvelte({
  component: App,
  domElementGetter: (props) =>
    props.domElementGetter
      ? props.domElementGetter()
      : (document.getElementById("mfe-container") as HTMLElement),
  props: {}
});

export const bootstrap = lifecycles.bootstrap;

export async function mount(props: { domElementGetter?: () => HTMLElement }) {
  emitMfeState("mfe-svelte-page", "loading", "Preparing Svelte experience...");
  try {
    await lifecycles.mount(props);
    emitFrameworkActive("Svelte", window.location.pathname);
    emitMfeState("mfe-svelte-page", "ready", "Svelte page is ready.");
  } catch (error) {
    emitMfeState("mfe-svelte-page", "error", "Unable to render Svelte page.");
    emitMfeError("mfe-svelte-page", error instanceof Error ? error.message : "Unknown Svelte mount error.");
    throw error;
  }
}

export const unmount = lifecycles.unmount;

if (!(window as { singleSpaNavigate?: unknown }).singleSpaNavigate) {
  mount({
    domElementGetter: () => document.getElementById("mfe-container") as HTMLElement
  });
}

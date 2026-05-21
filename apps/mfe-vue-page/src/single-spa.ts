import { createApp, h } from "vue";
import singleSpaVue from "single-spa-vue";
import App from "./components/ExperiencePage.vue";
import { emitFrameworkActive, emitMfeError, emitMfeState } from "@my-portal/utils";

const vueLifecycles = singleSpaVue({
  createApp,
  // appOptions as a function must return a Promise; receives mount props (including customProps)
  appOptions: (props: Record<string, unknown>) => {
    let container: HTMLElement;
    if (typeof props.domElementGetter === "function") {
      container = (props.domElementGetter as () => HTMLElement)();
    } else {
      container = document.getElementById("mfe-container") ?? document.body;
    }
    // single-spa-vue v3 mounts into appOptions.el; ensure the container has an id
    if (!container.id) container.id = "mfe-vue-container";
    return Promise.resolve({
      el: `#${container.id}`,
      render: () => h(App),
    });
  },
});

export const bootstrap = vueLifecycles.bootstrap;

export const mount = async (props: Record<string, unknown>) => {
  emitMfeState("mfe-vue-page", "loading", "Preparing Vue experience...");
  try {
    emitFrameworkActive("Vue", window.location.pathname);
    await vueLifecycles.mount(props);
    emitMfeState("mfe-vue-page", "ready", "Vue page is ready.");
  } catch (error) {
    emitMfeState("mfe-vue-page", "error", "Unable to render Vue page.");
    emitMfeError("mfe-vue-page", error instanceof Error ? error.message : "Unknown Vue mount error.");
    throw error;
  }
};

export const unmount = vueLifecycles.unmount;

// Standalone dev mode only (not inside shell)
if (!(window as { singleSpaNavigate?: unknown }).singleSpaNavigate) {
  const devContainer = document.getElementById("root") ?? document.body;
  mount({ domElementGetter: () => devContainer });
}

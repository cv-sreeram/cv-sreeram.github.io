/// <reference types="vite/client" />

declare module "*.svelte" {
  import type { ComponentType } from "svelte";
  const component: ComponentType;
  export default component;
}

declare module "single-spa-svelte" {
  interface SvelteLifecycles {
    bootstrap: () => Promise<void>;
    mount: (props: Record<string, unknown>) => Promise<void>;
    unmount: (props: Record<string, unknown>) => Promise<void>;
  }
  interface SvelteOpts {
    component: unknown;
    domElementGetter?: (props: Record<string, unknown>) => HTMLElement;
    props?: Record<string, unknown>;
  }
  function singleSpaSvelte(opts: SvelteOpts): SvelteLifecycles;
  export default singleSpaSvelte;
}

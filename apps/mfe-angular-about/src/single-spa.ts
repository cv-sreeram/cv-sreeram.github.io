import "zone.js";
import "@angular/compiler";
import { ApplicationRef, EnvironmentInjector, createComponent, createEnvironmentInjector } from "@angular/core";
import { createApplication } from "@angular/platform-browser";
import { AboutComponent } from "./components";
import { emitFrameworkActive, emitMfeError, emitMfeState } from "@my-portal/utils";

let appRef: ApplicationRef | null = null;
let envInjector: EnvironmentInjector | null = null;
let componentRef: ReturnType<typeof createComponent<AboutComponent>> | null = null;
let hostElement: HTMLElement | null = null;

export async function bootstrap() {
  appRef = await createApplication({ providers: [] });
  envInjector = createEnvironmentInjector([], appRef.injector);
}

export async function mount(props: { domElementGetter?: () => HTMLElement }) {
  emitMfeState("mfe-angular-about", "loading", "Preparing Angular experience...");
  const container = props.domElementGetter ? props.domElementGetter() : document.body;
  hostElement = document.createElement("mfe-angular-about-root");
  container.innerHTML = "";
  container.appendChild(hostElement);

  try {
    componentRef = createComponent(AboutComponent, {
      environmentInjector: envInjector ?? appRef!.injector,
      hostElement
    });
    appRef!.attachView(componentRef.hostView);
    emitFrameworkActive("Angular", window.location.pathname);
    emitMfeState("mfe-angular-about", "ready", "Angular experience ready.");
  } catch (error) {
    emitMfeState("mfe-angular-about", "error", "Unable to render Angular page.");
    emitMfeError("mfe-angular-about", error instanceof Error ? error.message : "Unknown Angular mount error.");
    throw error;
  }
}

export async function unmount() {
  if (componentRef && appRef) {
    appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
  componentRef = null;
  if (hostElement?.parentNode) {
    hostElement.parentNode.removeChild(hostElement);
  }
  hostElement = null;
}

if (!(window as { singleSpaNavigate?: unknown }).singleSpaNavigate) {
  bootstrap().then(() =>
    mount({
      domElementGetter: () => document.getElementById("mfe-container") as HTMLElement
    })
  );
}

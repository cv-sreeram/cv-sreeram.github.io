import type { FrameworkActiveEvent, FrameworkName, MfeErrorEvent, MfeStateEvent, MfeViewState } from "@my-portal/types";

const frameworkEventName = "framework:active";
const themeEventName = "theme:changed";
const mfeStateEventName = "mfe:state";
const mfeErrorEventName = "mfe:error";

export function emitFrameworkActive(framework: FrameworkName, route: string): void {
  const detail: FrameworkActiveEvent = { framework, route };
  window.dispatchEvent(new CustomEvent(frameworkEventName, { detail }));
}

export function onFrameworkActive(listener: (event: FrameworkActiveEvent) => void): () => void {
  const handler = (event: Event) => listener((event as CustomEvent<FrameworkActiveEvent>).detail);
  window.addEventListener(frameworkEventName, handler);
  return () => window.removeEventListener(frameworkEventName, handler);
}

export function emitThemeChanged(theme: "dark" | "light"): void {
  window.dispatchEvent(new CustomEvent(themeEventName, { detail: { theme } }));
}

export function emitMfeState(app: string, state: MfeViewState, message?: string): void {
  const detail: MfeStateEvent = { app, state, message };
  window.dispatchEvent(new CustomEvent(mfeStateEventName, { detail }));
}

export function onMfeState(listener: (event: MfeStateEvent) => void): () => void {
  const handler = (event: Event) => listener((event as CustomEvent<MfeStateEvent>).detail);
  window.addEventListener(mfeStateEventName, handler);
  return () => window.removeEventListener(mfeStateEventName, handler);
}

export function emitMfeError(app: string, message: string): void {
  const detail: MfeErrorEvent = { app, message };
  window.dispatchEvent(new CustomEvent(mfeErrorEventName, { detail }));
}

export function onMfeError(listener: (event: MfeErrorEvent) => void): () => void {
  const handler = (event: Event) => listener((event as CustomEvent<MfeErrorEvent>).detail);
  window.addEventListener(mfeErrorEventName, handler);
  return () => window.removeEventListener(mfeErrorEventName, handler);
}

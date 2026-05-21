export type FrameworkName = "React" | "Angular" | "Vue" | "Svelte" | "Web Components";

export interface FrameworkActiveEvent {
  framework: FrameworkName;
  route: string;
}

export type MfeViewState = "loading" | "ready" | "empty" | "error";

export interface MfeStateEvent {
  app: string;
  state: MfeViewState;
  message?: string;
}

export interface MfeErrorEvent {
  app: string;
  message: string;
}

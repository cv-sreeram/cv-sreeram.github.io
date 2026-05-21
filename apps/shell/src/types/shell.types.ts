export type ThemeKey = "exec-light" | "execdark";

export interface NavItem {
  href: string;
  label: string;
  framework: string;
  app: string;
  hasApp: boolean;
}

export type MfeStatus = "idle" | "loading" | "ready" | "error";

export interface MfeState {
  app: string;
  status: MfeStatus;
  message?: string;
}

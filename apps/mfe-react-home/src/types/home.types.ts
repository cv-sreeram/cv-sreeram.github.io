export interface Stat {
  value: string;
  label: string;
}

export interface HeroButton {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
  external?: boolean;
}

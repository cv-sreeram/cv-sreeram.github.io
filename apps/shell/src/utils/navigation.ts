import type { NavItem } from "../types/shell.types";

export const NAV_ITEMS: NavItem[] = [
  { href: "/home", label: "Home", framework: "React", app: "mfe-react-home", hasApp: true },
  { href: "/about", label: "About", framework: "Angular", app: "mfe-angular-about", hasApp: true },
  { href: "/experience", label: "Experience", framework: "Vue", app: "mfe-vue-page", hasApp: true },
  { href: "/education", label: "Education", framework: "Web Components", app: "mfe-webcomponent-education", hasApp: true },
  { href: "/micro-apps", label: "Micro Apps", framework: "Svelte", app: "mfe-svelte-page", hasApp: true },
];

export function getActiveNavItem(pathname: string): NavItem | undefined {
  return NAV_ITEMS.find((item) =>
    item.href === "/home" ? pathname === "/home" : pathname.startsWith(item.href)
  );
}

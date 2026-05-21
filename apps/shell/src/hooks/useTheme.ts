import { useState, useEffect, useRef } from "react";
import type { ThemeKey } from "../types/shell.types";

function getInitialTheme(): ThemeKey {
  const stored = window.localStorage.getItem("theme");
  if (stored === "exec-light" || stored === "execdark") return stored;
  return "execdark";
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeKey>(getInitialTheme);
  const mounted = useRef(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (mounted.current) {
      window.localStorage.setItem("theme", theme);
    }
    mounted.current = true;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "exec-light" ? "execdark" : "exec-light"));
  };

  return { theme, setTheme, toggleTheme };
}

import { useEffect } from "react";
import { emitFrameworkActive, emitMfeState } from "@my-portal/utils";

export function useHomeEvents() {
  useEffect(() => {
    emitFrameworkActive("React", window.location.pathname);
    emitMfeState("mfe-react-home", "ready", "React home page is ready.");
  }, []);
}

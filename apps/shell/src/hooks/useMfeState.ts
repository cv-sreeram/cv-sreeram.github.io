import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { onFrameworkActive, onMfeError, onMfeState } from "@my-portal/utils";
import { NAV_ITEMS } from "../utils/navigation";

interface MfeState {
  activeFramework: string;
  loading: boolean;
  mfeStateMessage: string;
  errorMessage: string;
  loaderText: string;
  activeItem: typeof NAV_ITEMS[0];
  setLoading: (loading: boolean) => void;
  setErrorMessage: (error: string) => void;
}

export function useMfeState(): MfeState {
  const location = useLocation();
  const [activeFramework, setActiveFramework] = useState("React");
  const [loading, setLoading] = useState(false);
  const [mfeStateMessage, setMfeStateMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unsub = onFrameworkActive(({ framework }) => {
      setActiveFramework(framework);
      setLoading(false);
      setErrorMessage("");
    });
    return unsub;
  }, []);

  useEffect(() => {
    const current = NAV_ITEMS.find((item) => location.pathname.startsWith(item.href));
    if (current?.framework === "Shell") {
      setActiveFramework("Shell");
    }
  }, [location.pathname]);

  useEffect(() => {
    const unsubState = onMfeState(({ state, message }) => {
      setLoading(state === "loading");
      // Only surface messages while actively loading — suppress "ready" confirmations
      setMfeStateMessage(state === "loading" ? (message ?? "") : "");
      if (state === "ready") {
        setErrorMessage("");
      }
    });
    const unsubError = onMfeError(({ message }) => {
      setErrorMessage(message);
      setLoading(false);
    });
    return () => {
      unsubState();
      unsubError();
    };
  }, []);

  const loaderText = useMemo(() => {
    if (!loading) return "";
    if (location.pathname.startsWith("/about")) return "Loading Angular page...";
    if (location.pathname.startsWith("/experience")) return "Loading Vue page...";
    if (location.pathname.startsWith("/education")) return "Loading Web Components page...";
    if (location.pathname.startsWith("/micro-apps")) return "Loading Svelte page...";
    return "Loading React page...";
  }, [loading, location.pathname]);

  const activeItem = useMemo(
    () => NAV_ITEMS.find((item) => location.pathname.startsWith(item.href)) ?? NAV_ITEMS[0],
    [location.pathname]
  );

  return {
    activeFramework,
    loading,
    mfeStateMessage,
    errorMessage,
    loaderText,
    activeItem,
    setLoading,
    setErrorMessage,
  };
}

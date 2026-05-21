import { useEffect, useMemo, useRef, useState } from "react";
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

// On a hard refresh, determine if the current path maps to a known MFE so we
// can show the loading state immediately rather than a blank page while the
// MFE bundle downloads.
function isKnownMfePath(pathname: string): boolean {
  return NAV_ITEMS.some((item) => item.hasApp && pathname.startsWith(item.href));
}

// How long to wait for an MFE to signal ready before giving up and clearing
// the loader. Angular is heavy so we give it more time.
function getLoadTimeout(pathname: string): number {
  if (pathname.startsWith("/about")) return 12000; // Angular
  return 6000; // React, Vue, Web Components, Svelte
}

export function useMfeState(): MfeState {
  const location = useLocation();
  const [activeFramework, setActiveFramework] = useState("React");
  // Start in loading state if the initial path is a known MFE route — this
  // covers the hard-refresh case where single-spa hasn't mounted the MFE yet.
  const [loading, setLoading] = useState(() => isKnownMfePath(location.pathname));
  const [mfeStateMessage, setMfeStateMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear any pending load timeout
  const clearLoadTimeout = () => {
    if (loadTimeoutRef.current !== null) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
  };

  // Start a safety timeout whenever loading becomes true — if the MFE never
  // signals ready/error (e.g. single-spa failed to activate it on iOS), we
  // clear the loader so the user isn't stuck on an infinite spinner.
  useEffect(() => {
    if (!loading) {
      clearLoadTimeout();
      return;
    }
    clearLoadTimeout();
    loadTimeoutRef.current = setTimeout(() => {
      setLoading(false);
      setMfeStateMessage("");
    }, getLoadTimeout(location.pathname));

    return clearLoadTimeout;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

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

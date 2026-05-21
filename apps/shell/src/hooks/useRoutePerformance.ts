import { useEffect } from "react";

export function useRoutePerformance(loading: boolean) {
  useEffect(() => {
    if (!loading) {
      performance.mark("route-change-end");
      try {
        performance.measure("route-change", "route-change-start", "route-change-end");
      } catch {
        // Ignore first-load measure gaps.
      }
    }
  }, [loading]);
}

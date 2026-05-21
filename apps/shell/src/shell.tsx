import { useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  BrandLogo,
  EmptyState,
  ErrorState,
  FrameworkIndicator,
  LoadingState,
  MobileNav,
  Navigation,
  SidePane,
  SideRail,
  ThemeToggle,
} from "./components";
import type { PaneType } from "./components/PaneContent";
import { useHomeRedirect, useMfeState, useRoutePerformance } from "./hooks";
import { NAV_ITEMS } from "./utils/navigation";

export function AppShell() {
  const location = useLocation();
  const [paneOpen, setPaneOpen] = useState(false);
  const [activePane, setActivePane] = useState<PaneType | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Stable ref so SidePane's effects don't re-register on every render
  const activePaneRef = useRef(activePane);
  activePaneRef.current = activePane;

  const {
    activeFramework,
    loading,
    mfeStateMessage,
    errorMessage,
    loaderText,
    setLoading,
    setErrorMessage,
  } = useMfeState();

  useHomeRedirect();
  useRoutePerformance(loading);

  const hasUnknownRoute = !NAV_ITEMS.some((item) => location.pathname.startsWith(item.href));
  const showEmptyState = !loading && !errorMessage && hasUnknownRoute;

  // Stable callbacks — never recreated, no cascade re-renders
  const handleClosePane = useCallback(() => setPaneOpen(false), []);
  const handleOpenMobileMenu = useCallback(() => setMobileMenuOpen(true), []);
  const handleCloseMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const handleSelectPane = useCallback((type: PaneType) => {
    if (activePaneRef.current === type && paneOpen) {
      setPaneOpen(false);
    } else {
      setActivePane(type);
      setPaneOpen(true);
    }
  }, [paneOpen]);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header className="glass-nav sticky top-0 z-50" role="banner">
        <nav className="shell-container flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between" aria-label="Main navigation">
          {/* Mobile: [☰ menu] [name + designation ··· framework + theme] */}
          {/* Desktop: [brand logo] [nav pills] [framework + theme] */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="mobile-menu-btn md:hidden"
              onClick={handleOpenMobileMenu}
              aria-label="Open navigation menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" aria-hidden="true">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            </button>
            <div className="flex flex-1 items-center justify-between gap-2">
              <BrandLogo />
              {/* Framework + theme visible inline on mobile, hidden on md+ (shown in right column) */}
              <div className="flex items-center gap-2 md:hidden">
                <FrameworkIndicator activeFramework={activeFramework} />
                <ThemeToggle />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Navigation setLoading={setLoading} setErrorMessage={setErrorMessage} />
          </div>
          <div className="hidden md:flex items-center gap-2">
            <FrameworkIndicator activeFramework={activeFramework} />
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={handleCloseMobileMenu}
        setLoading={setLoading}
        setErrorMessage={setErrorMessage}
      />

      <main className="shell-container" id="main-content" tabIndex={-1}>
        {loading && <LoadingState loaderText={loaderText} mfeStateMessage={mfeStateMessage} />}
        {!loading && errorMessage && <ErrorState errorMessage={errorMessage} />}
        {showEmptyState && <EmptyState />}
        <div id="mfe-container" className="pb-8" />
      </main>

      <SideRail
        activePane={activePane}
        paneOpen={paneOpen}
        onSelectPane={handleSelectPane}
        onClose={handleClosePane}
      />

      <SidePane
        open={paneOpen}
        activePane={activePane}
        activePath={location.pathname}
        onClose={handleClosePane}
        ariaLabel={activePane ? `${activePane} pane` : "Context pane"}
      />
    </div>
  );
}

import { useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FrameworkBadge } from "@my-portal/ui";
import { NAV_ITEMS } from "../utils/navigation";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  setLoading: (loading: boolean) => void;
  setErrorMessage: (error: string) => void;
}

export function MobileNav({ isOpen, onClose, setLoading, setErrorMessage }: MobileNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
    onClose();
    if (location.pathname === item.href) return;

    if (item.hasApp) {
      performance.mark("route-change-start");
      setLoading(true);
    } else {
      setLoading(false);
    }
    setErrorMessage("");
    navigate(item.href);
  };

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // Focus trap and initial focus
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    // Store previously focused element
    previouslyFocusedRef.current = document.activeElement as HTMLElement;

    const drawer = drawerRef.current;

    // Focus first nav item on open
    const firstNavItem = drawer.querySelector<HTMLElement>(".mobile-nav-item");
    firstNavItem?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    drawer.addEventListener("keydown", handleTab);

    return () => {
      drawer.removeEventListener("keydown", handleTab);
      // Restore focus when closing
      if (previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="mobile-nav-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="mobile-nav-drawer"
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="mobile-nav-header">
          <span className="mobile-nav-title">Menu</span>
          <button
            onClick={onClose}
            className="mobile-nav-close"
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <nav className="mobile-nav-content" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className={`mobile-nav-item ${isActive ? "mobile-nav-item-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="mobile-nav-item-label">{item.label}</span>
                <FrameworkBadge name={item.framework} />
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}

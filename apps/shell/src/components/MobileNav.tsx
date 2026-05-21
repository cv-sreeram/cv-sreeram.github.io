import { useEffect, useRef, useCallback, useState } from "react";
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
  // Controls the CSS transition class — kept separate from isOpen so the
  // element stays mounted during the close transition on iOS WebKit.
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // When isOpen flips true: mount immediately, then add the visible class on
  // the next animation frame so the CSS transition fires (iOS WebKit requires
  // the element to be painted in its initial state before transitioning).
  useEffect(() => {
    if (isOpen) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setMounted(true);
      // rAF ensures the browser has painted the hidden state before we add
      // the visible class, which triggers the transition on iOS WebKit.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      // Remove visible class first (triggers close transition), then unmount
      setVisible(false);
      closeTimerRef.current = setTimeout(() => {
        setMounted(false);
      }, 280); // matches transition duration in CSS
    }
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [isOpen]);

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
    if (!visible || !drawerRef.current) return;

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
  }, [visible]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`mobile-nav-backdrop${visible ? " mobile-nav-backdrop-visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`mobile-nav-drawer${visible ? " mobile-nav-drawer-open" : ""}`}
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

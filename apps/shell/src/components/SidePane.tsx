import { useEffect, useRef, memo } from "react";
import { PaneContent } from "./PaneContent";
import type { PaneType } from "./PaneContent";

interface SidePaneProps {
  open: boolean;
  activePane: PaneType | null;
  onClose: () => void;
  ariaLabel?: string;
  activePath: string;
}

// Memoised so it only re-renders when its own props change,
// not when the parent AppShell re-renders for unrelated reasons.
export const SidePane = memo(function SidePane({
  open,
  activePane,
  onClose,
  ariaLabel,
  activePath,
}: SidePaneProps) {
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const paneRef = useRef<HTMLDivElement>(null);

  // Keep a stable ref to onClose so the keydown effect never needs to
  // re-register just because the parent passed a new function identity.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Single, stable keydown listener — never torn down/re-added
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []); // empty deps — intentional, uses ref

  // Focus management only when open state changes
  useEffect(() => {
    if (open) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      // Delay focus until after the CSS transition has started
      const t = setTimeout(() => {
        const firstFocusable = paneRef.current?.querySelector<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        (firstFocusable ?? paneRef.current)?.focus();
      }, 50);
      return () => clearTimeout(t);
    } else {
      previouslyFocusedRef.current?.focus();
      previouslyFocusedRef.current = null;
    }
  }, [open]);

  // Disable background scroll while pane is open
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  return (
    <>
      {/* Overlay — always in DOM, CSS drives opacity */}
      <div
        className={`arch-overlay${open ? " arch-overlay-visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Pane shell — always in DOM, CSS drives transform + visibility */}
      <div
        ref={paneRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel ?? "Context pane"}
        tabIndex={-1}
        className={`arch-pane${open ? " arch-pane-open" : ""}`}
        style={{ outline: "none" }}
      >
        {/* MemoContent keeps pane content stable across open/close cycles
            and only re-renders when activePane or activePath actually changes */}
        <MemoContent
          activePane={activePane}
          activePath={activePath}
          onClose={onClose}
        />
      </div>
    </>
  );
});

interface MemoContentProps {
  activePane: PaneType | null;
  activePath: string;
  onClose: () => void;
}

// Separate memoised component so the pane content tree is completely
// isolated from the open/close toggle — toggling open never re-renders content.
const MemoContent = memo(function MemoContent({
  activePane,
  activePath,
  onClose,
}: MemoContentProps) {
  if (!activePane) return null;
  return (
    <PaneContent
      type={activePane}
      activePath={activePath}
      onClose={onClose}
    />
  );
});

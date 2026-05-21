import { useCallback } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

interface Props {
  open: boolean;
  activePath: string;
  onClose: () => void;
}

/* ── Data ─────────────────────────────────────────────────────────────── */
interface A11yItem {
  label: string;
  code?: string;
  wcag?: string;
  scope?: string;
}

interface A11yGroup {
  id: string;
  title: string;
  items: A11yItem[];
}

const A11Y_GROUPS: A11yGroup[] = [
  {
    id: "navigation",
    title: "Navigation & Focus",
    items: [
      { label: "Skip-to-content link visible on keyboard focus", code: "a[href='#main-content']", wcag: "2.4.1" },
      { label: "Active nav link annotated with", code: "aria-current='page'", wcag: "4.1.2" },
      { label: "Focus-visible ring on all interactive elements", code: ":focus-visible", wcag: "2.4.7" },
      { label: "Focus trap: Tab / Shift+Tab cycles within pane, Escape closes", wcag: "2.1.1, 2.4.3" },
    ],
  },
  {
    id: "landmarks",
    title: "Landmarks & Semantics",
    items: [
      { label: "Page landmarks", code: "role='banner'  role='main'  role='navigation'", wcag: "1.3.1" },
      { label: "Nav region labelled", code: "aria-label='Main navigation'" },
      { label: "Heading hierarchy h1–h3 maintained across all MFEs, no skipped levels", wcag: "1.3.1" },
      { label: "Decorative icons suppressed", code: "aria-hidden='true'  focusable='false'" },
    ],
  },
  {
    id: "live",
    title: "Live Regions & State",
    items: [
      { label: "Framework badge announces on route change", code: "aria-live='polite'", wcag: "4.1.3" },
      { label: "Theme toggle carries dynamic label", code: "aria-label='Switch to …'", wcag: "4.1.2" },
    ],
  },
  {
    id: "mfe",
    title: "Per-MFE",
    items: [
      { label: "Career timeline", code: "ol[aria-label='Career timeline']", scope: "Angular", wcag: "1.3.1" },
      { label: "Date strings wrapped in", code: "time[datetime]", scope: "Angular" },
      { label: "Company entries use", code: "article[aria-labelledby]", scope: "Vue", wcag: "1.3.1" },
      { label: "Slot cards: article landmarks + labelled status badges", scope: "Svelte", wcag: "4.1.2" },
      { label: "Shadow DOM root exposes", code: "role='main'", scope: "Web Components", wcag: "1.3.1" },
      { label: "Skill tag list inside Shadow DOM", code: "role='list'", scope: "Web Components" },
    ],
  },
  {
    id: "contrast",
    title: "Color & Contrast",
    items: [
      { label: "All text/background pairs verified at 4.5:1 minimum", wcag: "1.4.3" },
      { label: "UI components and focus indicators meet 3:1 non-text contrast", wcag: "1.4.11" },
      { label: "Verified with Deque axe DevTools" },
    ],
  },
];

export function AccessibilityPane({ open, onClose }: Props) {
  const paneRef = useFocusTrap<HTMLElement>(open);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  return (
    <aside
      ref={paneRef}
      className="arch-pane-inner"
      aria-label="Accessibility pane"
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div className="arch-pane-header">
        <div className="arch-pane-title-row">
          <span className="arch-pane-icon arch-pane-icon-a11y" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
              <circle cx="12" cy="5" r="2" fill="currentColor" stroke="none"/>
              <path d="M12 8v5" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7 11h10" strokeWidth="2" strokeLinecap="round"/>
              <path d="M9 21l3-5 3 5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <div>
            <h2 className="arch-pane-title">Accessibility</h2>
            <span className="arch-pane-badge arch-pane-badge-a11y">WCAG 2.2 AA</span>
          </div>
        </div>
        <button className="arch-pane-close" onClick={onClose} aria-label="Close accessibility pane">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="arch-pane-body" role="region" aria-label="Accessibility features">
        {A11Y_GROUPS.map((group) => (
          <div key={group.id} className="arch-pane-section a11y-group">
            <p className="arch-section-label">{group.title}</p>
            <ul className="a11y-list" role="list">
              {group.items.map((item, idx) => (
                <li key={idx} className="a11y-row">
                  <span className="a11y-dot" aria-hidden="true" />
                  <span className="a11y-row-text">
                    {item.label}
                    {item.code && <code className="a11y-code">{item.code}</code>}
                    {item.scope && <span className="a11y-scope">{item.scope}</span>}
                    {item.wcag && (
                      <span className="a11y-wcag" aria-label={`WCAG ${item.wcag}`}>
                        {item.wcag}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="a11y-footer-note">
          Verified with <strong>Deque axe DevTools</strong>. Manual keyboard &amp; screen-reader testing recommended for full validation.
        </p>
      </div>
    </aside>
  );
}

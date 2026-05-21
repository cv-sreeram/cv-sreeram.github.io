import { useCallback, useState } from "react";

interface Props {
  activePath: string;
  onClose: () => void;
}

interface ArchSection {
  title: string;
  items: string[];
}

const ARCH_SECTIONS: ArchSection[] = [
  {
    title: "Shell Application",
    items: [
      "React 18.3 with TypeScript",
      "React Router v6 for navigation",
      "Single-SPA orchestration",
      "CSS Custom Properties theming",
      "Responsive mobile-first design",
    ],
  },
  {
    title: "Micro-Frontends",
    items: [
      "mfe-react-home: React 18 SPA",
      "mfe-angular-about: Angular 18 standalone",
      "mfe-vue-page: Vue 3 Composition API",
      "mfe-svelte-page: Svelte 4 with stores",
      "mfe-webcomponent-education: Native Web Components",
    ],
  },
  {
    title: "Build System",
    items: [
      "NX 22 monorepo with caching",
      "Vite 5 for bundling",
      "Tailwind CSS + DaisyUI",
      "Parallel dev servers",
      "Affected builds optimization",
    ],
  },
];

export function ArchitecturePane({ activePath, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "details">("overview");

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  return (
    <aside
      className="arch-pane-inner"
      aria-label="Architecture pane"
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div className="arch-pane-header">
        <div className="arch-pane-title-row">
          <span className="arch-pane-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="18" height="18">
              <rect x="2" y="3" width="20" height="4" rx="1"/>
              <rect x="2" y="10" width="20" height="4" rx="1"/>
              <rect x="2" y="17" width="20" height="4" rx="1"/>
            </svg>
          </span>
          <div>
            <h2 className="arch-pane-title">Architecture</h2>
            <span className="arch-pane-badge">System Overview</span>
          </div>
        </div>
        <button className="arch-pane-close" onClick={onClose} aria-label="Close pane">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Tab bar */}
      <div className="arch-pane-tabs" role="tablist" aria-label="Pane sections">
        <button
          role="tab"
          aria-selected={activeTab === "overview"}
          className={`arch-tab-btn ${activeTab === "overview" ? "arch-tab-btn-active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "details"}
          className={`arch-tab-btn ${activeTab === "details" ? "arch-tab-btn-active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
      </div>

      {/* Body */}
      <div className="arch-pane-body" role="tabpanel">
        {activeTab === "overview" ? (
          <>
            {ARCH_SECTIONS.map((section) => (
              <div key={section.title} className="arch-pane-section">
                <p className="arch-section-label">{section.title}</p>
                <ul className="arch-patterns" role="list">
                  {section.items.map((item) => (
                    <li key={item} className="arch-pattern-item">
                      <span className="arch-pattern-dot" aria-hidden="true" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="arch-pane-section">
              <p className="arch-section-label">Current Route</p>
              <p className="text-sm text-secondary">{activePath}</p>
            </div>
          </>
        ) : (
          <div className="arch-pane-section">
            <p className="arch-section-label">Detailed Architecture</p>
            <p className="text-sm text-secondary">Detailed view coming soon...</p>
          </div>
        )}
      </div>
    </aside>
  );
}

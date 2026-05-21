import type { PaneType } from "./PaneContent";

interface SideRailProps {
  activePane: PaneType | null;
  paneOpen: boolean;
  onSelectPane: (type: PaneType) => void;
  onClose: () => void;
}

// Tabler Icons — MIT licensed, 24×24 stroke-based
const ArchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
    {/* sitemap */}
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
    <path d="M15 17a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
    <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
    <path d="M6 15v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1" />
    <path d="M12 9v3" />
  </svg>
);

// Original a11y.svg — circular accessibility symbol (fill-based, matches the asset)
const A11yIcon = () => (
  <svg viewBox="0 0 1920 1920" fill="currentColor" width="20" height="20" aria-hidden="true">
    <path d="M960 2c529.355 0 960 430.645 960 960s-430.645 960-960 960S0 1491.355 0 962 430.645 2 960 2Zm0 112.941c-467.125 0-847.059 379.934-847.059 847.059 0 467.125 379.934 847.059 847.059 847.059 467.125 0 847.059-379.934 847.059-847.059 0-467.125-379.934-847.059-847.059-847.059Zm436.704 520.291h-914.56c-31.04 0-55.467 24.427-55.467 55.467 0 31.146 24.427 55.573 55.467 55.573h275.307v887.787c0 31.146 24.32 55.573 55.466 55.573 31.04 0 55.467-24.427 55.467-55.573v-375.04h146.453v375.04c0 31.146 24.427 55.573 55.467 55.573 31.147 0 55.573-24.427 55.573-55.573V744.032h275.307c31.04 0 55.467-24.427 55.467-55.467-6.72-28.906-31.04-53.333-59.947-53.333m-457.29-315.21c73.6 0 133.226 59.626 133.226 133.226 0 73.493-59.627 133.12-133.227 133.12-73.493 0-133.226-59.627-133.226-133.12 0-73.6 59.733-133.227 133.226-133.227" fillRule="evenodd"/>
  </svg>
);

const LearnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
    strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
    {/* books */}
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
    <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
    <path d="M5 8h4" />
    <path d="M9 16h4" />
    <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219z" />
    <path d="M14 9l4 -1" />
    <path d="M16 16l3.923 -.98" />
  </svg>
);

export function SideRail({ activePane, paneOpen, onSelectPane, onClose }: SideRailProps) {
  const handleClick = (type: PaneType) => {
    if (activePane === type && paneOpen) {
      onClose();
    } else {
      onSelectPane(type);
    }
  };

  const isActive = (type: PaneType) => activePane === type && paneOpen;

  const buttons: { type: PaneType; label: string; Icon: () => JSX.Element; mod: string }[] = [
    { type: "architecture", label: "Architecture", Icon: ArchIcon,  mod: "arch"  },
    { type: "accessibility", label: "Accessibility", Icon: A11yIcon, mod: "a11y"  },
    { type: "learning",      label: "Learning",      Icon: LearnIcon, mod: "learn" },
  ];

  return (
    <nav
      className={`side-rail ${paneOpen ? "side-rail-shifted" : ""}`}
      aria-label="Context panels"
    >
      {/* decorative top dot */}
      <span className="side-rail-dot" aria-hidden="true" />

      {buttons.map(({ type, label, Icon, mod }) => (
        <div key={type} className="side-rail-item">
          <button
            type="button"
            className={`side-rail-btn side-rail-btn-${mod} ${isActive(type) ? "side-rail-btn-active" : ""}`}
            onClick={() => handleClick(type)}
            aria-label={label}
            aria-pressed={isActive(type)}
          >
            <span className="side-rail-btn-bg" aria-hidden="true" />
            <Icon />
          </button>
          <span className="side-rail-tooltip" role="tooltip">{label}</span>
        </div>
      ))}

      {/* decorative bottom dot */}
      <span className="side-rail-dot" aria-hidden="true" />
    </nav>
  );
}

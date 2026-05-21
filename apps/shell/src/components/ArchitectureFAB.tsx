interface ArchitectureFABProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ArchitectureFAB({ isOpen, onToggle }: ArchitectureFABProps) {
  return (
    <div className="arch-fab-wrapper">
      <button
        type="button"
        className={`arch-fab ${isOpen ? "arch-fab-open" : ""}`}
        onClick={onToggle}
        aria-label={isOpen ? "Close architecture pane" : "View architecture"}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="20" height="20">
            <rect x="2" y="3" width="20" height="4" rx="1"/>
            <rect x="2" y="10" width="20" height="4" rx="1"/>
            <rect x="2" y="17" width="20" height="4" rx="1"/>
          </svg>
        )}
      </button>
      {!isOpen && <span className="arch-fab-tooltip">View Architecture</span>}
    </div>
  );
}

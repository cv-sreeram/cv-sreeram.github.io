interface LoadingStateProps {
  loaderText: string;
  mfeStateMessage: string;
}

export function LoadingState({ loaderText }: LoadingStateProps) {
  return (
    <section
      role="status"
      aria-live="polite"
      aria-label={loaderText || "Loading"}
      style={{
        borderRadius: "var(--radius)",
        border: "1px solid var(--border-soft)",
        background: "var(--surface)",
        overflow: "hidden",
      }}
    >
      {/* Sliding progress bar */}
      <div style={{ height: 2, background: "var(--surface-alt)", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
            animation: "ls-bar 1.4s ease-in-out infinite",
          }}
        />
      </div>

      <div style={{ padding: "1rem 1.25rem" }}>
        {/* Spinner + text */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem" }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0, animation: "ls-spin 0.85s linear infinite" }}
          >
            <circle cx="9" cy="9" r="7" stroke="var(--border)" strokeWidth="2" />
            <path d="M9 2a7 7 0 0 1 7 7" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>
            {loaderText || "Loading…"}
          </span>
        </div>

        {/* Skeleton lines */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }} aria-hidden="true">
          <div style={{ height: 9, borderRadius: 4, background: "var(--surface-alt)", width: "65%", animation: "ls-pulse 1.6s ease-in-out infinite" }} />
          <div style={{ height: 9, borderRadius: 4, background: "var(--surface-alt)", width: "45%", animation: "ls-pulse 1.6s ease-in-out 0.2s infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes ls-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ls-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes ls-pulse {
          0%, 100% { opacity: 0.45; }
          50%       { opacity: 0.85; }
        }
      `}</style>
    </section>
  );
}

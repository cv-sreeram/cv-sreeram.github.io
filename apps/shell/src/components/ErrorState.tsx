interface ErrorStateProps {
  errorMessage: string;
}

export function ErrorState({ errorMessage }: ErrorStateProps) {
  return (
    <section className="state-panel mb-5" style={{ borderColor: 'rgba(220, 38, 38, 0.4)' }}>
      <div className="card-body-tight">
        <div className="state-panel-icon" style={{ borderColor: 'rgba(248, 113, 113, 0.3)', background: 'rgba(127, 29, 29, 0.2)', color: 'var(--error)' }}>
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.7">
            <path d="M12 8v5m0 3h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          </svg>
        </div>
        <h3 className="mb-1 text-lg font-semibold" style={{ color: 'var(--error)' }}>Micro-Frontend failed to render</h3>
        <p className="mb-0 text-sm" style={{ color: 'var(--text-muted)' }}>{errorMessage}</p>
      </div>
    </section>
  );
}

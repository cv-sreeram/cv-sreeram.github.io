export function EmptyState() {
  return (
    <section className="state-panel mb-5">
      <div className="card-body-tight">
        <div className="state-panel-icon text-content">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.7">
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
            <path d="M8 13h8" />
          </svg>
        </div>
        <h3 className="mb-1 text-lg font-semibold text-content">No page configured for this route</h3>
        <p className="mb-0 text-sm text-muted">Try switching to one of the portfolio sections from the top navigation.</p>
      </div>
    </section>
  );
}

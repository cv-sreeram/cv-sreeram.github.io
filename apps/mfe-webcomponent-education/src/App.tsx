import { onMount } from "solid-js";
import { emitFrameworkActive, emitMfeState } from "@my-portal/utils";

export default function App() {
  onMount(() => {
    emitFrameworkActive("SolidJS", window.location.pathname);
    emitMfeState("mfe-solid-education", "ready", "Solid education page is ready.");
  });

  return (
    <section className="section-card mb-5">
      <div className="card-body-tight">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="mb-1 text-base font-semibold text-content">Education</h2>
            <p className="text-sm text-muted">Academic foundation and qualifications from your resume.</p>
          </div>
          <span className="badge badge-outline border-surface text-muted">SolidJS MFE</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-surface bg-surface p-4">
            <h3 className="text-sm font-semibold text-content">NSS College of Engineering</h3>
            <p className="text-muted mb-1">Bachelor of Technology: Electrical Engineering</p>
            <p className="text-muted-strong">Jan 2010 — Feb 2014 · Palakkad</p>
          </article>
          <article className="rounded-xl border border-surface bg-surface p-4">
            <h3 className="text-sm font-semibold text-content">Palghat Lions School</h3>
            <p className="text-muted mb-1">PLUS TWO</p>
            <p className="text-muted-strong">Apr 2009 — Jan 2010 · Palakkad</p>
          </article>
        </div>
      </div>
    </section>
  );
}

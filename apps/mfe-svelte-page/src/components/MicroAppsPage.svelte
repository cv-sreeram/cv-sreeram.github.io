<script lang="ts">
  import { onMount } from "svelte";
  import { emitFrameworkActive, emitMfeError, emitMfeState } from "@my-portal/utils";

  onMount(() => {
    emitMfeState("mfe-svelte-page", "loading", "Preparing the micro apps hub...");
    emitFrameworkActive("Svelte", window.location.pathname);
    emitMfeState("mfe-svelte-page", "ready", "Micro apps placeholder is ready.");
  });
</script>

<main class="profile-page" id="main-content">
  <article class="hero-card" aria-labelledby="micro-heading">
    <div class="card-body-tight">
      <p class="about-eyebrow">Svelte · Shell Integration · Future App Hosting</p>
      <h1 class="about-heading" id="micro-heading">Micro Apps</h1>
      <p class="about-lead">A dedicated hub for hosting small interactive apps, widgets, and framework-specific demos — each isolated in their own micro-frontend runtime.</p>
      <ul class="meta-row" role="list" aria-label="Technology tags">
        <li class="pill">Svelte</li>
        <li class="pill">Shell Integration</li>
        <li class="pill">Future App Hosting</li>
        <li class="pill">Placeholder Ready</li>
      </ul>
    </div>
  </article>

  <article class="section-card" aria-labelledby="slots-heading">
    <div class="card-body-tight">
      <h2 class="section-title" id="slots-heading">
        <svg viewBox="0 0 24 24" class="section-icon" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true" focusable="false">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
        </svg>
        App Slots
      </h2>
      <ul class="micro-slots-grid" role="list">
        <li class="micro-slot">
          <div class="micro-slot-top">
            <span class="micro-slot-name">Framework Playground</span>
            <span class="micro-slot-status micro-slot-soon" aria-label="Status: Coming Soon">Coming Soon</span>
          </div>
          <p class="micro-slot-desc">Small reusable UI experiences built in the framework of choice — React, Vue, Svelte, or vanilla.</p>
          <ul class="micro-slot-tags" role="list" aria-label="Technologies">
            <li class="micro-tag">React</li>
            <li class="micro-tag">Vue</li>
            <li class="micro-tag">Svelte</li>
          </ul>
        </li>
        <li class="micro-slot">
          <div class="micro-slot-top">
            <span class="micro-slot-name">Live Demo Hub</span>
            <span class="micro-slot-status micro-slot-soon" aria-label="Status: Coming Soon">Coming Soon</span>
          </div>
          <p class="micro-slot-desc">A host for live interactive demos and tech-specific utilities showcasing real-world patterns.</p>
          <ul class="micro-slot-tags" role="list" aria-label="Technologies">
            <li class="micro-tag">Demos</li>
            <li class="micro-tag">Utilities</li>
          </ul>
        </li>
        <li class="micro-slot">
          <div class="micro-slot-top">
            <span class="micro-slot-name">Isolated Runtime</span>
            <span class="micro-slot-status micro-slot-ready" aria-label="Status: Shell Ready">Shell Ready</span>
          </div>
          <p class="micro-slot-desc">Proves the Svelte MFE lifecycle and event bus integration with the shell — fully operational today.</p>
          <ul class="micro-slot-tags" role="list" aria-label="Technologies">
            <li class="micro-tag">Single-SPA</li>
            <li class="micro-tag">Events</li>
          </ul>
        </li>
      </ul>
    </div>
  </article>

  <article class="section-card" aria-labelledby="how-heading">
    <div class="card-body-tight">
      <h2 class="section-title" id="how-heading">
        <svg viewBox="0 0 24 24" class="section-icon" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true" focusable="false">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
        How It Works
      </h2>
      <ul class="impact-list" aria-label="How micro-frontend integration works">
        <li>Each micro app is independently developed and deployed at its own URL.</li>
        <li>The shell registers and mounts apps via Single-SPA route configuration.</li>
        <li>Cross-app communication is handled through a shared event bus in <code class="micro-code">@my-portal/utils</code>.</li>
        <li>The shell remains stable while individual apps evolve and deploy independently.</li>
      </ul>
    </div>
  </article>
</main>

<style>
  /* Svelte Micro Apps MFE — scoped styles consuming shell CSS custom properties */
  /* Svelte automatically scopes these to this component via compiled class hashes */

  main.profile-page {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding-bottom: 2rem;
  }

  @media (max-width: 639px) {
    main.profile-page {
      padding-bottom: 5.5rem;
    }
  }

  article.hero-card {
    border: 1px solid var(--primary);
    border-radius: var(--radius);
    background: var(--surface);
    padding: 1.5rem;
  }

  article.section-card {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: var(--surface);
    padding: 1.5rem;
    transition: border-color 0.15s ease;
  }

  article.section-card:hover {
    border-color: rgba(13, 148, 136, 0.3);
  }

  .card-body-tight {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .about-eyebrow {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--primary);
    margin: 0;
  }

  .about-heading {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 800;
    line-height: 1.1;
    color: var(--text);
    letter-spacing: -0.02em;
    margin: 0;
  }

  .about-lead {
    font-size: 1rem;
    color: var(--text-muted);
    line-height: 1.7;
    margin: 0;
    max-width: 64ch;
  }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0;
  }

  .pill {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    border-radius: 9999px;
    border: 1px solid var(--border);
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    background: var(--surface-strong);
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--text);
    margin: 0;
  }

  .section-icon {
    width: 1rem;
    height: 1rem;
    color: var(--primary);
    flex-shrink: 0;
  }

  .micro-slots-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 480px) and (max-width: 767px) {
    .micro-slots-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 768px) {
    .micro-slots-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .micro-slot {
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--surface-strong);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: border-color 0.15s;
  }

  .micro-slot:hover {
    border-color: var(--primary);
  }

  .micro-slot-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .micro-slot-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text);
  }

  .micro-slot-status {
    font-size: 0.65rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 9999px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .micro-slot-soon {
    background: rgba(217, 119, 6, 0.12);
    color: #92400e;
    border: 1px solid rgba(217, 119, 6, 0.25);
  }

  :global(html[data-theme="execdark"]) .micro-slot-soon {
    color: #fbbf24;
    background: rgba(245, 158, 11, 0.15);
    border-color: rgba(251, 191, 36, 0.3);
  }

  .micro-slot-ready {
    background: rgba(22, 163, 74, 0.1);
    color: #166534;
    border: 1px solid rgba(22, 163, 74, 0.25);
  }

  :global(html[data-theme="execdark"]) .micro-slot-ready {
    color: #4ade80;
    background: rgba(34, 197, 94, 0.12);
    border-color: rgba(74, 222, 128, 0.3);
  }

  .micro-slot-desc {
    font-size: 0.8rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
    flex: 1;
  }

  .micro-slot-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .micro-tag {
    font-size: 0.65rem;
    font-weight: 500;
    padding: 0.1rem 0.45rem;
    border-radius: 9999px;
    background: var(--surface-strong);
    color: var(--text-muted);
    border: 1px solid var(--border);
  }

  .impact-list {
    padding-left: 1.25rem;
    margin: 0;
  }

  .impact-list :global(li) {
    margin-bottom: 0.5rem;
    line-height: 1.6;
    color: var(--text);
    font-size: 0.875rem;
  }

  code.micro-code {
    font-family: ui-monospace, monospace;
    font-size: 0.82em;
    background: var(--surface-strong);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 0.05em 0.35em;
    color: var(--primary);
  }
</style>

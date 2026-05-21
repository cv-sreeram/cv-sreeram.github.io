import { emitFrameworkActive, emitMfeState } from "@my-portal/utils";

/**
 * EducationApp — Web Component (Custom Elements v1, Shadow DOM)
 *
 * Styling strategy:
 *   1. Adopt the shell's `tokens.css` at runtime via the Constructable
 *      Stylesheet API. This gives the Shadow DOM access to all CSS custom
 *      properties (--primary, --surface, --text, etc.) without duplicating
 *      them here.
 *   2. A small local stylesheet defines only the component-specific layout
 *      and structural rules that are not part of the shared token set.
 *
 * Why fetch instead of @import?
 *   Shadow DOM does not inherit non-inherited CSS properties from the light
 *   DOM, so we cannot rely on the shell's <style> tag. Constructable
 *   Stylesheets (adoptedStyleSheets) are the standard solution — they let
 *   multiple shadow roots share a single parsed CSSStyleSheet object with
 *   zero duplication.
 */

// Module-level cache so every instance shares one parsed sheet.
let tokenSheet: CSSStyleSheet | null = null;

async function getTokenSheet(): Promise<CSSStyleSheet> {
  if (tokenSheet) return tokenSheet;

  // tokens.css is served as a static asset by the shell at /tokens.css
  const response = await fetch("/tokens.css");
  if (!response.ok) {
    throw new Error(`Failed to load tokens.css: ${response.status}`);
  }
  const css = await response.text();
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  tokenSheet = sheet;
  return sheet;
}

/** Component-specific styles — layout and structure only, no token values. */
const LOCAL_STYLES = `
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :host {
    display: block;
    padding-bottom: 2rem;
    color: var(--text, #0f172a);
    font-family: Inter, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  @media (max-width: 639px) {
    :host { padding-bottom: 5.5rem; }
  }

  /* ── Page layout ── */
  .education-container {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* ── Hero card ── */
  .hero-card {
    border: 1px solid var(--primary, #0d9488);
    border-radius: var(--radius, 0.75rem);
    background: var(--surface, #ffffff);
    padding: 1.5rem;
  }

  .card-body-tight {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .card-body-tight {
    padding: 1.5rem;
  }

  .eyebrow {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--primary, #0d9488);
    margin: 0;
  }

  h1 {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 800;
    line-height: 1.1;
    color: var(--text, #0f172a);
    letter-spacing: -0.02em;
    margin: 0;
  }

  .lead {
    font-size: 1rem;
    color: var(--text-muted, #475569);
    line-height: 1.7;
    margin: 0;
    max-width: 64ch;
  }

  /* ── Section card ── */
  .section-card {
    border: 1px solid var(--border, rgba(15,23,42,0.08));
    border-radius: var(--radius, 0.75rem);
    background: var(--surface, #ffffff);
    padding: 1.5rem;
    transition: border-color 0.15s ease;
  }

  .section-card:hover {
    border-color: rgba(13, 148, 136, 0.3);
  }

  .section-title {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--text, #0f172a);
    margin: 0 0 1.25rem;
  }

  /* ── Timeline ── */
  .education-list {
    position: relative;
    padding-left: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .education-list::before {
    content: "";
    position: absolute;
    left: 7px;
    top: 8px;
    bottom: 8px;
    width: 1px;
    background: var(--border, rgba(15,23,42,0.08));
  }

  .education-item {
    position: relative;
    padding-bottom: 1.5rem;
    list-style: none;
  }

  .education-item:last-child {
    padding-bottom: 0;
  }

  .education-dot {
    position: absolute;
    left: -1.4rem;
    top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--primary, #0d9488);
    border: 2px solid var(--surface, #ffffff);
    box-shadow: 0 0 0 2px var(--primary, #0d9488);
  }

  .education-item h3 {
    margin: 0 0 0.25rem;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text, #0f172a);
  }

  .education-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .education-degree {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--primary, #0d9488);
  }

  .education-years {
    font-size: 0.72rem;
    color: var(--text-muted-strong, #94a3b8);
    background: var(--surface-strong, #f1f5f9);
    border: 1px solid var(--border, rgba(15,23,42,0.08));
    padding: 0.1rem 0.5rem;
    border-radius: 9999px;
  }

  .education-description {
    font-size: 0.85rem;
    color: var(--text-muted, #475569);
    line-height: 1.5;
    margin: 0;
  }

  /* ── Skill tags ── */
  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.75rem;
    list-style: none;
    padding: 0;
  }

  .skill-tag {
    display: inline-block;
    padding: 0.2rem 0.65rem;
    background: var(--surface-strong, #f1f5f9);
    color: var(--text-muted, #475569);
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid var(--border, rgba(15,23,42,0.08));
    transition: border-color 0.15s, color 0.15s;
  }

  .skill-tag:hover {
    border-color: var(--primary, #0d9488);
    color: var(--primary, #0d9488);
  }

  .skill-tag.primary {
    background: var(--primary, #0d9488);
    color: var(--primary-foreground, #ffffff);
    border-color: var(--primary, #0d9488);
  }
`;

export default class EducationApp extends HTMLElement {
  private localSheet: CSSStyleSheet;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Parse the local stylesheet once per instance (cheap — no fetch needed)
    this.localSheet = new CSSStyleSheet();
    this.localSheet.replaceSync(LOCAL_STYLES);
  }

  async connectedCallback() {
    try {
      const tokens = await getTokenSheet();
      // Adopt both sheets: tokens first so local rules can override if needed
      this.shadowRoot!.adoptedStyleSheets = [tokens, this.localSheet];
    } catch {
      // Graceful degradation: fall back to inline CSS custom property defaults
      // already baked into LOCAL_STYLES via var(--token, <fallback>)
      this.shadowRoot!.adoptedStyleSheets = [this.localSheet];
    }

    this.render();
    emitFrameworkActive("Web Components", window.location.pathname);
    emitMfeState(
      "mfe-webcomponent-education",
      "ready",
      "Web Components education page is ready."
    );
  }

  private render() {
    const container = document.createElement("main");
    container.className = "education-container";
    container.id = "main-content";
    container.setAttribute("role", "main");
    container.innerHTML = `
      <article class="hero-card" aria-labelledby="edu-heading">
        <div class="card-body-tight">
          <p class="eyebrow">Web Components · Shadow DOM · Custom Elements v1</p>
          <h1 id="edu-heading">Education</h1>
          <p class="lead">Academic foundation in computer science and engineering from NSS College of Engineering, Palakkad.</p>
        </div>
      </article>

      <section class="section-card" aria-labelledby="timeline-heading">
        <div class="card-body-tight">
        <h2 class="section-title" id="timeline-heading">Academic Timeline</h2>
          <ol class="education-list" aria-label="Academic timeline">
            <li class="education-item">
              <div class="education-dot" aria-hidden="true"></div>
              <h3>NSS College of Engineering</h3>
              <div class="education-meta">
                <span class="education-degree">B.Tech · Electrical Engineering</span>
                <time class="education-years" datetime="2010-01">Jan 2010 – Feb 2014</time>
              </div>
              <p class="education-description">
                Palakkad — Comprehensive foundation in engineering fundamentals, mathematics, and early web development. Developed problem-solving skills applied to full-stack and frontend systems.
              </p>
              <ul class="skills" role="list" aria-label="Skills gained">
                <li class="skill-tag primary">Engineering</li>
                <li class="skill-tag primary">Mathematics</li>
                <li class="skill-tag">Web Development</li>
                <li class="skill-tag">Algorithms</li>
              </ul>
            </li>

            <li class="education-item">
              <div class="education-dot" aria-hidden="true"></div>
              <h3>Palghat Lions School</h3>
              <div class="education-meta">
                <span class="education-degree">PLUS TWO · Science Stream</span>
                <time class="education-years" datetime="2009-04">Apr 2009 – Jan 2010</time>
              </div>
              <p class="education-description">
                Palakkad — Strong foundation in mathematics, physics, and chemistry. Cultivated analytical thinking and a passion for technology.
              </p>
              <ul class="skills" role="list" aria-label="Skills gained">
                <li class="skill-tag primary">Mathematics</li>
                <li class="skill-tag primary">Physics</li>
                <li class="skill-tag">Chemistry</li>
              </ul>
            </li>
          </ol>
        <div class="card-body-tight">
      </section>
    `;

    this.shadowRoot!.appendChild(container);
  }

  disconnectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = "";
      this.shadowRoot.adoptedStyleSheets = [];
    }
  }
}

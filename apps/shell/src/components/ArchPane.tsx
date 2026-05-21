import React, { useEffect, useCallback, useState } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

interface Dep { name: string; version: string; purpose: string; }
interface ArchData {
  title: string;
  framework: string;
  frameworkVersion: string;
  cssApproach: string;
  tree: string;
  deps: Dep[];
  patterns: string[];
}

/* ─── Per-route "Details" tab content ───────────────────────────────────── */
interface ArchDetail {
  decisions: { title: string; rationale: string }[];
  tradeoffs: string[];
  integration: string[];
}

const archDetails: Record<string, ArchDetail> = {
  "/home": {
    decisions: [
      { title: "React as shell framework", rationale: "Mature ecosystem, excellent TypeScript support, and light weight. Concurrent rendering handles complex state transitions during MFE mount/unmount." },
      { title: "Single-SPA for orchestration", rationale: "Framework-agnostic lifecycle management lets each MFE use its own framework without a shared runtime. Enables independent deployments." },
      { title: "NX monorepo", rationale: "Affected builds and computation caching cut CI time significantly. Shared packages (@my-portal/utils, @my-portal/ui) are consumed without publishing to npm." },
      { title: "Vite over Webpack", rationale: "Native ESM dev server eliminates bundle-on-change overhead. HMR is near-instant even in a monorepo with 5+ apps." },
    ],
    tradeoffs: [
      "Single-SPA adds ~15 KB to the shell bundle",
      "Each MFE ships its own framework runtime — total page weight is higher than a single-framework SPA",
      "Cross-MFE state sharing requires the event bus; no shared React context",
      "Zone.js (Angular MFE) can interfere with global error handling if not isolated",
    ],
    integration: [
      "Shell registers MFEs via registerApplication() with activeWhen route predicates",
      "Event bus (CustomEvent on window) carries framework:active and mfe:state signals",
      "CSS custom properties on :root are inherited by all MFEs — no CSS-in-JS needed",
      "Each MFE emits emitFrameworkActive() on mount to update the FrameworkBadge",
    ],
  },
  "/about": {
    decisions: [
      { title: "Angular standalone components", rationale: "Eliminates NgModule boilerplate. Simpler bootstrapping and tree-shaking for a single-page MFE." },
      { title: "SCSS via Vite ?inline", rationale: "Importing SCSS as a raw string lets Angular's styles: [] inject it at runtime, avoiding a separate <link> tag that conflicts with scoping." },
      { title: "No Angular Router", rationale: "Single-SPA owns routing. Angular Router would conflict with react-router-dom in the shell. The MFE renders a single view." },
    ],
    tradeoffs: [
      "Zone.js adds ~35 KB gzipped — largest single dependency in this MFE",
      "Angular's DI system is powerful but overkill for a static profile page",
      "Template compilation happens at build time — no runtime template parsing overhead",
      "Standalone components require Angular 14.2+ — older projects need migration",
    ],
    integration: [
      "single-spa.ts exports bootstrap/mount/unmount using singleSpaAngular()",
      "emitFrameworkActive('Angular') called in ngOnInit lifecycle hook",
      "Shell CSS tokens inherited via CSS custom property cascade",
      "No shared state needed — page is purely presentational",
    ],
  },
  "/experience": {
    decisions: [
      { title: "Vue 3 Composition API", rationale: "Composables (useExperienceEvents) keep event bus logic separate from the template. Easier to test and reuse than Options API mixins." },
      { title: "Scoped styles in SFC", rationale: "Vue compiles scoped styles to unique attribute selectors, preventing leakage without Shadow DOM overhead." },
      { title: "single-spa-vue adapter", rationale: "Official adapter handles Vue app lifecycle (createApp/unmount) correctly within Single-SPA's bootstrap/mount/unmount contract." },
    ],
    tradeoffs: [
      "Scoped styles duplicate some shell token references locally — minor maintenance overhead",
      "Vue's reactivity proxy adds a small overhead vs plain objects, negligible at this scale",
      "Options API vs Composition API split can confuse developers new to Vue 3",
      "Smaller community than React means fewer ready-made enterprise component libraries",
    ],
    integration: [
      "useExperienceEvents composable calls emitFrameworkActive('Vue') on mount",
      "single-spa-vue wraps createApp() — Vue instance is destroyed on unmount",
      "Shell CSS tokens consumed via var(--*) in scoped styles with local fallbacks",
      "No Vuex/Pinia — page is static; composable handles all side effects",
    ],
  },
  "/education": {
    decisions: [
      { title: "Native Custom Elements", rationale: "Zero framework runtime. The education page is static content — 0 KB framework overhead is the right trade-off. Also demonstrates the full MFE spectrum." },
      { title: "Shadow DOM open mode", rationale: "Open mode allows DevTools inspection and external JS access to shadowRoot. Closed mode would break single-spa's DOM cleanup on unmount." },
      { title: "Inline HTML template string", rationale: "No build step needed for the template. The entire component is a single TypeScript file, making it trivially portable." },
    ],
    tradeoffs: [
      "Manual DOM updates — no reactivity system means more verbose code for dynamic content",
      "Attribute-only props — passing complex objects requires JSON.parse on attributeChangedCallback",
      "SSR requires Declarative Shadow DOM (DSD) — not yet universally supported",
      "Shadow DOM debugging is harder; browser DevTools show a separate tree",
    ],
    integration: [
      "customElements.define() called in single-spa bootstrap phase",
      "connectedCallback calls emitFrameworkActive('Web Components')",
      "CSS custom properties cross the Shadow DOM boundary via inheritance",
      "disconnectedCallback clears shadowRoot.innerHTML to prevent memory leaks",
    ],
  },
  "/micro-apps": {
    decisions: [
      { title: "Svelte for micro-apps hub", rationale: "Compiler-based approach produces the smallest runtime of all 5 MFEs. Ideal for a hub page that may host many small widgets without bloating the bundle." },
      { title: "Svelte stores for slot state", rationale: "writable/derived stores provide reactive state without a global state manager. The $ prefix auto-subscription keeps templates clean." },
      { title: "Scoped styles via compiler", rationale: "Svelte's compiler hashes class names at build time — no runtime style injection, no Shadow DOM needed. Styles are truly isolated." },
    ],
    tradeoffs: [
      "Svelte 5 Runes are a breaking paradigm shift — $: reactive labels are deprecated",
      "Smaller ecosystem means fewer pre-built components for complex UI needs",
      "single-spa-svelte adapter is less battle-tested than React/Angular equivalents",
      "No TypeScript template type-checking as strict as Angular's template compiler",
    ],
    integration: [
      "single-spa-svelte wraps new MicroAppsPage() — Svelte component lifecycle managed",
      "onMount calls emitFrameworkActive('Svelte') and emitMfeState signals",
      "Shell CSS tokens consumed via var(--*) in scoped <style> block",
      "Event bus used for loading/ready state — shell shows spinner during mount",
    ],
  },
};

/* ─── Architecture data ──────────────────────────────────────────────────── */
const archData: Record<string, ArchData> = {
  "/home": {
    title: "Shell · Single-SPA Orchestrator",
    framework: "React + NX",
    frameworkVersion: "22",
    cssApproach: "Tailwind CSS + DaisyUI + CSS custom properties",
    tree: `my-portal/ (NX monorepo + npm workspaces)
├── nx.json                  ← NX config, caching, task pipeline
├── apps/
│   ├── shell/               ← React 18 + Vite 5
│   │   └── src/
│   │       ├── components/  ← SideRail, SidePane, ArchPane…
│   │       ├── hooks/       ← useTheme, useMfeState…
│   │       ├── utils/       ← navigation.ts
│   │       ├── main.tsx     ← single-spa registration
│   │       └── theme.css    ← design tokens + all CSS
│   ├── mfe-react-home/      ← React 18
│   ├── mfe-angular-about/   ← Angular 18
│   ├── mfe-vue-page/        ← Vue 3
│   ├── mfe-svelte-page/     ← Svelte 4
│   └── mfe-webcomponent-education/
└── packages/
    ├── @my-portal/ui        ← FrameworkBadge
    └── @my-portal/utils     ← event bus`,
    deps: [
      { name: "nx", version: "^22.7.1", purpose: "Build system + task orchestration" },
      { name: "react", version: "^18.3.1", purpose: "Shell UI framework" },
      { name: "react-router-dom", version: "^7.14.2", purpose: "Client-side routing" },
      { name: "single-spa", version: "^6.0.3", purpose: "MFE orchestration" },
      { name: "vite", version: "^5.4.1", purpose: "Dev server & bundler" },
      { name: "tailwindcss", version: "^3.4.19", purpose: "Utility-first CSS" },
      { name: "daisyui", version: "^4.12.24", purpose: "Component layer on Tailwind" },
    ],
    patterns: [
      "NX monorepo: nx run-many, nx affected, nx graph",
      "Single-SPA orchestration across 5 different frameworks",
      "npm workspaces + NX project.json per app",
      "Custom event bus (framework:active, mfe:state, mfe:error)",
      "CSS variables for cross-MFE theming",
      "WCAG 2.2 AA: skip link, landmarks, aria-current, focus-visible",
      "Dark/light theme via data-theme attribute + localStorage"
    ],
  },
  "/about": {
    title: "Angular About MFE",
    framework: "Angular",
    frameworkVersion: "18.2",
    cssApproach: "SCSS with CSS custom properties via ?inline",
    tree: `mfe-angular-about/
├── project.json             ← NX targets: serve, build, typecheck
└── src/
    ├── components/
    │   ├── about.component.ts   ← Standalone component
    │   ├── about.component.scss ← SCSS styles
    │   └── index.ts
    ├── types/
    │   └── about.types.ts
    ├── utils/
    │   └── about.constants.ts
    ├── single-spa.ts            ← bootstrap/mount/unmount
    └── vite-env.d.ts`,
    deps: [
      { name: "@angular/core", version: "^18.2.5", purpose: "Core framework" },
      { name: "@angular/compiler", version: "^18.2.5", purpose: "Template compilation" },
      { name: "@angular/platform-browser", version: "^18.2.5", purpose: "DOM bootstrapping" },
      { name: "zone.js", version: "^0.14.x", purpose: "Change detection" },
      { name: "sass", version: "^1.x", purpose: "SCSS compilation" },
      { name: "@my-portal/utils", version: "workspace:*", purpose: "Event bus" },
    ],
    patterns: [
      "Standalone components — no NgModule boilerplate",
      "SCSS imported as raw string via Vite ?inline query",
      "CSS custom properties consumed via var(--*) in SCSS",
      "Single-SPA Angular lifecycle (bootstrap/mount/unmount)",
      "WCAG 2.2 AA: <ol> timeline, <time> dates, landmark <article>"
    ],
  },
  "/experience": {
    title: "Vue Experience MFE",
    framework: "Vue",
    frameworkVersion: "3.4",
    cssApproach: "Scoped <style scoped> in Vue SFC",
    tree: `mfe-vue-page/
├── project.json             ← NX targets
└── src/
    ├── components/
    │   └── ExperiencePage.vue   ← SFC with <script setup>
    ├── composables/
    │   └── useExperienceEvents.ts
    ├── types/
    │   └── experience.types.ts
    ├── utils/
    │   └── experience.constants.ts
    └── single-spa.ts`,
    deps: [
      { name: "vue", version: "^3.4.0", purpose: "UI framework" },
      { name: "single-spa-vue", version: "^3.0.1", purpose: "Single-SPA Vue adapter" },
      { name: "@vitejs/plugin-vue", version: "^4.2.0", purpose: "Vite Vue SFC support" },
      { name: "@my-portal/utils", version: "workspace:*", purpose: "Event bus" },
    ],
    patterns: [
      "Composition API with <script setup>",
      "Composables for reusable logic (useExperienceEvents)",
      "Vue SFC scoped styles, theme via var(--*)",
      "single-spa-vue lifecycle adapter",
      "WCAG 2.2 AA: <article> per company, <time> dates"
    ],
  },
  "/education": {
    title: "Web Components Education MFE",
    framework: "Web Components",
    frameworkVersion: "Custom Elements v1",
    cssApproach: "Shadow DOM :host CSS consuming shell vars",
    tree: `mfe-webcomponent-education/
├── project.json             ← NX targets
└── src/
    ├── components/
    │   └── EducationElement.ts  ← HTMLElement subclass
    ├── types/
    │   └── education.types.ts
    ├── utils/
    │   └── education.constants.ts
    ├── single-spa.tsx
    └── main.ts`,
    deps: [
      { name: "single-spa", version: "^6.0.3", purpose: "MFE lifecycle" },
      { name: "@my-portal/utils", version: "workspace:*", purpose: "Event bus" },
    ],
    patterns: [
      "Native Custom Elements (HTMLElement subclass)",
      "Shadow DOM open mode for style encapsulation",
      ":host CSS consuming shell CSS vars via inheritance",
      "customElements.define() in single-spa bootstrap",
      "Zero runtime framework dependencies",
      "WCAG 2.2 AA: role=main, <ol> timeline, role=list skills"
    ],
  },
  "/micro-apps": {
    title: "Svelte Micro Apps MFE",
    framework: "Svelte",
    frameworkVersion: "4.1",
    cssApproach: "Svelte scoped <style> block",
    tree: `mfe-svelte-page/
├── project.json             ← NX targets
└── src/
    ├── components/
    │   └── MicroAppsPage.svelte
    ├── stores/
    │   └── microApps.store.ts
    ├── types/
    │   └── micro-apps.types.ts
    ├── utils/
    │   └── micro-apps.constants.ts
    └── single-spa.ts`,
    deps: [
      { name: "svelte", version: "^4.1.0", purpose: "Compiler-based UI framework" },
      { name: "single-spa-svelte", version: "^2.1.1", purpose: "Single-SPA Svelte adapter" },
      { name: "@sveltejs/vite-plugin-svelte", version: "^3.0.0", purpose: "Vite Svelte support" },
      { name: "@my-portal/utils", version: "workspace:*", purpose: "Event bus" },
    ],
    patterns: [
      "Svelte compile-time reactivity (no virtual DOM)",
      "Scoped styles compiled to unique class hashes",
      "Svelte writable/derived stores for slot data",
      "single-spa-svelte lifecycle adapter",
      "WCAG 2.2 AA: <article> per slot, aria-label on status badges",
      "Smallest runtime footprint of all 5 MFEs",
    ],
  },
};

/* ─── NX commands ────────────────────────────────────────────────────────── */
const NX_COMMANDS = [
  { cmd: "nx run shell:serve", desc: "Start the shell dev server" },
  { cmd: "nx run-many -t serve --parallel", desc: "Start all MFEs in parallel" },
  { cmd: "nx affected -t build", desc: "Build only apps changed since main" },
  { cmd: "nx graph", desc: "Open interactive dependency graph" },
  { cmd: "nx run mfe-react-home:typecheck", desc: "Type-check a single app" },
];

/* ─── A11y items ─────────────────────────────────────────────────────────── */
const A11Y_ITEMS = [
  "Skip-to-content link visible on keyboard focus (WCAG 2.4.1)",
  "Landmark roles: header role=banner, nav aria-label, main id=main-content",
  "Active nav link: aria-current=page on current route (WCAG 4.1.2)",
  "Theme toggle: dynamic aria-label Switch to dark/light theme (WCAG 4.1.2)",
  "Framework badge: aria-live=polite announces active framework on route change",
  "All SVG icons: aria-hidden=true focusable=false to prevent redundant announcements",
  "Focus-visible ring: 2px solid var(--primary) on all :focus-visible (WCAG 2.4.7)",
  "Focus trap: Tab/Shift+Tab cycles within pane, Escape closes (WCAG 2.1.1, 2.4.3)",
  "Angular About: ol aria-label=Career timeline, time datetime on all dates",
  "Vue Experience: article per company with aria-labelledby heading",
  "Svelte Micro Apps: article per slot, aria-label on status badges",
  "Web Components Education: role=main, ol timeline, role=list on skill tags in Shadow DOM",
  "Color contrast: all colors verified WCAG 2.2 AA 4.5:1 ratio",
  "Semantic HTML: h1–h3 hierarchy maintained across all MFEs, no skipped levels",
];

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface Props {
  open: boolean;
  onClose: () => void;
  activePath: string;
}

export function ArchPane({ open, onClose, activePath }: Props) {
  const routeKey = Object.keys(archData).find((k) => activePath.startsWith(k)) ?? "/home";
  const arch = archData[routeKey];
  const detail = archDetails[routeKey];
  const paneRef = useFocusTrap<HTMLElement>(open);
  const [activeTab, setActiveTab] = useState<"overview" | "details">("overview");

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, handleKey]);

  return (
    <aside
      ref={paneRef}
      className="arch-pane-inner"
      aria-label="Architecture pane"
      role="complementary"
    >
      {/* Header */}
      <div className="arch-pane-header">
        <div className="arch-pane-title-row">
          <span className="arch-pane-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width="18" height="18">
              <path d="M3 17a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <path d="M15 17a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"/>
              <path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"/>
              <path d="M6 15v-1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1"/>
              <path d="M12 9v3"/>
            </svg>
          </span>
          <div>
            <h2 className="arch-pane-title">{arch.title}</h2>
            <span className="arch-pane-badge">{arch.framework} {arch.frameworkVersion}</span>
          </div>
        </div>
        <button className="arch-pane-close" onClick={onClose} aria-label="Close pane">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="arch-pane-tabs" role="tablist" aria-label="Architecture sections">
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
          Decisions
        </button>
      </div>

      {/* Body */}
      <div className="arch-pane-body" role="tabpanel">
        {activeTab === "overview" ? (
          <>
            <div className="arch-pane-section">
              <p className="arch-section-label">CSS Approach</p>
              <p className="arch-css-tag">{arch.cssApproach}</p>
            </div>

            <div className="arch-pane-section">
              <p className="arch-section-label">Folder Structure</p>
              <pre className="arch-tree" tabIndex={0}>{arch.tree}</pre>
            </div>

            <div className="arch-pane-section">
              <p className="arch-section-label">Dependencies</p>
              <div className="arch-deps">
                {arch.deps.map((d) => (
                  <div key={d.name} className="arch-dep-row">
                    <div className="arch-dep-left">
                      <span className="arch-dep-name">{d.name}</span>
                      <span className="arch-dep-version">{d.version}</span>
                    </div>
                    <span className="arch-dep-purpose">{d.purpose}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="arch-pane-section">
              <p className="arch-section-label">Key Patterns</p>
              <ul className="arch-patterns" role="list">
                {arch.patterns.map((p) => (
                  <li key={p} className="arch-pattern-item">
                    <span className="arch-pattern-dot" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            {/* Design Decisions */}
            <div className="arch-pane-section">
              <p className="arch-section-label">Design Decisions</p>
              <div className="arch-deps">
                {detail.decisions.map((d) => (
                  <div key={d.title} className="arch-dep-row arch-decision-row">
                    <span className="arch-dep-name arch-decision-title">{d.title}</span>
                    <span className="arch-dep-purpose arch-decision-rationale">{d.rationale}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trade-offs */}
            <div className="arch-pane-section">
              <p className="arch-section-label">Trade-offs</p>
              <ul className="arch-patterns" role="list">
                {detail.tradeoffs.map((t) => (
                  <li key={t} className="arch-pattern-item">
                    <span className="arch-pattern-dot arch-dot-warn" aria-hidden="true" />
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shell integration */}
            <div className="arch-pane-section">
              <p className="arch-section-label">Shell Integration</p>
              <ul className="arch-patterns" role="list">
                {detail.integration.map((i) => (
                  <li key={i} className="arch-pattern-item">
                    <span className="arch-pattern-dot" aria-hidden="true" />
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

import { useCallback } from "react";
import { useFocusTrap } from "../hooks/useFocusTrap";

interface Props {
  open: boolean;
  activePath: string;
  onClose: () => void;
}

interface CodeExample {
  label: string;
  code: string;
}

interface LearnData {
  framework: string;
  version: string;
  tagline: string;
  badge: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  concepts: { name: string; desc: string }[];
  codeExample: CodeExample;
  links: { label: string; url: string }[];
}

/* ─── Per-route learning content ─────────────────────────────────────────── */
const learnData: Record<string, LearnData> = {
  "/home": {
    framework: "React",
    version: "18.3",
    tagline: "A JavaScript library for building user interfaces",
    badge: "Meta / Open Source",
    pros: [
      "Massive ecosystem and community support",
      "Flexible — bring your own router, state, etc.",
      "Concurrent rendering with Suspense & transitions",
      "Excellent TypeScript support",
      "React Server Components for full-stack patterns",
    ],
    cons: [
      "Not a full framework — requires assembling a stack",
      "Frequent ecosystem churn (hooks, RSC, etc.)",
      "JSX can feel unfamiliar to HTML-first developers",
      "No built-in state management solution",
    ],
    bestFor: [
      "SPAs and micro-frontends at scale",
      "Teams that want full control over their stack",
      "Projects needing rich interactivity and real-time UI",
      "Large codebases benefiting from component reuse",
    ],
    concepts: [
      { name: "JSX", desc: "Syntax extension that lets you write HTML-like markup inside JS" },
      { name: "Hooks", desc: "useState, useEffect, useCallback — stateful logic in function components" },
      { name: "Virtual DOM", desc: "React diffs a lightweight tree before touching the real DOM" },
      { name: "Concurrent Mode", desc: "Interruptible rendering for smoother UX under heavy load" },
      { name: "Context API", desc: "Pass data through the component tree without prop drilling" },
    ],
    codeExample: {
      label: "Functional component with hooks",
      code: `import { useState, useEffect } from 'react';

function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}`,
    },
    links: [
      { label: "React Docs", url: "https://react.dev" },
      { label: "Hooks Reference", url: "https://react.dev/reference/react" },
      { label: "React 18 Release", url: "https://react.dev/blog/2022/03/29/react-v18" },
    ],
  },

  "/about": {
    framework: "Angular",
    version: "18",
    tagline: "The web development platform for building scalable apps",
    badge: "Google / Open Source",
    pros: [
      "Opinionated full framework — routing, forms, HTTP included",
      "Dependency injection makes large codebases testable",
      "Standalone components eliminate NgModule boilerplate",
      "Strong TypeScript-first design from day one",
      "Signals-based reactivity (Angular 17+) for fine-grained updates",
    ],
    cons: [
      "Steeper learning curve than React or Vue",
      "Verbose compared to lighter alternatives",
      "Bundle size can be larger without careful lazy loading",
      "Zone.js change detection adds complexity",
    ],
    bestFor: [
      "Large enterprise applications with many developers",
      "Teams that benefit from strong conventions",
      "Projects needing built-in form validation and HTTP",
      "Long-lived codebases where consistency matters most",
    ],
    concepts: [
      { name: "Components", desc: "Decorated classes with @Component — template, styles, selector" },
      { name: "Dependency Injection", desc: "Services injected via constructor — testable and modular" },
      { name: "Directives", desc: "*ngIf, *ngFor, and custom structural/attribute directives" },
      { name: "Signals", desc: "Fine-grained reactive primitives replacing Zone.js in Angular 17+" },
      { name: "Standalone", desc: "Components without NgModule — simpler bootstrapping" },
    ],
    codeExample: {
      label: "Standalone component (Angular 18)",
      code: `import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <button (click)="increment()">
      Clicked {{ count() }} times
    </button>
  \`,
})
export class CounterComponent {
  count = signal(0);
  increment() { this.count.update(n => n + 1); }
}`,
    },
    links: [
      { label: "Angular Docs", url: "https://angular.dev" },
      { label: "Standalone Components", url: "https://angular.dev/guide/components/importing" },
      { label: "Angular Signals", url: "https://angular.dev/guide/signals" },
    ],
  },

  "/experience": {
    framework: "Vue",
    version: "3.4",
    tagline: "The progressive framework for building web UIs",
    badge: "Evan You / Open Source",
    pros: [
      "Gentle learning curve — approachable for HTML/CSS developers",
      "Single File Components keep template, script, style co-located",
      "Composition API enables clean, reusable logic extraction",
      "Reactivity system is intuitive and explicit",
      "Excellent performance with fine-grained dependency tracking",
    ],
    cons: [
      "Smaller ecosystem than React",
      "Options API vs Composition API can confuse newcomers",
      "Less corporate backing than React or Angular",
      "Fewer enterprise-scale case studies",
    ],
    bestFor: [
      "Progressive enhancement of existing HTML pages",
      "Small-to-medium SPAs with a small team",
      "Developers coming from HTML/CSS backgrounds",
      "Projects where developer experience is the top priority",
    ],
    concepts: [
      { name: "SFC", desc: "Single File Component — <template>, <script setup>, <style> in one .vue file" },
      { name: "Composition API", desc: "ref(), reactive(), computed() — logic organised by feature, not lifecycle" },
      { name: "Reactivity", desc: "Proxy-based system tracks dependencies automatically at runtime" },
      { name: "Composables", desc: "Reusable stateful functions — Vue's equivalent of React hooks" },
      { name: "Directives", desc: "v-if, v-for, v-model — declarative DOM manipulation" },
    ],
    codeExample: {
      label: "Composition API with <script setup>",
      code: `<script setup lang="ts">
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);
const increment = () => count.value++;
</script>

<template>
  <button @click="increment">
    {{ count }} (doubled: {{ doubled }})
  </button>
</template>

<style scoped>
button { padding: 0.5rem 1rem; }
</style>`,
    },
    links: [
      { label: "Vue Docs", url: "https://vuejs.org/guide/introduction" },
      { label: "Composition API", url: "https://vuejs.org/guide/extras/composition-api-faq" },
      { label: "Vue 3 Migration", url: "https://v3-migration.vuejs.org" },
    ],
  },

  "/education": {
    framework: "Web Components",
    version: "Custom Elements v1",
    tagline: "Native browser APIs for reusable, encapsulated elements",
    badge: "W3C Standard",
    pros: [
      "Zero runtime dependency — pure browser APIs",
      "Shadow DOM provides true style encapsulation",
      "Works in any framework or no framework at all",
      "Long-term stability — backed by W3C standards",
      "Ideal for design system primitives shared across stacks",
    ],
    cons: [
      "Verbose API compared to framework components",
      "No built-in reactivity — manual DOM updates required",
      "SSR support is limited without extra tooling",
      "Attribute-only props (no rich object passing without JS)",
      "Debugging Shadow DOM can be harder in DevTools",
    ],
    bestFor: [
      "Framework-agnostic design system components",
      "Widgets embedded in third-party pages",
      "Long-lived components that must survive framework migrations",
      "Micro-frontends that need zero shared runtime",
    ],
    concepts: [
      { name: "Custom Elements", desc: "HTMLElement subclass registered via customElements.define()" },
      { name: "Shadow DOM", desc: "Encapsulated DOM subtree — styles don't leak in or out" },
      { name: "HTML Templates", desc: "<template> and <slot> for declarative, reusable markup" },
      { name: "Lifecycle", desc: "connectedCallback, disconnectedCallback, attributeChangedCallback" },
      { name: "CSS Custom Props", desc: "The only CSS that crosses the Shadow DOM boundary" },
    ],
    codeExample: {
      label: "Custom Element with Shadow DOM",
      code: `class MyCounter extends HTMLElement {
  #count = 0;

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = \`
      <style>
        button { padding: 0.5rem 1rem; }
      </style>
      <button part="btn">
        Clicked \${this.#count} times
      </button>
    \`;
    this.shadowRoot
      .querySelector('button')
      .addEventListener('click', () => {
        this.#count++;
        this.render();
      });
  }
}

customElements.define('my-counter', MyCounter);`,
    },
    links: [
      { label: "MDN Web Components", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components" },
      { label: "Custom Elements Spec", url: "https://html.spec.whatwg.org/multipage/custom-elements.html" },
      { label: "Shadow DOM Guide", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM" },
    ],
  },

  "/micro-apps": {
    framework: "Svelte",
    version: "4.1",
    tagline: "Cybernetically enhanced web apps — compiled, not interpreted",
    badge: "Rich Harris / Open Source",
    pros: [
      "Compiler-based — no virtual DOM, minimal runtime overhead",
      "Smallest bundle sizes of any major framework",
      "Reactivity is built into the language syntax",
      "Scoped styles compiled to unique class hashes automatically",
      "Gentle learning curve — feels like enhanced HTML",
    ],
    cons: [
      "Smaller ecosystem and fewer third-party components",
      "Less mature tooling for large enterprise codebases",
      "Runes (Svelte 5) introduce a paradigm shift mid-ecosystem",
      "Fewer job postings and community resources than React",
    ],
    bestFor: [
      "Performance-critical widgets and micro-frontends",
      "Small teams that want maximum output with minimal boilerplate",
      "Projects where bundle size is a hard constraint",
      "Developers who prefer a compiler-first mental model",
    ],
    concepts: [
      { name: "Reactivity", desc: "$: label makes any statement reactive — re-runs when dependencies change" },
      { name: "Stores", desc: "writable/readable/derived — subscribe with $ prefix in templates" },
      { name: "Scoped Styles", desc: "CSS in <style> is automatically scoped to the component" },
      { name: "Transitions", desc: "Built-in fade, fly, slide directives — no extra library needed" },
      { name: "Runes (v5)", desc: "$state, $derived, $effect — explicit reactivity replacing magic labels" },
    ],
    codeExample: {
      label: "Reactive component with store",
      code: `<script lang="ts">
  import { writable } from 'svelte/store';

  const count = writable(0);

  // Reactive statement — re-runs when count changes
  $: doubled = $count * 2;
</script>

<button on:click={() => $count++}>
  {$count} (doubled: {doubled})
</button>

<style>
  button { padding: 0.5rem 1rem; }
</style>`,
    },
    links: [
      { label: "Svelte Docs", url: "https://svelte.dev/docs" },
      { label: "Svelte Tutorial", url: "https://learn.svelte.dev" },
      { label: "Svelte 5 Runes", url: "https://svelte.dev/blog/runes" },
    ],
  },
};

/* ─── Component ──────────────────────────────────────────────────────────── */
export function LearningPane({ open, activePath, onClose }: Props) {
  const paneRef = useFocusTrap<HTMLElement>(open);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  const routeKey =
    Object.keys(learnData).find((k) => activePath.startsWith(k)) ?? "/home";
  const data = learnData[routeKey];

  return (
    <aside
      ref={paneRef}
      className="arch-pane-inner"
      aria-label="Learning pane"
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div className="arch-pane-header">
        <div className="arch-pane-title-row">
          <span className="arch-pane-icon arch-pane-icon-learn" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
              strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
              <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
              <path d="M5 8h4" /><path d="M9 16h4" />
              <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219z" />
              <path d="M14 9l4 -1" /><path d="M16 16l3.923 -.98" />
            </svg>
          </span>
          <div>
            <h2 className="arch-pane-title">Learning — {data.framework}</h2>
            <span className="arch-pane-badge arch-pane-badge-learn">{data.version}</span>
          </div>
        </div>
        <button className="arch-pane-close" onClick={onClose} aria-label="Close pane">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            width="16" height="16" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="arch-pane-body">

        {/* Tagline */}
        <div className="arch-pane-section">
          <p className="arch-section-label">About</p>
          <p className="learn-tagline">{data.tagline}</p>
          <span className="learn-badge-source">{data.badge}</span>
        </div>

        {/* Pros */}
        <div className="arch-pane-section">
          <p className="arch-section-label learn-label-pro">✓ Advantages</p>
          <ul className="arch-patterns" role="list">
            {data.pros.map((p) => (
              <li key={p} className="arch-pattern-item">
                <span className="arch-pattern-dot learn-dot-pro" aria-hidden="true" />
                <span className="learn-text">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="arch-pane-section">
          <p className="arch-section-label learn-label-con">✗ Trade-offs</p>
          <ul className="arch-patterns" role="list">
            {data.cons.map((c) => (
              <li key={c} className="arch-pattern-item">
                <span className="arch-pattern-dot learn-dot-con" aria-hidden="true" />
                <span className="learn-text">{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Best for */}
        <div className="arch-pane-section">
          <p className="arch-section-label">Best Used When</p>
          <ul className="arch-patterns" role="list">
            {data.bestFor.map((b) => (
              <li key={b} className="arch-pattern-item">
                <span className="arch-pattern-dot" aria-hidden="true" />
                <span className="learn-text">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Core concepts */}
        <div className="arch-pane-section">
          <p className="arch-section-label">Core Concepts</p>
          <div className="learn-concepts">
            {data.concepts.map((c) => (
              <div key={c.name} className="learn-concept-row">
                <span className="learn-concept-name">{c.name}</span>
                <span className="learn-concept-desc">{c.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Code example */}
        <div className="arch-pane-section">
          <p className="arch-section-label">Sample Code</p>
          <p className="learn-code-label">{data.codeExample.label}</p>
          <pre className="learn-code" tabIndex={0}><code>{data.codeExample.code}</code></pre>
        </div>

        {/* Official links */}
        <div className="arch-pane-section">
          <p className="arch-section-label">Official Guides</p>
          <div className="learn-links">
            {data.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="learn-link"
                aria-label={`${l.label} (opens in new tab)`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  width="12" height="12" aria-hidden="true" className="learn-link-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </aside>
  );
}

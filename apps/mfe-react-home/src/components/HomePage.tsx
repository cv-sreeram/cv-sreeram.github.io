import { HeroSection } from "./HeroSection";
import { StatsStrip } from "./StatsStrip";
import { useHomeEvents } from "../hooks/useHomeEvents";
import { STATS } from "../utils/constants";

const IMPACT_HIGHLIGHTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="18" height="18" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    stat: "10M+",
    label: "daily hits, zero escalations",
    desc: "Led the core module of the product serving over 5 million hits per day with zero escalations over the last 5 years.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="18" height="18" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    stat: "40+",
    label: "engineers upskilled in AI",
    desc: "Conducted multiple sessions on AI adoption, integrating AI-assisted development practices into daily engineering workflows.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="18" height="18" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    stat: "30%",
    label: "developer velocity gain",
    desc: "Boosted productivity through an MCP-based design-to-code workflow and Storybook integration with Brotli compression (↓25% download size).",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="18" height="18" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    stat: "WCAG 2.2",
    label: "AA compliance",
    desc: "Built and maintained fully accessible applications with regular audits, APDEX analyses (maintained above 0.93), and security reviews.",
  },
];

const PORTAL_FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="20" height="20" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: "5 Frameworks, One Shell",
    desc: "React, Angular, Vue, Svelte & Web Components — each MFE independently deployed via Single-SPA + Module Federation.",
    badge: "Architecture",
    badgeColor: "teal",
    route: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="20" height="20" aria-hidden="true">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    ),
    title: "Dark / Light Theme",
    desc: "System-aware theme switching with CSS custom properties. Tokens cascade across all MFEs — no framework coupling.",
    badge: "Design System",
    badgeColor: "amber",
    route: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="20" height="20" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: "Accessibility First",
    desc: "WCAG 2.2 AA across every MFE. Keyboard nav, ARIA landmarks, focus management, and a live a11y audit pane built in.",
    badge: "WCAG 2.2 AA",
    badgeColor: "green",
    route: "/accessibility",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="20" height="20" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "Architecture Deep-Dives",
    desc: "Each MFE ships with an interactive architecture pane — routing strategy, build config, and cross-app communication explained.",
    badge: "Docs",
    badgeColor: "blue",
    route: "/about",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="20" height="20" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: "Learning Resources",
    desc: "Curated guides on MFE patterns, module federation, single-spa lifecycle, and framework-specific gotchas — per MFE.",
    badge: "Education",
    badgeColor: "purple",
    route: "/education",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="20" height="20" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Responsive Design",
    desc: "Mobile-first layouts across all MFEs. Fluid grids, adaptive navigation, and touch-friendly interactions at every breakpoint.",
    badge: "UI/UX",
    badgeColor: "rose",
    route: null,
  },
];

const UPCOMING_FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="16" height="16" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Real User Monitoring",
    desc: "Live RUM data — LCP, FID, CLS per MFE with drill-down by framework.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="16" height="16" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: "More Micro Apps",
    desc: "Expanding the micro-apps playground with React Native Web, Qwik, and Lit.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        width="16" height="16" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Active Visitor Counter",
    desc: "Real-time visitor presence powered by WebSockets — see who's exploring the portal live.",
  },
];

const BADGE_COLORS: Record<string, string> = {
  teal:   "var(--primary)",
  amber:  "var(--warning-text)",
  green:  "var(--success-text)",
  blue:   "var(--info-text)",
  purple: "var(--purple-text)",
  rose:   "var(--rose-text)",
};

export function HomePage() {
  useHomeEvents();

  return (
    <div className="home-root">
      {/* Intentional over-engineering callout */}
      <div className="home-overengineered-banner" role="note" aria-label="Site disclaimer">
        <span className="home-overengineered-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </span>
        <span className="home-overengineered-text">
          <strong>Yes, this is deliberately over-engineered.</strong>{" "}
          A portfolio page built with 5 frameworks, micro-frontends, module federation, and a monorepo —
          because sometimes the best way to showcase tech complexity is to just… build it.
        </span>
      </div>

      <HeroSection />
      <StatsStrip stats={STATS} />

      {/* Impact highlights */}
      <section aria-labelledby="highlights-heading" className="home-highlights">
        <h2 className="home-section-heading" id="highlights-heading">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
            width="18" height="18" aria-hidden="true" className="home-section-icon">
            <path d="M3 17h5l2-7 4 11 3-7h4"/>
          </svg>
          Impact Highlights
        </h2>
        <ul className="home-highlights-grid" role="list">
          {IMPACT_HIGHLIGHTS.map((h) => (
            <li key={h.label} className="home-highlight-card">
              <div className="home-highlight-icon" aria-hidden="true">{h.icon}</div>
              <div className="home-highlight-body">
                <div className="home-highlight-stat-row">
                  <span className="home-highlight-stat">{h.stat}</span>
                  <span className="home-highlight-label">{h.label}</span>
                </div>
                <p className="home-highlight-desc">{h.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Portal feature highlights */}
      <section aria-labelledby="portal-heading" className="home-portal-section">
        <h2 className="home-section-heading" id="portal-heading">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
            width="18" height="18" aria-hidden="true" className="home-section-icon">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
          </svg>
          This Portal
        </h2>
        <ul className="home-portal-grid" role="list">
          {PORTAL_FEATURES.map((f) => (
            <li key={f.title}>
              <div className="home-portal-card">
                <PortalCardInner feature={f} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Upcoming features */}
      <section aria-labelledby="upcoming-heading" className="home-upcoming-section">
        <h2 className="home-section-heading" id="upcoming-heading">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
            width="18" height="18" aria-hidden="true" className="home-section-icon">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          Coming Soon
        </h2>
        <ul className="home-upcoming-list" role="list">
          {UPCOMING_FEATURES.map((u) => (
            <li key={u.title} className="home-upcoming-item">
              <span className="home-upcoming-icon" aria-hidden="true">{u.icon}</span>
              <div className="home-upcoming-body">
                <span className="home-upcoming-title">{u.title}</span>
                <span className="home-upcoming-desc">{u.desc}</span>
              </div>
              <span className="home-upcoming-pill" aria-label="Upcoming feature">Soon</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function PortalCardInner({ feature }: { feature: typeof PORTAL_FEATURES[number] }) {
  return (
    <>
      <div className="home-portal-card-top">
        <span
          className="home-portal-icon"
          style={{ color: BADGE_COLORS[feature.badgeColor] }}
          aria-hidden="true"
        >
          {feature.icon}
        </span>
        <span
          className="home-portal-badge"
          data-color={feature.badgeColor}
          style={{ color: BADGE_COLORS[feature.badgeColor] }}
        >
          {feature.badge}
        </span>
      </div>
      <p className="home-portal-title">{feature.title}</p>
      <p className="home-portal-desc">{feature.desc}</p>

    </>
  );
}

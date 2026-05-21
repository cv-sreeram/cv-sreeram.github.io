<script setup lang="ts">
import { useExperienceEvents } from "../composables/useExperienceEvents";

useExperienceEvents();
</script>

<template>
  <main class="profile-page" id="main-content">
    <article class="hero-card" aria-labelledby="exp-heading">
      <div class="card-body-tight">
        <p class="about-eyebrow">Enterprise Delivery · 12+ Years · 3 Companies</p>
        <h1 class="about-heading" id="exp-heading">Experience</h1>
        <p class="about-lead">A track record of shipping high-impact frontend systems across enterprise SaaS, fintech, and security tooling.</p>
        <ul class="meta-row" role="list" aria-label="Companies worked at">
          <li class="pill">Freshworks</li>
          <li class="pill">Payoda</li>
          <li class="pill">TCS</li>
          <li class="pill">12+ Years</li>
        </ul>
      </div>
    </article>

    <article class="section-card" aria-labelledby="co-freshworks">
      <div class="card-body-tight">
        <div class="exp-company-header">
          <div class="exp-company-logo" aria-hidden="true">F</div>
          <div class="exp-company-info">
            <h2 class="exp-company-name" id="co-freshworks">Freshworks</h2>
            <p class="exp-role">Staff Software Engineer – Frontend</p>
          </div>
          <time class="exp-date-badge" datetime="2018-11">Nov 2018 – Present</time>
        </div>
        <p class="exp-product">Freshservice: Intelligent, right-sized service management for the modern enterprise.</p>
        <ul class="impact-list" aria-label="Key achievements at Freshworks">
          <li>Led migration from legacy Rails application to React Micro Frontend built with Vite, TypeScript, Tailwind CSS, NX, and Module Federation — reducing p95 load times by 45% and improving developer velocity by 30%.</li>
          <li>Implemented Storybook integration and Brotli compression, reducing browser download size by 25%.</li>
          <li>Boosted developer productivity by 30% through an MCP-based design-to-code workflow.</li>
          <li>Conducted organisation-wide sessions on AI adoption, enabling 100+ engineers to integrate AI-assisted development practices.</li>
          <li>Built and maintained WCAG 2.2 AA-compliant applications with regular accessibility reviews and audits.</li>
          <li>Performed regular APDEX analyses (maintained above 0.95) and security audits.</li>
        </ul>
      </div>
    </article>

    <article class="section-card" aria-labelledby="co-payoda">
      <div class="card-body-tight">
        <div class="exp-company-header">
          <div class="exp-company-logo" aria-hidden="true">P</div>
          <div class="exp-company-info">
            <h2 class="exp-company-name" id="co-payoda">Payoda</h2>
            <p class="exp-role">Software Engineer</p>
          </div>
          <time class="exp-date-badge" datetime="2016-09">Sep 2016 – Nov 2018</time>
        </div>
        <p class="exp-product">AppViewX: Lifecycle management for certificates, F5 ADC, load balancers and WAF to avoid network outages due to unplanned certificate expiration.</p>
        <ul class="impact-list" aria-label="Key achievements at Payoda">
          <li>Reduced open security concerns by 30% by implementing advanced cybersecurity measures as a Security POC.</li>
          <li>Developed configurable component that renders chart of your choice from given data (a mini Highchart).</li>
        </ul>
      </div>
    </article>

    <article class="section-card" aria-labelledby="co-tcs">
      <div class="card-body-tight">
        <div class="exp-company-header">
          <div class="exp-company-logo" aria-hidden="true">T</div>
          <div class="exp-company-info">
            <h2 class="exp-company-name" id="co-tcs">TCS</h2>
            <p class="exp-role">Assistant System Engineer</p>
          </div>
          <time class="exp-date-badge" datetime="2014-09">Sep 2014 – Sep 2016</time>
        </div>
        <p class="exp-product">Lloyds Transaction Banking Web Portal: Commercial banking website for Lloyds Bank.</p>
        <ul class="impact-list" aria-label="Key achievements at TCS">
          <li>Received TCS award of recognition for 'Outstanding Contribution' from the digital CIO of Lloyds Banking Group.</li>
          <li>Delivered reliable transaction banking UI capabilities with enterprise-grade quality.</li>
        </ul>
      </div>
    </article>
  </main>
</template>

<style scoped>
/* Vue Experience MFE — scoped styles consuming shell CSS custom properties */

.profile-page {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-bottom: 2rem;
}

@media (max-width: 639px) {
  .profile-page {
    padding-bottom: 5.5rem;
  }
}

.hero-card {
  border: 1px solid var(--primary);
  border-radius: var(--radius, 0.75rem);
  background: var(--surface);
  padding: 1.5rem;
}

.section-card {
  border: 1px solid var(--border);
  border-radius: var(--radius, 0.75rem);
  background: var(--surface);
  padding: 1.5rem;
  transition: border-color 0.15s ease;
}

.section-card:hover {
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
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin: 0;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pill {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid var(--border);
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  background: var(--surface-strong);
}

/* Company header — stacks cleanly on mobile */
.exp-company-header {
  display: grid;
  grid-template-columns: 2.5rem 1fr auto;
  align-items: start;
  gap: 0.75rem;
}

@media (max-width: 639px) {
  .exp-company-header {
    grid-template-columns: 2.5rem 1fr;
    grid-template-rows: auto auto;
  }

  .exp-date-badge {
    grid-column: 2;
    margin-left: 0;
    justify-self: start;
  }
}

.exp-company-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-sm, 0.5rem);
  background: var(--primary);
  color: var(--primary-foreground);
  font-weight: 800;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.exp-company-info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}

.exp-company-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.exp-role {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin: 0;
}

.exp-date-badge {
  font-size: 0.72rem;
  color: var(--text-muted-strong, #94a3b8);
  background: var(--surface-strong);
  border: 1px solid var(--border);
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  white-space: nowrap;
  align-self: start;
}

.exp-product {
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

.impact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.impact-list li {
  position: relative;
  padding-left: 1.1rem;
  line-height: 1.6;
  color: var(--text);
  font-size: 0.875rem;
}

.impact-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--primary);
  flex-shrink: 0;
}
</style>

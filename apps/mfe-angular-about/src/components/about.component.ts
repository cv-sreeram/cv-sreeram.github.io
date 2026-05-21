import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import styles from "./about.component.scss?inline";

@Component({
  selector: "mfe-angular-about-root",
  standalone: true,
  imports: [CommonModule],
  styles: [styles],
  template: `
    <main class="profile-page" id="main-content">
      <article class="hero-card" aria-labelledby="about-heading">
        <div class="card-body-tight">
          <p class="about-eyebrow">Staff Frontend Engineer · Freshworks · Chennai</p>
          <h1 class="about-heading" id="about-heading">About Me</h1>
          <p class="about-lead">Results-driven AI-augmented Staff Frontend Engineer with 12 years of experience leading the design and delivery of high-traffic, high-availability web applications at scale.</p>
          <ul class="meta-row" role="list" aria-label="Key attributes">
            <li class="pill">Chennai, Tamil Nadu</li>
            <li class="pill">Staff Frontend Engineer</li>
            <li class="pill">Freshworks</li>
            <li class="pill">WCAG 2.2 AA</li>
          </ul>
        </div>
      </article>

      <article class="section-card" aria-labelledby="timeline-heading">
        <div class="card-body-tight">
          <h2 class="section-title" id="timeline-heading">
            <svg viewBox="0 0 24 24" class="section-icon" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Career Timeline
          </h2>
          <ol class="about-timeline" aria-label="Career timeline">
            <li class="about-timeline-item">
              <div class="about-timeline-dot" aria-hidden="true"></div>
              <div class="about-timeline-body">
                <div class="about-timeline-header">
                  <span class="about-timeline-company">Freshworks</span>
                  <time class="about-timeline-date" datetime="2018-11">Nov 2018 – Present</time>
                </div>
                <p class="about-timeline-role">Staff Software Engineer – Frontend</p>
                <p class="about-timeline-desc">Leading end-to-end frontend engineering for Freshservice — an intelligent, right-sized service management platform for the modern enterprise. Driving architecture, delivery, and technical direction across a team of 16+ frontend engineers.</p>
              </div>
            </li>
            <li class="about-timeline-item">
              <div class="about-timeline-dot" aria-hidden="true"></div>
              <div class="about-timeline-body">
                <div class="about-timeline-header">
                  <span class="about-timeline-company">Payoda</span>
                  <time class="about-timeline-date" datetime="2016-09">Sep 2016 – Nov 2018</time>
                </div>
                <p class="about-timeline-role">Software Engineer</p>
                <p class="about-timeline-desc">Built certificate lifecycle management experiences for AppViewX — a lifecycle management solution for certificates, F5 ADC, load balancers and WAF.</p>
              </div>
            </li>
            <li class="about-timeline-item">
              <div class="about-timeline-dot" aria-hidden="true"></div>
              <div class="about-timeline-body">
                <div class="about-timeline-header">
                  <span class="about-timeline-company">TCS</span>
                  <time class="about-timeline-date" datetime="2014-09">Sep 2014 – Sep 2016</time>
                </div>
                <p class="about-timeline-role">Assistant System Engineer</p>
                <p class="about-timeline-desc">Contributed to Lloyds transaction banking portal — a commercial banking website for Lloyds Bank. Received TCS award of recognition for 'Outstanding Contribution' from the digital CIO of Lloyds Banking Group.</p>
              </div>
            </li>
          </ol>
        </div>
      </article>

      <article class="section-card" aria-labelledby="highlights-heading">
        <div class="card-body-tight">
          <h2 class="section-title" id="highlights-heading">
            <svg viewBox="0 0 24 24" class="section-icon" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true" focusable="false">
              <path d="M3 17h5l2-7 4 11 3-7h4"/>
            </svg>
            Experience Highlights
          </h2>
          <ul class="impact-list" aria-label="Key achievements">
            <li>Led migration from legacy Rails application to React Micro Frontend built with Vite, TypeScript, Tailwind CSS, NX, and Module Federation — reducing p95 load times by 45% and improving developer velocity by 30%.</li>
            <li>Implemented Storybook integration and Brotli compression, reducing browser download size by 25% and enhancing performance and developer productivity.</li>
            <li>Boosted developer productivity by 30% through an MCP-based design-to-code workflow.</li>
            <li>Conducted organisation-wide sessions on AI adoption, enabling 100+ engineers to integrate AI-assisted development practices into daily workflows.</li>
            <li>Built and maintained WCAG 2.2 AA-compliant applications with regular accessibility reviews and audits.</li>
            <li>Performed regular APDEX analyses (maintained above 0.95) and security audits to ensure product reliability and safety.</li>
          </ul>
        </div>
      </article>

      <article class="section-card" aria-labelledby="contact-heading">
        <div class="card-body-tight">
          <h2 class="section-title" id="contact-heading">
            <svg viewBox="0 0 24 24" class="section-icon" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true" focusable="false">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            Get in Touch
          </h2>
          <nav class="about-contact-grid" aria-label="Contact links">
            <a href="mailto:sreeramcvjobsearch&#64;gmail.com" class="about-contact-link" aria-label="Send email to sreeramcvjobsearch at gmail.com">
              <svg viewBox="0 0 24 24" class="about-contact-icon" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true" focusable="false">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              sreeramcvjobsearch&#64;gmail.com
            </a>
            <a href="https://www.linkedin.com/in/sreeram-c-v" target="_blank" rel="noreferrer" class="about-contact-link" aria-label="LinkedIn profile (opens in new tab)">
              <svg viewBox="0 0 24 24" class="about-contact-icon" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
              linkedin.com/in/sreeram-c-v
            </a>
          </nav>
        </div>
      </article>
    </main>
  `
})
export class AboutComponent {
  communityItems: string[] = [];
}

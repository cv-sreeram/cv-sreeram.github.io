import React from "react";
import { navigateToUrl } from "single-spa";
import { PROFILE_IMAGE_PATH, SKILLS } from "../utils/constants";

export function HeroSection() {
  return (
    <section className="hero-section" aria-label="Hero introduction">
      <div className="hero-copy">
        <p className="hero-eyebrow">Staff Frontend Engineer · Freshworks · Chennai, Tamil Nadu</p>
        <h1 className="hero-heading">Sreeram CV</h1>
        <p className="hero-subheading">AI-Augmented Frontend Engineering</p>
        <p className="hero-description">
          12+ years building enterprise-grade web systems at scale. Leading micro-frontend
          architecture, driving AI adoption in SDLC, and mentoring teams to deliver
          high-performance, accessible platforms — currently at Freshworks.
        </p>
        <nav className="hero-actions" aria-label="Quick navigation">
          <button
            type="button"
            className="hero-button hero-primary"
            onClick={() => navigateToUrl("/about")}
          >
            <svg viewBox="0 0 24 24" className="hero-btn-icon" fill="none" stroke="currentColor"
              strokeWidth="2" aria-hidden="true" focusable="false">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            About Me
          </button>
          <button
            type="button"
            className="hero-button hero-secondary"
            onClick={() => navigateToUrl("/experience")}
          >
            <svg viewBox="0 0 24 24" className="hero-btn-icon" fill="none" stroke="currentColor"
              strokeWidth="2" aria-hidden="true" focusable="false">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
            Experience
          </button>
          <a
            href="https://www.linkedin.com/in/sreeram-c-v"
            target="_blank"
            rel="noreferrer"
            className="hero-button hero-ghost"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            <svg viewBox="0 0 24 24" className="hero-btn-icon" fill="currentColor"
              aria-hidden="true" focusable="false">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            LinkedIn
          </a>
        </nav>
        <ul className="hero-skills" role="list" aria-label="Core skills">
          {SKILLS.map((skill) => (
            <li key={skill} className="hero-pill">{skill}</li>
          ))}
        </ul>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="hero-visual-card">
          <div className="hero-image-frame">
            <img
              src={PROFILE_IMAGE_PATH}
              alt="Sreeram CV — Staff Frontend Engineer"
              className="hero-image"
              width="280"
              height="280"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

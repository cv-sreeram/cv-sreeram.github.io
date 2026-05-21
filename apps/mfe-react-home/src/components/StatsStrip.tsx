import React from "react";
import type { Stat } from "../types/home.types";

interface Props {
  stats: Stat[];
}

export function StatsStrip({ stats }: Props) {
  return (
    <section className="hero-stats-strip" aria-label="Career statistics">
      {stats.map((s) => (
        <div key={s.label} className="hero-stat">
          <span className="hero-stat-value" aria-hidden="true">{s.value}</span>
          <span className="hero-stat-label">{s.label}</span>
        </div>
      ))}
    </section>
  );
}

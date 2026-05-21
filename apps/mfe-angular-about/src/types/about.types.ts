export interface TimelineItem {
  company: string;
  role: string;
  period: string;
  description: string;
  location?: string;
}

export interface ContactLink {
  label: string;
  href: string;
  ariaLabel: string;
}

export interface SkillTag {
  label: string;
  category: "frontend" | "architecture" | "tooling" | "soft";
}

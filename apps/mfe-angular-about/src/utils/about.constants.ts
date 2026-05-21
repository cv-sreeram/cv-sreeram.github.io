import type { TimelineItem, ContactLink, SkillTag } from "../types/about.types";

export const TIMELINE: TimelineItem[] = [
  {
    company: "Freshworks",
    role: "Staff Frontend Engineer",
    period: "2021 – Present",
    description: "Leading frontend architecture for Freshservice ITSM platform. Driving AI-augmented engineering practices, design systems, and MFE adoption.",
    location: "Chennai",
  },
  {
    company: "Mphasis",
    role: "Senior Frontend Engineer",
    period: "2018 – 2021",
    description: "Built Lloyds Banking Group transaction portal. Delivered enterprise-grade React components serving millions of users.",
    location: "Chennai",
  },
  {
    company: "Infosys",
    role: "Frontend Engineer",
    period: "2014 – 2018",
    description: "Full-stack web development across banking and insurance clients. Established frontend best practices.",
    location: "Bangalore",
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sreeram-c-v",
    ariaLabel: "LinkedIn profile (opens in new tab)",
  },
  {
    label: "GitHub",
    href: "https://github.com/sreeramcv",
    ariaLabel: "GitHub profile (opens in new tab)",
  },
];

export const SKILLS: SkillTag[] = [
  { label: "React", category: "frontend" },
  { label: "Angular", category: "frontend" },
  { label: "Vue", category: "frontend" },
  { label: "TypeScript", category: "tooling" },
  { label: "Micro-Frontends", category: "architecture" },
  { label: "Design Systems", category: "architecture" },
  { label: "AI-Augmented Dev", category: "tooling" },
  { label: "Engineering Leadership", category: "soft" },
];

import type { EducationItem } from "../types/education.types";

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    institution: "NSS College of Engineering",
    degree: "B.Tech · Electrical Engineering",
    period: "Jan 2010 – Feb 2014",
    dateTime: "2010-01",
    description:
      "Palakkad — Comprehensive foundation in engineering fundamentals, mathematics, and early web development. Developed problem-solving skills applied to full-stack and frontend systems.",
    skills: [
      { label: "Engineering", primary: true },
      { label: "Mathematics", primary: true },
      { label: "Web Development" },
      { label: "Algorithms" },
    ],
  },
  {
    institution: "Palghat Lions School",
    degree: "PLUS TWO · Science Stream",
    period: "Apr 2009 – Jan 2010",
    dateTime: "2009-04",
    description:
      "Palakkad — Strong foundation in mathematics, physics, and chemistry. Cultivated analytical thinking and a passion for technology.",
    skills: [
      { label: "Mathematics", primary: true },
      { label: "Physics", primary: true },
      { label: "Chemistry" },
    ],
  },
];

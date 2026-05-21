import type { MicroSlot } from "../types/micro-apps.types";

export const MICRO_SLOTS: MicroSlot[] = [
  {
    name: "React Home",
    status: "ready",
    description: "Hero landing page built with React 18, Tailwind CSS, and lucide-react icons.",
    tags: ["React 18", "Tailwind", "Single-SPA"],
  },
  {
    name: "Angular About",
    status: "ready",
    description: "Professional profile and career timeline built with Angular 18 standalone components.",
    tags: ["Angular 18", "SCSS", "Zone.js"],
  },
  {
    name: "Vue Experience",
    status: "ready",
    description: "Work history page using Vue 3 Composition API with scoped SFC styles.",
    tags: ["Vue 3", "Composition API", "SFC"],
  },
  {
    name: "Web Components Education",
    status: "ready",
    description: "Education section as a native Custom Element with Shadow DOM encapsulation.",
    tags: ["Custom Elements v1", "Shadow DOM", "No framework"],
  },
  {
    name: "Svelte Micro Apps",
    status: "ready",
    description: "This very page — an overview of the micro-frontend portfolio.",
    tags: ["Svelte 4", "Scoped styles", "Stores"],
  },
];

import { writable, derived } from "svelte/store";
import type { MicroSlot } from "../types/micro-apps.types";
import { MICRO_SLOTS } from "../utils/micro-apps.constants";

export const microSlots = writable<MicroSlot[]>(MICRO_SLOTS);

export const readySlots = derived(microSlots, ($slots) =>
  $slots.filter((s) => s.status === "ready")
);

export const upcomingSlots = derived(microSlots, ($slots) =>
  $slots.filter((s) => s.status !== "ready")
);

export type SlotStatus = "ready" | "soon" | "planned";

export interface MicroSlot {
  name: string;
  status: SlotStatus;
  description: string;
  tags: string[];
}

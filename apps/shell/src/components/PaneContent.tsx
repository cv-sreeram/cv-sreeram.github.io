import { AccessibilityPane } from "./AccessibilityPane";
import { ArchPane } from "./ArchPane";
import { LearningPane } from "./LearningPane";

export type PaneType = "architecture" | "accessibility" | "learning";

interface Props {
  type: PaneType;
  activePath: string;
  onClose: () => void;
}

export function PaneContent({ type, activePath, onClose }: Props) {
  switch (type) {
    case "architecture":
      return <ArchPane open={true} activePath={activePath} onClose={onClose} />;
    case "learning":
      return <LearningPane open={true} activePath={activePath} onClose={onClose} />;
    case "accessibility":
      return <AccessibilityPane open={true} activePath={activePath} onClose={onClose} />;
    default:
      return null;
  }
}

import { FrameworkBadge } from "@my-portal/ui";

interface FrameworkIndicatorProps {
  activeFramework: string;
}

export function FrameworkIndicator({ activeFramework }: FrameworkIndicatorProps) {
  return (
    <div
      className="flex items-center gap-2"
      aria-live="polite"
      aria-label={`Active framework: ${activeFramework}`}
    >
      <span className="hidden md:flex items-center gap-1.5 text-xs font-medium text-muted opacity-50 tracking-wide whitespace-nowrap select-none">
        Framework used
        <span className="opacity-60" aria-hidden="true">·</span>
      </span>
      <FrameworkBadge name={activeFramework} showText />
    </div>
  );
}

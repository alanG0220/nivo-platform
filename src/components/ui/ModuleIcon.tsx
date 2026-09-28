import {
  Users,
  CheckSquare,
  BookOpen,
  Boxes,
  Calculator,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import type { AccentColor } from "@/types/domain";

const ICONS: Record<string, LucideIcon> = {
  Users,
  CheckSquare,
  BookOpen,
  Boxes,
  Calculator,
};

const colorClasses: Record<AccentColor, string> = {
  primary:
    "bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300",
  accent:
    "bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300",
  amber: "bg-warn-soft text-warn-600 dark:bg-warn-500/15 dark:text-warn-500",
  purple:
    "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300",
  rose: "bg-danger-soft text-danger-600 dark:bg-danger-500/15 dark:text-danger-500",
};

interface ModuleIconProps {
  icon: string;
  color: AccentColor;
  size?: number;
  boxSize?: number;
  className?: string;
}

export function ModuleIcon({
  icon,
  color,
  size = 22,
  boxSize = 44,
  className,
}: ModuleIconProps) {
  const Icon = ICONS[icon] ?? Boxes;
  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-md",
        colorClasses[color],
        className,
      )}
      style={{ width: boxSize, height: boxSize }}
    >
      <Icon size={size} strokeWidth={2} />
    </span>
  );
}

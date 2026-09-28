import clsx from "clsx";
import type { ReactNode } from "react";

export type BadgeTone =
  "ok" | "warn" | "danger" | "info" | "neutral" | "primary";

const tones: Record<BadgeTone, string> = {
  ok: "bg-accent-50 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300",
  warn: "bg-warn-soft text-warn-600 dark:bg-warn-500/15 dark:text-warn-500",
  danger:
    "bg-danger-soft text-danger-600 dark:bg-danger-500/15 dark:text-danger-500",
  info: "bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300",
  neutral: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
  primary: "bg-primary-500 text-white",
};

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  dot?: boolean;
  className?: string;
}

export function Badge({
  tone = "neutral",
  children,
  dot,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span
          className={clsx(
            "h-1.5 w-1.5 rounded-full",
            tone === "ok" && "bg-accent-500",
            tone === "warn" && "bg-warn-500",
            tone === "danger" && "bg-danger-500",
            tone === "info" && "bg-primary-500",
            tone === "neutral" && "bg-slate-400",
            tone === "primary" && "bg-white",
          )}
        />
      )}
      {children}
    </span>
  );
}

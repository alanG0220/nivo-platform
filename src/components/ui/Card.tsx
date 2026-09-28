import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** resalta el borde (por ejemplo, plan destacado) */
  highlight?: boolean;
  /** reduce el padding interno */
  compact?: boolean;
}

export function Card({
  children,
  highlight,
  compact,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-lg border bg-white shadow-card dark:bg-night-800",
        highlight
          ? "border-primary-400 ring-1 ring-primary-200 dark:border-primary-500 dark:ring-primary-500/30"
          : "border-slate-200 dark:border-night-border",
        compact ? "p-4" : "p-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

import clsx from "clsx";
import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

// ── Encabezado de sección (web pública) ──────────────────
interface SectionHeadProps {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHead({
  tag,
  title,
  subtitle,
  center = true,
}: SectionHeadProps) {
  return (
    <div className={clsx("mb-10 max-w-2xl", center && "mx-auto text-center")}>
      {tag && <span className="section-tag mb-3">{tag}</span>}
      <h2 className="font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-ink-soft dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Interruptor visual (toggle) ──────────────────────────
interface SwitchProps {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  "aria-label"?: string;
}

export function Switch({ checked, onChange, disabled, ...rest }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={clsx(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
        checked ? "bg-accent-500" : "bg-slate-300 dark:bg-night-600",
        disabled && "cursor-not-allowed opacity-50",
      )}
      {...rest}
    >
      <span
        className="inline-block transform rounded-full bg-white shadow transition-transform"
        style={{
          height: 18,
          width: 18,
          transform: `translateX(${checked ? 22 : 4}px)`,
        }}
      />
    </button>
  );
}

// ── Estado vacío ─────────────────────────────────────────
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 px-6 py-12 text-center dark:border-night-border">
      <div className="mb-3 text-ink-faint">{icon ?? <Inbox size={32} />}</div>
      <h4 className="font-heading font-bold text-ink dark:text-white">
        {title}
      </h4>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-ink-soft dark:text-slate-400">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ── Tabla simple estilizada ──────────────────────────────
export function DataTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-night-border">
      <table className="w-full border-collapse text-left text-sm">
        {children}
      </table>
    </div>
  );
}

export function Th({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th
      className={clsx(
        "border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-soft dark:border-night-border dark:bg-night-900 dark:text-slate-400",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td
      className={clsx(
        "border-b border-slate-100 px-4 py-3 align-middle text-ink dark:border-night-border/60 dark:text-slate-200",
        className,
      )}
    >
      {children}
    </td>
  );
}

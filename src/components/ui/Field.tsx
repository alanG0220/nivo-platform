import clsx from "clsx";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react";

const inputBase =
  "h-11 w-full rounded-md border border-slate-300 bg-white px-3.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:border-night-border dark:bg-night-900 dark:text-slate-100 dark:focus:ring-primary-500/20";

interface FieldWrapProps {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  children: ReactNode;
}

export function Field({
  label,
  required,
  optional,
  hint,
  children,
}: FieldWrapProps) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-sm font-medium text-ink dark:text-slate-200">
        {label}
        {required && <span className="text-danger-500">*</span>}
        {optional && (
          <span className="text-xs font-normal text-ink-faint">(opcional)</span>
        )}
      </span>
      {children}
      {hint && (
        <span className="mt-1 block text-xs text-ink-faint">{hint}</span>
      )}
    </label>
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={clsx(inputBase, className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={clsx(inputBase, "appearance-none pr-9", className)}
      {...props}
    >
      {children}
    </select>
  );
}

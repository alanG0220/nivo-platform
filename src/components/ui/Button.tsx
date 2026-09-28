import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "danger" | "navy";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm",
  secondary:
    "bg-white text-ink border border-slate-200 hover:bg-slate-50 dark:bg-night-800 dark:text-slate-100 dark:border-night-border dark:hover:bg-night-700",
  ghost:
    "bg-transparent text-ink-soft hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white",
  danger: "bg-danger-500 text-white hover:bg-danger-600 shadow-sm",
  navy: "bg-primary-800 text-white hover:bg-primary-900 shadow-sm",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", block, className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        block && "w-full",
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";

interface LinkButtonProps extends CommonProps {
  to: string;
  children: ReactNode;
  onClick?: () => void;
}

/** Botón con apariencia idéntica pero que navega (react-router Link). */
export function LinkButton({
  to,
  variant = "primary",
  size = "md",
  block,
  className,
  children,
  onClick,
}: LinkButtonProps) {
  const external =
    to.startsWith("http") || to.startsWith("tel:") || to.startsWith("mailto:");
  const classes = clsx(
    base,
    variants[variant],
    sizes[size],
    block && "w-full",
    className,
  );
  if (external) {
    return (
      <a
        href={to}
        className={classes}
        onClick={onClick}
        target={to.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}

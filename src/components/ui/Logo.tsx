import { Link } from "react-router-dom";
import clsx from "clsx";
import { brand } from "@/config/brand";

interface LogoProps {
  /** a dónde navega al hacer clic (por defecto, inicio público) */
  to?: string;
  /** texto claro para fondos oscuros */
  light?: boolean;
  showTagline?: boolean;
  size?: "sm" | "md";
  className?: string;
}

/** Isotipo de Nivo: tres barras ascendentes (crecimiento / módulos que suman). */
export function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-md bg-primary-500 text-white"
      style={{ width: size + 10, height: size + 10 }}
      aria-hidden
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="13" width="3.4" height="7" rx="1.1" fill="#12b5a5" />
        <rect
          x="10.3"
          y="9"
          width="3.4"
          height="11"
          rx="1.1"
          fill="currentColor"
        />
        <rect x="16.6" y="4" width="3.4" height="16" rx="1.1" fill="#12b5a5" />
      </svg>
    </span>
  );
}

export function Logo({
  to = "/",
  light = false,
  showTagline = false,
  size = "md",
  className,
}: LogoProps) {
  return (
    <Link
      to={to}
      className={clsx("inline-flex items-center gap-2.5", className)}
      aria-label={`${brand.name} · inicio`}
    >
      <LogoMark size={size === "sm" ? 18 : 22} />
      <span
        className={clsx(
          "font-heading font-extrabold tracking-tight",
          size === "sm" ? "text-lg" : "text-xl",
          light ? "text-white" : "text-ink dark:text-white",
        )}
      >
        {brand.name}
      </span>
      {showTagline && (
        <span
          className={clsx(
            "hidden rounded-full px-2 py-0.5 text-[0.65rem] font-semibold sm:inline-block",
            light
              ? "bg-white/15 text-white"
              : "bg-primary-50 text-primary-600 dark:bg-white/10 dark:text-primary-200",
          )}
        >
          {brand.tagline}
        </span>
      )}
    </Link>
  );
}

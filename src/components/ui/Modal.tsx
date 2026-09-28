import { useEffect } from "react";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import clsx from "clsx";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: "md" | "lg";
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(
          "relative z-10 w-full animate-fadeIn rounded-lg border border-slate-200 bg-white shadow-elevated dark:border-night-border dark:bg-night-800",
          size === "lg" ? "max-w-2xl" : "max-w-md",
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-night-border">
            <h3 className="font-heading text-lg font-bold text-ink dark:text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-ink-faint hover:bg-slate-100 hover:text-ink dark:hover:bg-white/5"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4 dark:border-night-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

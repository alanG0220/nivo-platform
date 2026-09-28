import { useState } from "react";
import { Check } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHead } from "@/components/ui/misc";
import { ModuleIcon } from "@/components/ui/ModuleIcon";
import { MODULES } from "@/data/modules";
import { formatCOP } from "@/config/brand";
import clsx from "clsx";

type Filter = "todos" | "disponible" | "proximamente";

export function ServicesPage() {
  const [filter, setFilter] = useState<Filter>("todos");

  const filtered = MODULES.filter((m) => {
    if (filter === "disponible") return m.status === "Disponible";
    if (filter === "proximamente") return m.status === "Próximamente";
    return true;
  });

  const chips: { id: Filter; label: string }[] = [
    { id: "todos", label: `Todos los módulos (${MODULES.length})` },
    { id: "disponible", label: "Disponibles hoy" },
    { id: "proximamente", label: "Próximos lanzamientos" },
  ];

  return (
    <div className="animate-fadeIn nivo-container py-16 lg:py-20">
      <SectionHead
        tag="Catálogo modular"
        title="Servicios y módulos especializados"
        subtitle="Diseñados como piezas independientes que se acoplan perfectamente en tu portal privado."
      />

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {chips.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.id)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              filter === c.id
                ? "bg-primary-500 text-white"
                : "bg-white text-ink-soft ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-night-800 dark:text-slate-300 dark:ring-night-border",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((mod) => (
          <div
            key={mod.id}
            className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-card dark:border-night-border dark:bg-night-800"
          >
            <div className="mb-4 flex items-start justify-between">
              <ModuleIcon
                icon={mod.icon}
                color={mod.color}
                boxSize={48}
                size={24}
              />
              <Badge tone={mod.status === "Disponible" ? "ok" : "warn"}>
                {mod.status}
              </Badge>
            </div>
            <h3 className="font-heading text-lg font-bold text-ink dark:text-white">
              {mod.name}
            </h3>
            <p className="text-xs text-ink-faint">
              {mod.code} · {mod.category}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft dark:text-slate-400">
              {mod.shortDesc}
            </p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Beneficios principales
            </p>
            <ul className="mt-2 flex-1 space-y-2">
              {mod.features.slice(0, 4).map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-ink dark:text-slate-300"
                >
                  <Check
                    size={15}
                    className="mt-0.5 shrink-0 text-accent-500"
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-slate-100 pt-4 dark:border-night-border">
              <p className="text-sm text-ink-soft dark:text-slate-400">
                Desde{" "}
                <span className="font-heading text-lg font-bold text-ink dark:text-white">
                  {formatCOP(mod.monthlyPrice)}
                </span>{" "}
                / mes
              </p>
              <div className="mt-3 flex gap-2">
                <LinkButton
                  to={`/servicios/${mod.slug}`}
                  variant="secondary"
                  size="sm"
                  block
                >
                  Ver detalles
                </LinkButton>
                <LinkButton to="/planes" size="sm" block>
                  Elegir módulo
                </LinkButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Roadmap DIAN */}
      <div className="mt-14 rounded-xl border border-primary-200 bg-primary-50 p-8 dark:border-primary-500/30 dark:bg-primary-500/10">
        <Badge tone="info">Hoja de ruta 2026</Badge>
        <h3 className="mt-3 font-heading text-xl font-bold text-ink dark:text-white">
          ¿Necesitas facturación electrónica DIAN o nómina electrónica?
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-soft dark:text-slate-300">
          Estamos trabajando en la conexión con la DIAN para que emitas y
          valides tus comprobantes. Escríbenos si quieres acceso anticipado
          cuando esté disponible.
        </p>
        <LinkButton to="/contacto" className="mt-5">
          Solicitar acceso anticipado
        </LinkButton>
      </div>
    </div>
  );
}

import { useParams, Navigate, Link } from "react-router-dom";
import { Check, ArrowLeft, Puzzle, Target, UserCog } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ModuleIcon } from "@/components/ui/ModuleIcon";
import { getModuleBySlug } from "@/data/modules";
import { formatCOP } from "@/config/brand";

export function ModuleDetailPage() {
  const { slug } = useParams();
  const mod = slug ? getModuleBySlug(slug) : undefined;

  if (!mod) return <Navigate to="/servicios" replace />;

  return (
    <div className="animate-fadeIn">
      {/* Cabecera */}
      <section className="border-b border-slate-200 bg-slate-50 dark:border-night-border dark:bg-night-900/50">
        <div className="nivo-container py-12">
          <Link
            to="/servicios"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-primary-600 dark:text-slate-400"
          >
            <ArrowLeft size={16} /> Volver a servicios
          </Link>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <ModuleIcon
                icon={mod.icon}
                color={mod.color}
                boxSize={64}
                size={32}
              />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-heading text-3xl font-extrabold text-ink dark:text-white">
                    {mod.name}
                  </h1>
                  <Badge tone={mod.status === "Disponible" ? "ok" : "warn"}>
                    {mod.status}
                  </Badge>
                </div>
                <p className="text-sm text-ink-faint">
                  {mod.code} · {mod.category}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-ink-soft dark:text-slate-400">Desde</p>
              <p className="font-heading text-2xl font-extrabold text-ink dark:text-white">
                {formatCOP(mod.monthlyPrice)}
                <span className="text-base font-medium text-ink-faint">
                  {" "}
                  / mes
                </span>
              </p>
              <LinkButton to="/planes" className="mt-2">
                Elegir este módulo
              </LinkButton>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft dark:text-slate-300">
            {mod.longDesc}
          </p>
        </div>
      </section>

      <section className="nivo-container grid gap-10 py-14 lg:grid-cols-3">
        {/* Beneficios */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-heading text-xl font-bold text-ink dark:text-white">
            Beneficios y funcionalidades
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {mod.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white p-4 text-sm dark:border-night-border dark:bg-night-800"
              >
                <Check size={16} className="mt-0.5 shrink-0 text-accent-500" />
                <span className="text-ink dark:text-slate-200">{f}</span>
              </li>
            ))}
          </ul>

          <h2 className="mb-4 mt-10 font-heading text-xl font-bold text-ink dark:text-white">
            <Target className="mr-2 inline text-primary-500" size={20} /> Casos
            de uso
          </h2>
          <ul className="space-y-3">
            {mod.useCases.map((u) => (
              <li
                key={u}
                className="flex items-start gap-2.5 text-sm text-ink-soft dark:text-slate-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                {u}
              </li>
            ))}
          </ul>
        </div>

        {/* Roles + integraciones */}
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-night-border dark:bg-night-800">
            <h3 className="mb-3 flex items-center gap-2 font-heading font-bold text-ink dark:text-white">
              <UserCog size={18} className="text-accent-500" /> Roles que lo
              usan
            </h3>
            <div className="flex flex-wrap gap-2">
              {mod.targetRoles.map((r) => (
                <Badge key={r} tone="neutral">
                  {r}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-night-border dark:bg-night-800">
            <h3 className="mb-3 flex items-center gap-2 font-heading font-bold text-ink dark:text-white">
              <Puzzle size={18} className="text-primary-500" /> Integraciones y
              relacionados
            </h3>
            <ul className="space-y-2">
              {mod.integrations.map((i) => (
                <li
                  key={i}
                  className="text-sm text-ink-soft dark:text-slate-300"
                >
                  • {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-primary-200 bg-primary-50 p-6 text-center dark:border-primary-500/30 dark:bg-primary-500/10">
            <p className="text-sm text-ink-soft dark:text-slate-300">
              ¿Listo para activarlo en tu empresa?
            </p>
            <LinkButton to="/contratacion" block className="mt-3">
              Empezar prueba gratuita
            </LinkButton>
            <LinkButton
              to="/contacto"
              variant="ghost"
              block
              size="sm"
              className="mt-2"
            >
              Hablar con ventas
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}

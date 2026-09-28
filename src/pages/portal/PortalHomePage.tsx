import { ArrowRight, Settings } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { ModuleIcon } from "@/components/ui/ModuleIcon";
import { useApp } from "@/store/AppStore";
import { MOCK_COMPANY } from "@/data/mock";
import { MODULE_BY_ID } from "@/data/modules";
import { ROLE_LABEL } from "@/data/rbac";
import type { CompanyModuleStatus } from "@/types/domain";

const STATUS_META: Record<
  CompanyModuleStatus,
  { label: string; tone: BadgeTone }
> = {
  activo: { label: "Activo", tone: "ok" },
  en_prueba: { label: "En prueba", tone: "info" },
  suspendido: { label: "Suspendido", tone: "danger" },
  pendiente: { label: "Pendiente", tone: "warn" },
  no_contratado: { label: "No contratado", tone: "neutral" },
};

const ACTIVITY = [
  {
    tone: "ok" as BadgeTone,
    text: "Laura Camila Osorio radicó una solicitud de vacaciones (5 días hábiles).",
    time: "Hace 2 horas",
  },
  {
    tone: "info" as BadgeTone,
    text: "Carlos Morales completó la tarea «Revisión de contratos».",
    time: "Ayer, 04:30 p. m.",
  },
  {
    tone: "warn" as BadgeTone,
    text: "Factura del plan modular emitida y confirmada por Wompi.",
    time: "25 sep, 10:32 a. m.",
  },
];

export function PortalHomePage() {
  const { session } = useApp();
  if (!session) return null;

  const firstName = session.name.split(" ")[0];
  const contracted = MOCK_COMPANY.modules.filter(
    (m) => m.status !== "no_contratado",
  );
  const notContracted = MOCK_COMPANY.modules.filter(
    (m) => m.status === "no_contratado",
  );

  return (
    <div className="animate-fadeIn mx-auto max-w-6xl space-y-8">
      {/* Bienvenida */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white sm:flex-row sm:items-center sm:justify-between dark:border-night-border">
        <div>
          <h1 className="font-heading text-2xl font-extrabold">
            ¡Hola, {firstName}!
          </h1>
          <p className="mt-1 text-sm text-primary-100">
            Estás conectada como <strong>{ROLE_LABEL[session.role]}</strong> de{" "}
            {MOCK_COMPANY.commercialName}. Tienes {contracted.length} módulos
            contratados y acceso a soporte.
          </p>
        </div>
        {session.role === "owner" && (
          <LinkButton to="/app/configuracion" variant="accent">
            <Settings size={16} /> Administrar empresa
          </LinkButton>
        )}
      </div>

      {/* Resumen de plan */}
      <div className="grid gap-4 sm:grid-cols-3">
        <MiniStat label="Plan contratado" value={MOCK_COMPANY.plan} />
        <MiniStat label="Facturación" value={MOCK_COMPANY.billingCycleLabel} />
        <MiniStat label="Almacenamiento" value={MOCK_COMPANY.storageUsed} />
      </div>

      {/* Módulos */}
      <div>
        <h2 className="mb-4 font-heading text-lg font-bold text-ink dark:text-white">
          Módulos de tu empresa
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {contracted.map((m) => {
            const def = MODULE_BY_ID[m.id];
            const meta = STATUS_META[m.status];
            return (
              <Card key={m.id} className="flex flex-col">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <ModuleIcon icon={def.icon} color={def.color} />
                    <div>
                      <h3 className="font-heading font-bold text-ink dark:text-white">
                        {def.name}
                      </h3>
                      <span className="text-xs text-ink-faint">
                        {def.category}
                      </span>
                    </div>
                  </div>
                  <Badge tone={meta.tone}>{meta.label}</Badge>
                </div>
                <p className="text-sm text-ink-soft dark:text-slate-400">
                  {def.shortDesc}
                </p>
                {m.metrics && (
                  <div className="mt-4 flex gap-6">
                    {m.metrics.map((s) => (
                      <div key={s.label}>
                        <div
                          className={`font-heading text-xl font-extrabold ${s.highlight ? "text-warn-500" : "text-ink dark:text-white"}`}
                        >
                          {s.value}
                        </div>
                        <div className="text-xs text-ink-faint">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}
                <LinkButton to={`/app/modulos/${m.id}`} block className="mt-5">
                  Abrir módulo <ArrowRight size={15} />
                </LinkButton>
              </Card>
            );
          })}

          {/* No contratados */}
          {notContracted.map((m) => {
            const def = MODULE_BY_ID[m.id];
            return (
              <Card key={m.id} className="flex flex-col opacity-90">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <ModuleIcon icon={def.icon} color={def.color} />
                    <div>
                      <h3 className="font-heading font-bold text-ink dark:text-white">
                        {def.name}
                      </h3>
                      <span className="text-xs text-ink-faint">
                        {def.category}
                      </span>
                    </div>
                  </div>
                  <Badge tone="neutral">No contratado</Badge>
                </div>
                <p className="text-sm text-ink-soft dark:text-slate-400">
                  {def.shortDesc}
                </p>
                <LinkButton
                  to="/planes"
                  variant="secondary"
                  block
                  className="mt-5"
                >
                  Ver planes
                </LinkButton>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Actividad */}
      <Card>
        <h3 className="mb-4 font-heading font-bold text-ink dark:text-white">
          Actividad reciente del equipo
        </h3>
        <div className="divide-y divide-slate-100 dark:divide-night-border">
          {ACTIVITY.map((a, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 py-3 text-sm"
            >
              <div className="flex items-center gap-2.5">
                <Badge tone={a.tone} dot>
                  {" "}
                </Badge>
                <span className="text-ink dark:text-slate-300">{a.text}</span>
              </div>
              <span className="shrink-0 text-xs text-ink-faint">{a.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-night-border dark:bg-night-800">
      <p className="text-xs uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-1 font-heading font-bold text-ink dark:text-white">
        {value}
      </p>
    </div>
  );
}

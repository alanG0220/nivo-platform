import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Clock,
  CreditCard,
  Building2,
  FileWarning,
  X,
  Check,
  AlertTriangle,
  Rocket,
  Ban,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { DataTable, Th, Td } from "@/components/ui/misc";
import { getDataProvider } from "@/services/dataProvider";
import { APPLICATION_STATUS_META } from "@/data/mock";
import { formatCOP, brand } from "@/config/brand";
import type { Application, ApplicationStatus } from "@/types/domain";
import clsx from "clsx";

const provider = getDataProvider();

type FilterKey = "todas" | "pendientes" | "revision" | "activas" | "correccion";

const FILTERS: {
  id: FilterKey;
  label: string;
  match: (s: ApplicationStatus) => boolean;
}[] = [
  { id: "todas", label: "Todas", match: () => true },
  {
    id: "pendientes",
    label: "Pendientes",
    match: (s) =>
      s === "pago_recibido" || s === "pago_pendiente" || s === "enviada",
  },
  { id: "revision", label: "En revisión", match: (s) => s === "en_revision" },
  {
    id: "correccion",
    label: "Requiere corrección",
    match: (s) => s === "requiere_correccion",
  },
  {
    id: "activas",
    label: "Activas",
    match: (s) => s === "activa" || s === "aprobada" || s === "cuenta_creada",
  },
];

export function OpsConsolePage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [filter, setFilter] = useState<FilterKey>("todas");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    provider.getApplications().then(setApps);
  }, []);

  const notify = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2800);
  };

  const kpis = useMemo(() => {
    const pending = apps.filter((a) =>
      ["pago_recibido", "pago_pendiente", "en_revision", "enviada"].includes(
        a.status,
      ),
    ).length;
    const paid = apps.filter((a) => a.paymentStatus === "Pago recibido").length;
    const active = apps.filter((a) => a.status === "activa").length;
    const missingDocs = apps.filter((a) =>
      a.documents.some(
        (d) => d.status === "pendiente" || d.status === "requiere_correccion",
      ),
    ).length;
    return { pending, paid, active, missingDocs };
  }, [apps]);

  const filtered = useMemo(() => {
    const f = FILTERS.find((x) => x.id === filter)!;
    return apps.filter((a) => {
      if (!f.match(a.status)) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        a.companyName.toLowerCase().includes(q) ||
        a.nit.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      );
    });
  }, [apps, filter, query]);

  const selected = apps.find((a) => a.id === selectedId) ?? null;

  const doAction = async (
    status: ApplicationStatus,
    action: string,
    msg: string,
  ) => {
    if (!selectedId) return;
    const updated = await provider.updateApplicationStatus(
      selectedId,
      status,
      action,
    );
    setApps([...updated]);
    notify(msg);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-night-950">
      {/* Header interno */}
      <header className="border-b border-slate-200 bg-white dark:border-night-border dark:bg-night-900">
        <div className="nivo-container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <Badge tone="warn">Nivo Ops · Panel interno</Badge>
          </div>
          <div className="flex gap-2">
            <Link
              to="/app"
              className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-slate-50 dark:border-night-border dark:text-slate-300"
            >
              Portal cliente
            </Link>
            <Link
              to="/"
              className="rounded-md px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-slate-100 dark:text-slate-300"
            >
              Web pública
            </Link>
          </div>
        </div>
      </header>

      <div className="nivo-container py-8">
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-extrabold text-ink dark:text-white">
            Revisión de solicitudes y activación de clientes
          </h1>
          <p className="text-sm text-ink-soft dark:text-slate-400">
            Valida documentos, pagos de Wompi y habilita cuentas de empresas.
          </p>
        </div>

        {/* KPIs */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi
            icon={Clock}
            label="Solicitudes en validación"
            value={kpis.pending}
            tone="warn"
          />
          <Kpi
            icon={CreditCard}
            label="Pagos confirmados"
            value={kpis.paid}
            tone="ok"
          />
          <Kpi
            icon={Building2}
            label="Empresas activas"
            value={kpis.active}
            tone="info"
          />
          <Kpi
            icon={FileWarning}
            label="Con documentos faltantes"
            value={kpis.missingDocs}
            tone="danger"
          />
        </div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <Input
              placeholder="Buscar por empresa, NIT o radicado…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={clsx(
                  "rounded-full px-3.5 py-1.5 text-xs font-semibold",
                  filter === f.id
                    ? "bg-primary-500 text-white"
                    : "bg-white text-ink-soft ring-1 ring-slate-200 dark:bg-night-800 dark:text-slate-300 dark:ring-night-border",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabla */}
        <DataTable>
          <thead>
            <tr>
              <Th>Radicado</Th>
              <Th>Empresa y NIT</Th>
              <Th>Responsable</Th>
              <Th>Módulos</Th>
              <Th>Pago</Th>
              <Th>Estado</Th>
              <Th>Acción</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const meta = APPLICATION_STATUS_META[a.status];
              return (
                <tr key={a.id}>
                  <Td>
                    <span className="font-semibold">{a.id}</span>
                    <div className="text-xs text-ink-faint">
                      {a.submittedAt}
                    </div>
                  </Td>
                  <Td>
                    <span className="font-semibold">{a.companyName}</span>
                    <div className="text-xs text-ink-faint">
                      NIT: {a.nit} · {a.city}
                    </div>
                  </Td>
                  <Td>
                    {a.contactName}
                    <div className="text-xs text-ink-faint">
                      {a.contactEmail}
                    </div>
                  </Td>
                  <Td className="text-sm">
                    {a.modules.join(", ")}
                    <div className="text-xs text-ink-faint">{a.period}</div>
                  </Td>
                  <Td>
                    <span className="font-semibold text-accent-600">
                      {formatCOP(a.totalCop)}
                    </span>
                    <div className="text-xs text-ink-faint">
                      {a.paymentGateway}
                    </div>
                  </Td>
                  <Td>
                    <Badge tone={meta.tone as BadgeTone}>{meta.label}</Badge>
                  </Td>
                  <Td>
                    <Button size="sm" onClick={() => setSelectedId(a.id)}>
                      Inspeccionar
                    </Button>
                  </Td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <Td className="py-8 text-center text-ink-faint">
                  No hay solicitudes que coincidan con el filtro.
                </Td>
              </tr>
            )}
          </tbody>
        </DataTable>
      </div>

      {/* Drawer de inspección */}
      {selected && (
        <>
          <div
            className="fixed inset-0 z-40 bg-ink/40"
            onClick={() => setSelectedId(null)}
          />
          <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-elevated dark:border-night-border dark:bg-night-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-night-border">
              <div>
                <Badge tone="info">{selected.id}</Badge>
                <h3 className="mt-1 font-heading text-lg font-bold text-ink dark:text-white">
                  {selected.companyName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="rounded-md p-1 text-ink-faint hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
              <Section title="Estado de la solicitud">
                <Row
                  label="Estado"
                  value={
                    <Badge
                      tone={
                        APPLICATION_STATUS_META[selected.status]
                          .tone as BadgeTone
                      }
                    >
                      {APPLICATION_STATUS_META[selected.status].label}
                    </Badge>
                  }
                />
                <Row
                  label="Pago"
                  value={
                    <span className="font-semibold text-accent-600">
                      {selected.paymentStatus} · {formatCOP(selected.totalCop)}
                    </span>
                  }
                />
                <Row label="Pasarela" value={selected.paymentGateway} />
                <Row label="Periodo" value={selected.period} />
              </Section>

              <Section title="Información jurídica y contacto">
                <Row label="Razón social" value={selected.companyName} />
                <Row label="NIT" value={selected.nit} />
                <Row label="Ciudad" value={selected.city} />
                <Row label="Responsable" value={selected.contactName} />
                <Row label="Correo" value={selected.contactEmail} />
                <Row label="Teléfono" value={selected.contactPhone} />
              </Section>

              <Section title="Documentos adjuntos">
                <div className="space-y-2">
                  {selected.documents.map((d, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-md border border-slate-200 p-2.5 text-sm dark:border-night-border"
                    >
                      <span className="text-ink dark:text-slate-200">
                        {d.label}
                      </span>
                      <Badge
                        tone={
                          d.status === "aprobado"
                            ? "ok"
                            : d.status === "cargado"
                              ? "info"
                              : d.status === "requiere_correccion"
                                ? "danger"
                                : "warn"
                        }
                      >
                        {d.status === "aprobado"
                          ? "Aprobado"
                          : d.status === "cargado"
                            ? "Cargado"
                            : d.status === "requiere_correccion"
                              ? "Corregir"
                              : "Pendiente"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Historial de auditoría">
                <div className="space-y-2">
                  {selected.history.map((h, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-accent-500 pl-3 text-sm text-ink-soft dark:text-slate-300"
                    >
                      <strong className="text-ink dark:text-white">
                        {h.time}:
                      </strong>{" "}
                      {h.action}
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            {/* Acciones del operador */}
            <div className="grid grid-cols-2 gap-2 border-t border-slate-200 p-4 dark:border-night-border">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  doAction(
                    "requiere_correccion",
                    "Se solicitó corrección de documentos.",
                    "Solicitud de corrección enviada al cliente.",
                  )
                }
              >
                <AlertTriangle size={15} /> Solicitar corrección
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() =>
                  doAction(
                    "rechazada",
                    "Solicitud rechazada por el operador.",
                    "Solicitud rechazada.",
                  )
                }
              >
                <Ban size={15} /> Rechazar
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  doAction(
                    "aprobada",
                    "Operador aprobó la documentación legal.",
                    "Documentos aprobados.",
                  )
                }
              >
                <Check size={15} /> Aprobar
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  doAction(
                    "activa",
                    "Cuenta creada, módulos aprovisionados y credenciales enviadas.",
                    "¡Cuenta creada y activada! Credenciales enviadas al responsable.",
                  )
                }
              >
                <Rocket size={15} /> Crear y activar
              </Button>
            </div>
          </aside>
        </>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-elevated dark:bg-white dark:text-ink">
          {toast}
        </div>
      )}

      <footer className="border-t border-slate-200 py-4 text-center text-xs text-ink-faint dark:border-night-border">
        {brand.legalName} · Consola interna de operaciones (demostración)
      </footer>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Clock;
  label: string;
  value: number;
  tone: BadgeTone;
}) {
  const colors: Record<string, string> = {
    warn: "text-warn-500",
    ok: "text-accent-600",
    info: "text-primary-600",
    danger: "text-danger-500",
    neutral: "text-ink",
    primary: "text-primary-600",
  };
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-5 dark:border-night-border dark:bg-night-800">
      <div>
        <div
          className={clsx("font-heading text-3xl font-extrabold", colors[tone])}
        >
          {value}
        </div>
        <div className="text-xs text-ink-faint">{label}</div>
      </div>
      <div className="text-ink-faint">
        <Icon size={26} />
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">
        {title}
      </h4>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-ink-soft dark:text-slate-400">{label}</span>
      <span className="text-right text-ink dark:text-slate-200">{value}</span>
    </div>
  );
}

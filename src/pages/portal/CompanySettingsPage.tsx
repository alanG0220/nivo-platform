import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Package, Users, ShieldCheck, AlertTriangle, Lock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button, LinkButton } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { Switch, DataTable, Th, Td } from "@/components/ui/misc";
import { useApp } from "@/store/AppStore";
import { MOCK_COMPANY, MOCK_COMPANY_USERS } from "@/data/mock";
import { MODULE_BY_ID } from "@/data/modules";
import {
  ROLES,
  ROLE_LABEL,
  PERMISSION_CATALOG,
  DEFAULT_ROLE_PERMISSIONS,
} from "@/data/rbac";
import { formatCOP } from "@/config/brand";
import type {
  CompanyModuleStatus,
  PermissionCode,
  RoleCode,
} from "@/types/domain";
import clsx from "clsx";

type Tab = "modulos" | "usuarios" | "permisos" | "seguridad";

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

const ROLE_BADGE: Record<RoleCode, BadgeTone> = {
  owner: "warn",
  admin: "info",
  user: "neutral",
};

export function CompanySettingsPage() {
  const { session } = useApp();
  const [tab, setTab] = useState<Tab>("modulos");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Guarda de rol: solo el Propietario (owner) accede a esta sección.
  if (!session) return <Navigate to="/ingresar" replace />;
  if (session.role !== "owner") {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-danger-soft text-danger-500">
          <Lock size={22} />
        </div>
        <h2 className="font-heading text-lg font-bold text-ink dark:text-white">
          Zona exclusiva del Propietario
        </h2>
        <p className="mt-2 text-sm text-ink-soft dark:text-slate-400">
          Solo el rol Propietario puede gestionar módulos, usuarios y permisos
          de la empresa.
        </p>
        <LinkButton to="/app" variant="secondary" className="mt-5">
          Volver al resumen
        </LinkButton>
      </div>
    );
  }

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const TABS: { id: Tab; label: string; icon: typeof Package }[] = [
    { id: "modulos", label: "Módulos y facturación", icon: Package },
    {
      id: "usuarios",
      label: `Usuarios y roles (${MOCK_COMPANY_USERS.length})`,
      icon: Users,
    },
    { id: "permisos", label: "Matriz de permisos", icon: ShieldCheck },
    { id: "seguridad", label: "Seguridad", icon: AlertTriangle },
  ];

  return (
    <div className="animate-fadeIn mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-ink dark:text-white">
            Configuración de empresa
          </h1>
          <p className="text-sm text-ink-soft dark:text-slate-400">
            Control de acceso, módulos y facturación de{" "}
            {MOCK_COMPANY.commercialName}.
          </p>
        </div>
        <Badge tone="warn">🔒 Zona Propietario</Badge>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              tab === t.id
                ? "bg-primary-500 text-white"
                : "bg-white text-ink-soft ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-night-800 dark:text-slate-300 dark:ring-night-border",
            )}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      {tab === "modulos" && <ModulesTab notify={notify} />}
      {tab === "usuarios" && (
        <UsersTab onInvite={() => setInviteOpen(true)} notify={notify} />
      )}
      {tab === "permisos" && <PermissionsTab notify={notify} />}
      {tab === "seguridad" && <SecurityTab notify={notify} />}

      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invitar colaborador"
        footer={
          <>
            <Button variant="ghost" onClick={() => setInviteOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setInviteOpen(false);
                notify("Invitación enviada (demostración).");
              }}
            >
              Enviar invitación
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Nombre completo" required>
            <Input placeholder="Ej: Juan Pérez" />
          </Field>
          <Field label="Correo empresarial" required>
            <Input type="email" placeholder="nombre@cafearoma.com.co" />
          </Field>
          <Field label="Rol" required>
            <Select defaultValue="user">
              {ROLES.filter((r) => r.code !== "owner").map((r) => (
                <option key={r.code} value={r.code}>
                  {r.label} — {r.audience}
                </option>
              ))}
            </Select>
          </Field>
          <p className="rounded-md bg-slate-50 p-3 text-xs text-ink-soft dark:bg-night-900 dark:text-slate-400">
            El rol Propietario no puede asignarse por invitación. El cambio de
            propietario requiere una confirmación reforzada.
          </p>
        </div>
      </Modal>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-elevated dark:bg-white dark:text-ink">
          {toast}
        </div>
      )}
    </div>
  );
}

// ── Tab 1: Módulos y facturación ─────────────────────────
function ModulesTab({ notify }: { notify: (m: string) => void }) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-night-border">
        <div>
          <h3 className="font-heading text-lg font-bold text-ink dark:text-white">
            Estado de módulos y suscripción
          </h3>
          <p className="text-sm text-ink-soft dark:text-slate-400">
            Administra la activación de software y la facturación.
          </p>
        </div>
        <Badge tone="ok">Al día · Wompi</Badge>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Info
          label="Periodo de facturación"
          value={MOCK_COMPANY.billingCycleLabel}
        />
        <Info label="Almacenamiento" value={MOCK_COMPANY.storageUsed} />
        <Info
          label="Colaboradores"
          value={`${MOCK_COMPANY.usersCount} activos`}
        />
      </div>

      <DataTable>
        <thead>
          <tr>
            <Th>Módulo</Th>
            <Th>Estado</Th>
            <Th>Activación</Th>
            <Th>Periodo</Th>
            <Th>Inversión</Th>
            <Th>Acción</Th>
          </tr>
        </thead>
        <tbody>
          {MOCK_COMPANY.modules.map((m) => {
            const def = MODULE_BY_ID[m.id];
            const meta = STATUS_META[m.status];
            const contracted = m.status !== "no_contratado";
            return (
              <tr key={m.id}>
                <Td className="font-semibold">{def.name}</Td>
                <Td>
                  <Badge tone={meta.tone}>{meta.label}</Badge>
                </Td>
                <Td>{m.activatedAt ?? "—"}</Td>
                <Td className="capitalize">{m.billingPeriod ?? "—"}</Td>
                <Td>{formatCOP(def.monthlyPrice)} / mes</Td>
                <Td>
                  {contracted ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => notify(`Configurando ${def.name}…`)}
                    >
                      Configurar
                    </Button>
                  ) : (
                    <LinkButton to="/planes" size="sm">
                      Contratar
                    </LinkButton>
                  )}
                </Td>
              </tr>
            );
          })}
        </tbody>
      </DataTable>
    </Card>
  );
}

// ── Tab 2: Usuarios y roles ──────────────────────────────
function UsersTab({
  onInvite,
  notify,
}: {
  onInvite: () => void;
  notify: (m: string) => void;
}) {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-night-border">
        <div>
          <h3 className="font-heading text-lg font-bold text-ink dark:text-white">
            Usuarios de la empresa
          </h3>
          <p className="text-sm text-ink-soft dark:text-slate-400">
            Asigna roles con privilegios diferenciados para cada colaborador.
          </p>
        </div>
        <Button size="sm" onClick={onInvite}>
          + Invitar colaborador
        </Button>
      </div>

      <DataTable>
        <thead>
          <tr>
            <Th>Nombre</Th>
            <Th>Correo</Th>
            <Th>Rol</Th>
            <Th>Estado</Th>
            <Th>Último acceso</Th>
            <Th>Acción</Th>
          </tr>
        </thead>
        <tbody>
          {MOCK_COMPANY_USERS.map((u) => (
            <tr key={u.id}>
              <Td className="font-semibold">{u.name}</Td>
              <Td className="text-ink-soft">{u.email}</Td>
              <Td>
                <Badge tone={ROLE_BADGE[u.role]}>
                  {u.roleLabel ?? ROLE_LABEL[u.role]}
                </Badge>
              </Td>
              <Td>
                <Badge
                  tone={
                    u.status === "Activo"
                      ? "ok"
                      : u.status === "Invitado"
                        ? "info"
                        : "danger"
                  }
                >
                  {u.status}
                </Badge>
              </Td>
              <Td className="text-ink-soft">{u.lastLogin}</Td>
              <Td>
                {u.role === "owner" ? (
                  <span className="text-xs text-ink-faint">Propietario</span>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      notify(`Editar acceso de ${u.name} (demostración).`)
                    }
                  >
                    Editar
                  </Button>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </Card>
  );
}

// ── Tab 3: Matriz de permisos ────────────────────────────
function PermissionsTab({ notify }: { notify: (m: string) => void }) {
  // Estado editable de la matriz (rol → set de permisos)
  const [matrix, setMatrix] = useState<Record<RoleCode, Set<PermissionCode>>>(
    () => ({
      owner: new Set(DEFAULT_ROLE_PERMISSIONS.owner),
      admin: new Set(DEFAULT_ROLE_PERMISSIONS.admin),
      user: new Set(DEFAULT_ROLE_PERMISSIONS.user),
    }),
  );

  const toggle = (role: RoleCode, code: PermissionCode) => {
    if (role === "owner") return; // el Propietario siempre tiene todo
    setMatrix((prev) => {
      const nextSet = new Set(prev[role]);
      nextSet.has(code) ? nextSet.delete(code) : nextSet.add(code);
      return { ...prev, [role]: nextSet };
    });
  };

  // Agrupar permisos por módulo
  const groups = [
    "core",
    "productividad",
    "rrhh",
    "contabilidad",
    "inventarios",
    "costos",
  ] as const;
  const groupLabels: Record<string, string> = {
    core: "Núcleo de la plataforma",
    productividad: "Productividad",
    rrhh: "RRHH · Flow Desk",
    contabilidad: "Contabilidad",
    inventarios: "Inventarios",
    costos: "Costos",
  };

  return (
    <Card>
      <div className="mb-5 border-b border-slate-100 pb-4 dark:border-night-border">
        <h3 className="font-heading text-lg font-bold text-ink dark:text-white">
          Matriz de permisos por rol
        </h3>
        <p className="text-sm text-ink-soft dark:text-slate-400">
          Los interruptores activan o restringen acciones específicas. Regla:
          denegar por defecto. Estos cambios se validarán también en el backend
          (Supabase RLS).
        </p>
      </div>

      <div className="space-y-8">
        {groups.map((g) => {
          const perms = PERMISSION_CATALOG.filter((p) => p.module === g);
          if (perms.length === 0) return null;
          return (
            <div key={g}>
              <h4 className="mb-2 font-heading text-sm font-bold text-ink dark:text-white">
                {groupLabels[g]}
              </h4>
              <DataTable>
                <thead>
                  <tr>
                    <Th className="min-w-[240px]">Permiso</Th>
                    <Th className="text-center">Propietario</Th>
                    <Th className="text-center">Administrador</Th>
                    <Th className="text-center">Usuario</Th>
                  </tr>
                </thead>
                <tbody>
                  {perms.map((p) => (
                    <tr key={p.code}>
                      <Td>
                        <div className="font-medium text-ink dark:text-white">
                          {p.label}
                        </div>
                        <div className="text-xs text-ink-faint">
                          {p.description}
                        </div>
                      </Td>
                      {(["owner", "admin", "user"] as RoleCode[]).map(
                        (role) => (
                          <Td key={role} className="text-center">
                            <div className="flex justify-center">
                              <Switch
                                checked={matrix[role].has(p.code)}
                                disabled={role === "owner"}
                                onChange={() => toggle(role, p.code)}
                                aria-label={`${p.label} para ${ROLE_LABEL[role]}`}
                              />
                            </div>
                          </Td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </DataTable>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={() =>
            notify(
              "Permisos guardados y listos para sincronizar con Supabase RLS.",
            )
          }
        >
          Guardar cambios
        </Button>
      </div>
    </Card>
  );
}

// ── Tab 4: Seguridad ─────────────────────────────────────
function SecurityTab({ notify }: { notify: (m: string) => void }) {
  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-heading text-lg font-bold text-ink dark:text-white">
          Seguridad y auditoría
        </h3>
        <p className="mt-1 text-sm text-ink-soft dark:text-slate-400">
          Autenticación de dos factores (2FA) y registro de accesos. Las
          acciones sensibles quedan registradas: quién, cuándo y qué cambió.
        </p>
        <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 p-4 dark:border-night-border">
          <div>
            <p className="font-semibold text-ink dark:text-white">
              Autenticación de dos factores (2FA)
            </p>
            <p className="text-sm text-ink-soft dark:text-slate-400">
              Añade una capa extra de seguridad al inicio de sesión.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => notify("Configuración de 2FA (demostración).")}
          >
            Configurar
          </Button>
        </div>
      </Card>

      <div className="rounded-xl border border-danger-500/30 bg-danger-soft p-6 dark:bg-danger-500/10">
        <h4 className="flex items-center gap-2 font-heading font-bold text-danger-600 dark:text-danger-500">
          <AlertTriangle size={18} /> Zona de peligro
        </h4>
        <p className="mt-2 text-sm text-ink-soft dark:text-slate-300">
          Cancelar un módulo eliminará los permisos de los colaboradores y
          archivará los registros al final del periodo actual. Esta acción no
          puede deshacerse.
        </p>
        <Button
          variant="danger"
          size="sm"
          className="mt-4"
          onClick={() =>
            notify("Acción sensible: se requeriría confirmación reforzada.")
          }
        >
          Solicitar cancelación de suscripción
        </Button>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4 dark:bg-night-900">
      <p className="text-xs uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink dark:text-white">
        {value}
      </p>
    </div>
  );
}

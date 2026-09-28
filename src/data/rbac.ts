/**
 * Modelo RBAC de Nivo — roles, catálogo de permisos y matriz por rol.
 * Basado en la especificación de negocio: mínimo privilegio, denegar por
 * defecto, aislamiento por empresa y módulo activo obligatorio.
 *
 * Los códigos de permiso son estables y coinciden con los que se aplicarán
 * en Supabase (RLS + funciones SQL). La interfaz muestra los `label`.
 */
import type {
  PermissionDefinition,
  RoleDefinition,
  RoleCode,
  PermissionCode,
} from "@/types/domain";

export const ROLES: RoleDefinition[] = [
  {
    code: "owner",
    label: "Propietario",
    audience: "Dueño, representante legal o responsable máximo de la empresa.",
    scope:
      "Control total de empresa, módulos, usuarios, permisos, facturación y configuración.",
  },
  {
    code: "admin",
    label: "Administrador",
    audience: "Jefe de área, gerente, coordinador o encargado operativo.",
    scope:
      "Gestiona los módulos y equipos que el Propietario le habilite, sin controlar la relación comercial.",
  },
  {
    code: "user",
    label: "Usuario",
    audience: "Empleado, colaborador, técnico o persona operativa.",
    scope: "Accede solo a sus propios datos y a las funciones asignadas.",
  },
];

export const ROLE_LABEL: Record<RoleCode, string> = {
  owner: "Propietario",
  admin: "Administrador",
  user: "Usuario",
};

/** Catálogo completo de permisos técnicos, agrupado por módulo. */
export const PERMISSION_CATALOG: PermissionDefinition[] = [
  // ── Núcleo Nivo ──────────────────────────────────────
  {
    code: "portal.view",
    label: "Ver inicio de empresa",
    description: "Acceso al resumen del portal privado.",
    module: "core",
  },
  {
    code: "company.view",
    label: "Ver datos de empresa",
    description: "Consultar la información general de la empresa.",
    module: "core",
  },
  {
    code: "company.manage",
    label: "Editar empresa",
    description: "Editar datos, contacto, logo y configuración.",
    module: "core",
  },
  {
    code: "billing.view",
    label: "Ver facturación",
    description: "Ver plan, comprobantes y estado de pago.",
    module: "core",
  },
  {
    code: "billing.manage",
    label: "Gestionar facturación",
    description: "Administrar la relación comercial y pagos.",
    module: "core",
  },
  {
    code: "modules.view",
    label: "Ver módulos",
    description: "Ver módulos contratados y no contratados.",
    module: "core",
  },
  {
    code: "modules.manage",
    label: "Contratar/suspender módulos",
    description: "Activar, suspender o cancelar módulos.",
    module: "core",
  },
  {
    code: "users.view",
    label: "Ver usuarios",
    description: "Ver la lista de usuarios de la empresa.",
    module: "core",
  },
  {
    code: "users.invite",
    label: "Invitar usuarios",
    description: "Invitar nuevos colaboradores.",
    module: "core",
  },
  {
    code: "users.manage",
    label: "Gestionar usuarios",
    description: "Activar, desactivar o eliminar usuarios.",
    module: "core",
  },
  {
    code: "roles.view",
    label: "Ver roles",
    description: "Consultar roles asignados.",
    module: "core",
  },
  {
    code: "roles.manage",
    label: "Asignar roles",
    description: "Asignar roles a los usuarios.",
    module: "core",
  },
  {
    code: "permissions.manage",
    label: "Gestionar permisos",
    description: "Habilitar/deshabilitar permisos individuales.",
    module: "core",
  },
  {
    code: "support.view",
    label: "Ayuda y soporte",
    description: "Acceder a ayuda y soporte.",
    module: "core",
  },

  // ── Productividad ────────────────────────────────────
  {
    code: "tasks.view_own",
    label: "Ver tareas propias",
    description: "Ver únicamente sus tareas.",
    module: "productividad",
  },
  {
    code: "tasks.view_team",
    label: "Ver tareas del equipo",
    description: "Ver tareas de todo el equipo.",
    module: "productividad",
  },
  {
    code: "tasks.create_own",
    label: "Crear tareas personales",
    description: "Crear tareas para sí mismo.",
    module: "productividad",
  },
  {
    code: "tasks.create_team",
    label: "Crear y asignar tareas",
    description: "Crear tareas y asignarlas a otros.",
    module: "productividad",
  },
  {
    code: "tasks.manage",
    label: "Gestionar tareas",
    description: "Editar y administrar tareas del equipo.",
    module: "productividad",
  },
  {
    code: "meetings.view_own",
    label: "Ver reuniones propias",
    description: "Ver reuniones a las que fue invitado.",
    module: "productividad",
  },
  {
    code: "meetings.view_team",
    label: "Ver reuniones del equipo",
    description: "Ver todas las reuniones.",
    module: "productividad",
  },
  {
    code: "meetings.create",
    label: "Crear reuniones",
    description: "Programar reuniones.",
    module: "productividad",
  },
  {
    code: "meetings.manage",
    label: "Gestionar reuniones",
    description: "Administrar reuniones y actas.",
    module: "productividad",
  },
  {
    code: "calendar.view_own",
    label: "Ver calendario propio",
    description: "Ver su calendario.",
    module: "productividad",
  },
  {
    code: "calendar.view_team",
    label: "Ver calendario del equipo",
    description: "Ver el calendario completo.",
    module: "productividad",
  },
  {
    code: "announcements.view",
    label: "Ver anuncios",
    description: "Ver anuncios y circulares.",
    module: "productividad",
  },
  {
    code: "announcements.manage",
    label: "Publicar anuncios",
    description: "Crear y administrar anuncios.",
    module: "productividad",
  },
  {
    code: "assistant.use",
    label: "Usar asistente",
    description: "Usar el asistente guiado.",
    module: "productividad",
  },

  // ── RRHH · Flow Desk ─────────────────────────────────
  {
    code: "employees.view",
    label: "Ver empleados",
    description: "Ver el directorio de empleados.",
    module: "rrhh",
  },
  {
    code: "employees.manage",
    label: "Gestionar empleados",
    description: "Crear y editar expedientes.",
    module: "rrhh",
  },
  {
    code: "requests.create",
    label: "Crear solicitudes",
    description: "Radicar solicitudes laborales.",
    module: "rrhh",
  },
  {
    code: "requests.view_own",
    label: "Ver solicitudes propias",
    description: "Ver sus propias solicitudes.",
    module: "rrhh",
  },
  {
    code: "requests.view_team",
    label: "Ver solicitudes del equipo",
    description: "Ver solicitudes del equipo.",
    module: "rrhh",
  },
  {
    code: "requests.manage",
    label: "Aprobar solicitudes",
    description: "Gestionar y aprobar solicitudes.",
    module: "rrhh",
  },
  {
    code: "presence.self",
    label: "Registrar presencia propia",
    description: "Registrar su propia presencia.",
    module: "rrhh",
  },
  {
    code: "presence.view_team",
    label: "Ver presencia del equipo",
    description: "Ver la presencia del equipo.",
    module: "rrhh",
  },
  {
    code: "documents.view_own",
    label: "Ver documentos propios",
    description: "Ver sus documentos laborales.",
    module: "rrhh",
  },
  {
    code: "documents.view_team",
    label: "Ver documentos del equipo",
    description: "Ver documentos del equipo.",
    module: "rrhh",
  },
  {
    code: "documents.manage",
    label: "Gestionar documentos",
    description: "Administrar documentos laborales.",
    module: "rrhh",
  },

  // ── Contabilidad ─────────────────────────────────────
  {
    code: "accounting.dashboard.view",
    label: "Ver tablero contable",
    description: "Ver el tablero de contabilidad.",
    module: "contabilidad",
  },
  {
    code: "accounting.entries.view",
    label: "Ver movimientos",
    description: "Consultar movimientos contables.",
    module: "contabilidad",
  },
  {
    code: "accounting.entries.create",
    label: "Registrar movimientos",
    description: "Registrar movimientos contables.",
    module: "contabilidad",
  },
  {
    code: "accounting.entries.manage",
    label: "Gestionar causaciones",
    description: "Administrar causaciones.",
    module: "contabilidad",
  },
  {
    code: "accounting.ledger.view",
    label: "Ver libros oficiales",
    description: "Consultar libros oficiales.",
    module: "contabilidad",
  },
  {
    code: "accounting.reports.view",
    label: "Ver reportes contables",
    description: "Ver reportes financieros.",
    module: "contabilidad",
  },
  {
    code: "accounting.reports.export",
    label: "Exportar reportes contables",
    description: "Exportar reportes.",
    module: "contabilidad",
  },
  {
    code: "accounting.closing.manage",
    label: "Gestionar cierres",
    description: "Administrar cierres contables.",
    module: "contabilidad",
  },
  {
    code: "accounting.settings.manage",
    label: "Configurar cuentas/impuestos",
    description: "Configurar cuentas e impuestos.",
    module: "contabilidad",
  },

  // ── Inventarios ──────────────────────────────────────
  {
    code: "inventory.dashboard.view",
    label: "Ver tablero de inventario",
    description: "Ver el tablero de inventarios.",
    module: "inventarios",
  },
  {
    code: "inventory.products.view",
    label: "Ver productos",
    description: "Consultar productos.",
    module: "inventarios",
  },
  {
    code: "inventory.products.manage",
    label: "Gestionar productos",
    description: "Crear y editar productos.",
    module: "inventarios",
  },
  {
    code: "inventory.warehouses.view",
    label: "Ver bodegas",
    description: "Consultar bodegas.",
    module: "inventarios",
  },
  {
    code: "inventory.warehouses.manage",
    label: "Gestionar bodegas",
    description: "Administrar bodegas.",
    module: "inventarios",
  },
  {
    code: "inventory.stock.view",
    label: "Ver existencias",
    description: "Consultar existencias.",
    module: "inventarios",
  },
  {
    code: "inventory.costs.view",
    label: "Ver costos y valorización",
    description: "Ver costos y valorización.",
    module: "inventarios",
  },
  {
    code: "inventory.movements.create",
    label: "Registrar movimientos",
    description: "Registrar entradas y salidas.",
    module: "inventarios",
  },
  {
    code: "inventory.movements.manage",
    label: "Gestionar movimientos",
    description: "Administrar movimientos.",
    module: "inventarios",
  },
  {
    code: "inventory.adjustments.manage",
    label: "Ajustar inventario",
    description: "Realizar ajustes de inventario.",
    module: "inventarios",
  },
  {
    code: "inventory.transfers.create",
    label: "Transferir entre bodegas",
    description: "Transferir entre bodegas.",
    module: "inventarios",
  },
  {
    code: "inventory.reports.view",
    label: "Ver reportes de inventario",
    description: "Ver reportes.",
    module: "inventarios",
  },
  {
    code: "inventory.reports.export",
    label: "Exportar reportes de inventario",
    description: "Exportar reportes.",
    module: "inventarios",
  },

  // ── Costos ───────────────────────────────────────────
  {
    code: "costs.recipes.view",
    label: "Ver recetas de costo",
    description: "Consultar las fichas de costo (recetas).",
    module: "costos",
  },
  {
    code: "costs.recipes.manage",
    label: "Gestionar recetas de costo",
    description: "Crear y editar fichas de costo.",
    module: "costos",
  },
  {
    code: "costs.reports.view",
    label: "Ver reportes de costos",
    description: "Ver reportes de costo por producto.",
    module: "costos",
  },
];

/**
 * Matriz por defecto: qué permisos trae cada rol de base.
 * (denegar por defecto → si no está en la lista, queda bloqueado).
 * Estos valores son la configuración inicial recomendada; el Propietario
 * puede ajustar permisos individuales por usuario.
 */
export const DEFAULT_ROLE_PERMISSIONS: Record<RoleCode, PermissionCode[]> = {
  owner: PERMISSION_CATALOG.map((p) => p.code), // acceso total
  admin: [
    "portal.view",
    "company.view",
    "modules.view",
    "support.view",
    "users.view",
    "tasks.view_team",
    "tasks.create_own",
    "tasks.create_team",
    "tasks.manage",
    "meetings.view_team",
    "meetings.create",
    "meetings.manage",
    "calendar.view_team",
    "announcements.view",
    "announcements.manage",
    "assistant.use",
    "employees.view",
    "employees.manage",
    "requests.create",
    "requests.view_team",
    "requests.manage",
    "presence.self",
    "presence.view_team",
    "documents.view_team",
    "documents.manage",
  ],
  user: [
    "portal.view",
    "company.view",
    "modules.view",
    "support.view",
    "tasks.view_own",
    "tasks.create_own",
    "meetings.view_own",
    "calendar.view_own",
    "announcements.view",
    "assistant.use",
    "requests.create",
    "requests.view_own",
    "presence.self",
    "documents.view_own",
  ],
};

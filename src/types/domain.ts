/**
 * Tipos de dominio de Nivo.
 * Modela módulos, roles, permisos (RBAC), empresas, usuarios y solicitudes.
 * Estos tipos son la "forma" que tendrán los datos cuando se conecte Supabase,
 * de modo que la capa de datos simulada (mocks) y la real compartan contrato.
 */

// ── Módulos ───────────────────────────────────────────────
export type ModuleId =
  "rrhh" | "productividad" | "contabilidad" | "inventarios" | "costos";

export type ModuleStatus = "Disponible" | "Próximamente";

/** Estado de un módulo para una empresa concreta. */
export type CompanyModuleStatus =
  "activo" | "en_prueba" | "suspendido" | "pendiente" | "no_contratado";

export type AccentColor = "primary" | "accent" | "amber" | "purple" | "rose";

export interface ModuleDefinition {
  id: ModuleId;
  /** slug para la URL pública: /servicios/:slug */
  slug: string;
  name: string;
  code: string;
  category: string;
  status: ModuleStatus;
  color: AccentColor;
  /** nombre del ícono lucide-react */
  icon: string;
  shortDesc: string;
  longDesc: string;
  monthlyPrice: number;
  features: string[];
  useCases: string[];
  targetRoles: string[];
  integrations: string[];
}

// ── Roles y permisos (RBAC) ──────────────────────────────
export type RoleCode = "owner" | "admin" | "user";

export interface RoleDefinition {
  code: RoleCode;
  label: string; // etiqueta amigable en la interfaz
  audience: string;
  scope: string;
}

/**
 * Códigos de permiso estables (los mismos que usará Supabase RLS).
 * La interfaz muestra nombres amigables desde PERMISSION_CATALOG.
 */
export type PermissionCode = string;

export interface PermissionDefinition {
  code: PermissionCode;
  label: string;
  description: string;
  module: ModuleId | "core";
}

// ── Empresa y usuarios ───────────────────────────────────
export interface CompanyModuleState {
  id: ModuleId;
  name: string;
  status: CompanyModuleStatus;
  activatedAt?: string;
  billingPeriod?: BillingPeriod;
  // métricas de ejemplo para el dashboard
  metrics?: { label: string; value: string; highlight?: boolean }[];
}

export interface Company {
  id: string;
  name: string; // razón social
  commercialName: string;
  nit: string;
  city: string;
  plan: string;
  billingCycleLabel: string;
  storageUsed: string;
  usersCount: number;
  modules: CompanyModuleState[];
}

export type UserStatus = "Activo" | "Invitado" | "Suspendido";

export interface CompanyUser {
  id: string;
  name: string;
  email: string;
  role: RoleCode;
  /** etiqueta operativa opcional que se muestra en la interfaz */
  roleLabel?: string;
  status: UserStatus;
  lastLogin: string;
  /** permisos individuales concedidos (códigos) */
  permissions: PermissionCode[];
}

export interface SessionUser {
  name: string;
  email: string;
  role: RoleCode;
  roleLabel: string;
  companyName: string;
}

// ── Facturación / cotización ─────────────────────────────
export type BillingPeriod = "mensual" | "trimestral" | "anual";

export interface PricingResult {
  selectedModules: ModuleDefinition[];
  period: BillingPeriod;
  baseMonthlyTotal: number;
  discountPercent: number;
  monthsMultiplier: number;
  subtotal: number;
  iva: number;
  total: number;
}

// ── Solicitudes (panel interno) ──────────────────────────
export type ApplicationStatus =
  | "borrador"
  | "enviada"
  | "pago_pendiente"
  | "pago_recibido"
  | "en_revision"
  | "requiere_correccion"
  | "aprobada"
  | "rechazada"
  | "cuenta_creada"
  | "activa";

export interface ApplicationHistoryEntry {
  time: string;
  action: string;
}

export interface ApplicationDocument {
  name: string;
  label: string;
  status: "pendiente" | "cargado" | "aprobado" | "requiere_correccion";
}

export interface Application {
  id: string;
  submittedAt: string;
  companyName: string;
  commercialName: string;
  nit: string;
  city: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  modules: string[];
  period: string;
  totalCop: number;
  paymentStatus: string;
  paymentGateway: string;
  status: ApplicationStatus;
  documents: ApplicationDocument[];
  history: ApplicationHistoryEntry[];
}

// ── Formulario de contratación ───────────────────────────
export interface CheckoutForm {
  responsible: {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    phone: string;
  };
  company: {
    businessName: string;
    commercialName: string;
    nit: string;
    size: string;
    city: string;
    address: string;
  };
  payment: {
    method: "card" | "pse" | "nequi" | "wallet";
    pseBank: string;
  };
}

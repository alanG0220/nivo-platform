/**
 * Datos simulados de Nivo (Fase 1).
 * Realistas pero claramente ficticios. Empresa de ejemplo: "Café Aroma".
 * Cuando se conecte Supabase, estos objetos se reemplazan por consultas
 * reales que devuelven la misma forma (ver src/types/domain.ts).
 */
import type {
  Application,
  Company,
  CompanyUser,
  SessionUser,
} from "@/types/domain";
import { DEFAULT_ROLE_PERMISSIONS } from "./rbac";

// ── Empresa de ejemplo en el portal privado ──────────────
export const MOCK_COMPANY: Company = {
  id: "CMP-001",
  name: "Café & Aroma Especiales S.A.S.",
  commercialName: "Café Aroma",
  nit: "901.482.930-4",
  city: "Bogotá D.C.",
  plan: "Plan Modular Pro",
  billingCycleLabel: "Mensual · Renovación 3 de noviembre de 2026",
  storageUsed: "4.2 GB de 20 GB",
  usersCount: 24,
  modules: [
    {
      id: "rrhh",
      name: "RRHH · Flow Desk",
      status: "activo",
      activatedAt: "25/09/2026",
      billingPeriod: "mensual",
      metrics: [
        { label: "Colaboradores", value: "24" },
        { label: "Solicitudes por aprobar", value: "2", highlight: true },
      ],
    },
    {
      id: "productividad",
      name: "Productividad",
      status: "activo",
      activatedAt: "25/09/2026",
      billingPeriod: "mensual",
      metrics: [
        { label: "Tareas en curso", value: "18" },
        { label: "Reuniones esta semana", value: "3" },
      ],
    },
    { id: "contabilidad", name: "Contabilidad", status: "no_contratado" },
    { id: "inventarios", name: "Inventarios", status: "no_contratado" },
    { id: "costos", name: "Costos", status: "no_contratado" },
  ],
};

// ── Usuarios de la empresa (RBAC) ────────────────────────
export const MOCK_COMPANY_USERS: CompanyUser[] = [
  {
    id: "U-1",
    name: "Alejandra Gómez Restrepo",
    email: "alejandra.gomez@cafearoma.com.co",
    role: "owner",
    roleLabel: "Propietaria",
    status: "Activo",
    lastLogin: "Hoy, 09:12 a. m.",
    permissions: DEFAULT_ROLE_PERMISSIONS.owner,
  },
  {
    id: "U-2",
    name: "Diana Marcela Castro",
    email: "diana.castro@cafearoma.com.co",
    role: "admin",
    roleLabel: "Administradora · RRHH",
    status: "Activo",
    lastLogin: "Ayer, 04:30 p. m.",
    permissions: DEFAULT_ROLE_PERMISSIONS.admin,
  },
  {
    id: "U-3",
    name: "Carlos Morales Duque",
    email: "carlos.morales@cafearoma.com.co",
    role: "admin",
    roleLabel: "Administrador · Productividad",
    status: "Activo",
    lastLogin: "16 sep 2026",
    permissions: DEFAULT_ROLE_PERMISSIONS.admin,
  },
  {
    id: "U-4",
    name: "Felipe Henao Salazar",
    email: "felipe.henao@cafearoma.com.co",
    role: "user",
    roleLabel: "Colaborador",
    status: "Activo",
    lastLogin: "18 sep 2026",
    permissions: DEFAULT_ROLE_PERMISSIONS.user,
  },
  {
    id: "U-5",
    name: "Valentina Ríos Gómez",
    email: "valentina.rios@cafearoma.com.co",
    role: "user",
    roleLabel: "Colaboradora",
    status: "Invitado",
    lastLogin: "Sin ingresos",
    permissions: DEFAULT_ROLE_PERMISSIONS.user,
  },
];

// ── Sesión activa (demo) ─────────────────────────────────
export const DEMO_SESSIONS: Record<"owner" | "admin" | "user", SessionUser> = {
  owner: {
    name: "Alejandra Gómez Restrepo",
    email: "alejandra.gomez@cafearoma.com.co",
    role: "owner",
    roleLabel: "Propietaria",
    companyName: MOCK_COMPANY.name,
  },
  admin: {
    name: "Diana Marcela Castro",
    email: "diana.castro@cafearoma.com.co",
    role: "admin",
    roleLabel: "Administradora",
    companyName: MOCK_COMPANY.name,
  },
  user: {
    name: "Felipe Henao Salazar",
    email: "felipe.henao@cafearoma.com.co",
    role: "user",
    roleLabel: "Colaborador",
    companyName: MOCK_COMPANY.name,
  },
};

// ── Solicitudes (panel interno de Nivo) ──────────────────
export const MOCK_APPLICATIONS: Application[] = [
  {
    id: "NIVO-2026-8942",
    submittedAt: "25/09/2026 10:30 a. m.",
    companyName: "Café & Aroma Especiales S.A.S.",
    commercialName: "Café Aroma",
    nit: "901.482.930-4",
    city: "Bogotá D.C.",
    contactName: "Alejandra Gómez Restrepo",
    contactEmail: "alejandra.gomez@cafearoma.com.co",
    contactPhone: "+57 312 458 9021",
    modules: ["RRHH · Flow Desk", "Productividad"],
    period: "Mensual",
    totalCop: 176120,
    paymentStatus: "Pago recibido",
    paymentGateway: "Wompi (Tarjeta de crédito)",
    status: "pago_recibido",
    documents: [
      {
        name: "RUT_Actualizado_2026.pdf",
        label: "RUT actualizado",
        status: "cargado",
      },
      {
        name: "CamaraComercio_Sept2026.pdf",
        label: "Cámara de Comercio",
        status: "cargado",
      },
      {
        name: "Cedula_RepresentanteLegal.pdf",
        label: "Documento representante legal",
        status: "cargado",
      },
    ],
    history: [
      {
        time: "10:30 a. m.",
        action: "Solicitud enviada por el cliente desde la web.",
      },
      { time: "10:32 a. m.", action: "Pago confirmado por Wompi." },
      {
        time: "10:35 a. m.",
        action: "Asignada a la cola de revisión documental.",
      },
    ],
  },
  {
    id: "NIVO-2026-8939",
    submittedAt: "24/09/2026 04:15 p. m.",
    companyName: "Logística & Envíos del Caribe S.A.S.",
    commercialName: "Caribe Express",
    nit: "800.231.849-1",
    city: "Barranquilla",
    contactName: "Carlos Mario Pineda",
    contactEmail: "carlos.pineda@caribeexpress.co",
    contactPhone: "+57 300 892 1144",
    modules: ["RRHH · Flow Desk"],
    period: "Anual",
    totalCop: 1017120,
    paymentStatus: "Pago recibido",
    paymentGateway: "Wompi (PSE Bancolombia)",
    status: "en_revision",
    documents: [
      { name: "RUT.pdf", label: "RUT actualizado", status: "cargado" },
      { name: "Camara.pdf", label: "Cámara de Comercio", status: "cargado" },
      {
        name: "Cedula.pdf",
        label: "Documento representante legal",
        status: "cargado",
      },
    ],
    history: [
      {
        time: "24 sep · 04:15 p. m.",
        action: "Solicitud radicada con pago anual.",
      },
      {
        time: "25 sep · 08:00 a. m.",
        action: "Se inició validación de Cámara de Comercio.",
      },
    ],
  },
  {
    id: "NIVO-2026-8931",
    submittedAt: "22/09/2026 09:05 a. m.",
    companyName: "Distribuidora Ferretera Andina Ltda.",
    commercialName: "FerreAndina",
    nit: "830.114.552-7",
    city: "Medellín",
    contactName: "Sandra Milena Ospina",
    contactEmail: "sandra.ospina@ferreandina.co",
    contactPhone: "+57 315 774 2030",
    modules: ["Inventarios", "Costos"],
    period: "Trimestral",
    totalCop: 475524,
    paymentStatus: "Pago pendiente",
    paymentGateway: "Wompi (PSE)",
    status: "requiere_correccion",
    documents: [
      {
        name: "RUT.pdf",
        label: "RUT actualizado",
        status: "requiere_correccion",
      },
      { name: "Camara.pdf", label: "Cámara de Comercio", status: "cargado" },
      { name: "", label: "Documento representante legal", status: "pendiente" },
    ],
    history: [
      {
        time: "22 sep · 09:05 a. m.",
        action: "Solicitud enviada por el cliente.",
      },
      {
        time: "22 sep · 02:40 p. m.",
        action: "Se solicitó corrección: el RUT está desactualizado.",
      },
    ],
  },
  {
    id: "NIVO-2026-8920",
    submittedAt: "16/09/2026 02:20 p. m.",
    companyName: "Consultoría Estratégica Andina Ltda.",
    commercialName: "Andina Consultores",
    nit: "900.582.110-3",
    city: "Cali",
    contactName: "Mateo Restrepo Velásquez",
    contactEmail: "mateo@andinaconsultores.com",
    contactPhone: "+57 310 443 9988",
    modules: ["Productividad"],
    period: "Trimestral",
    totalCop: 189567,
    paymentStatus: "Pago recibido",
    paymentGateway: "Wompi (Tarjeta débito)",
    status: "activa",
    documents: [
      { name: "RUT.pdf", label: "RUT actualizado", status: "aprobado" },
      { name: "Camara.pdf", label: "Cámara de Comercio", status: "aprobado" },
      {
        name: "Cedula.pdf",
        label: "Documento representante legal",
        status: "aprobado",
      },
    ],
    history: [
      { time: "16 sep", action: "Solicitud recibida y validada." },
      {
        time: "17 sep",
        action: "Cuenta de empresa creada y credenciales enviadas.",
      },
    ],
  },
];

// ── Estados de solicitud (etiquetas y colores) ───────────
export const APPLICATION_STATUS_META: Record<
  Application["status"],
  { label: string; tone: "ok" | "warn" | "danger" | "info" | "neutral" }
> = {
  borrador: { label: "Borrador", tone: "neutral" },
  enviada: { label: "Enviada", tone: "info" },
  pago_pendiente: { label: "Pago pendiente", tone: "warn" },
  pago_recibido: {
    label: "Pago recibido — Validación pendiente",
    tone: "warn",
  },
  en_revision: { label: "En revisión", tone: "info" },
  requiere_correccion: { label: "Requiere corrección", tone: "danger" },
  aprobada: { label: "Aprobada", tone: "ok" },
  rechazada: { label: "Rechazada", tone: "danger" },
  cuenta_creada: { label: "Cuenta creada", tone: "ok" },
  activa: { label: "Activa", tone: "ok" },
};

// ── Datos operativos de ejemplo (RRHH) ───────────────────
export const MOCK_EMPLOYEES = [
  {
    id: "EMP-01",
    name: "Laura Camila Osorio",
    position: "Directora de Calidad",
    department: "Operaciones",
    contract: "Indefinido",
    entryDate: "15/01/2024",
  },
  {
    id: "EMP-02",
    name: "Andrés Felipe Mejía",
    position: "Coordinador de Producción",
    department: "Producción",
    contract: "Indefinido",
    entryDate: "01/06/2024",
  },
  {
    id: "EMP-03",
    name: "Valentina Ríos Gómez",
    position: "Líder de Tiendas",
    department: "Comercial",
    contract: "Indefinido",
    entryDate: "10/03/2025",
  },
  {
    id: "EMP-04",
    name: "Santiago Vélez Castro",
    position: "Auxiliar de Logística",
    department: "Bodega",
    contract: "Fijo 1 año",
    entryDate: "01/08/2025",
  },
];

export const MOCK_ABSENCES = [
  {
    id: "SOL-104",
    employee: "Laura Camila Osorio",
    type: "Vacaciones (5 días hábiles)",
    dates: "24 sep - 30 sep 2026",
    status: "Pendiente" as const,
  },
  {
    id: "SOL-103",
    employee: "Santiago Vélez Castro",
    type: "Calamidad doméstica",
    dates: "12 sep 2026",
    status: "Aprobada" as const,
  },
];

// ── Datos operativos de ejemplo (Productividad) ──────────
export const MOCK_TASKS = [
  {
    id: "TSK-201",
    title: "Auditoría de empaques para nueva cosecha",
    column: "En progreso" as const,
    assignee: "Laura Camila Osorio",
    priority: "Alta" as const,
    deadline: "22 sep 2026",
  },
  {
    id: "TSK-202",
    title: "Renovación de póliza de responsabilidad civil",
    column: "Por hacer" as const,
    assignee: "Alejandra Gómez",
    priority: "Media" as const,
    deadline: "28 sep 2026",
  },
  {
    id: "TSK-203",
    title: "Comité de lanzamiento tienda norte",
    column: "Completado" as const,
    assignee: "Valentina Ríos",
    priority: "Urgente" as const,
    deadline: "15 sep 2026",
  },
];

// ── Datos operativos de ejemplo (Inventarios) ────────────
export const MOCK_WAREHOUSES = [
  "Bodega Central",
  "Punto de Venta Norte",
  "Punto de Venta Sur",
];

export const MOCK_STOCK = [
  {
    sku: "INS-001",
    name: "Arroz Diana (kg)",
    warehouse: "Bodega Central",
    stock: 48,
    min: 30,
    unitCost: 3800,
    status: "ok" as const,
  },
  {
    sku: "INS-002",
    name: "Aceite vegetal (L)",
    warehouse: "Bodega Central",
    stock: 12,
    min: 15,
    unitCost: 9200,
    status: "bajo" as const,
  },
  {
    sku: "INS-003",
    name: "Carne de cerdo (kg)",
    warehouse: "Bodega Central",
    stock: 22,
    min: 10,
    unitCost: 18500,
    status: "ok" as const,
  },
  {
    sku: "INS-004",
    name: "Carne de res (kg)",
    warehouse: "Bodega Central",
    stock: 6,
    min: 10,
    unitCost: 24000,
    status: "critico" as const,
  },
  {
    sku: "INS-005",
    name: "Sal refinada (kg)",
    warehouse: "Bodega Central",
    stock: 40,
    min: 8,
    unitCost: 1500,
    status: "ok" as const,
  },
];

// facturas capturadas por IA (demostración)
export const MOCK_INVOICE_CAPTURES = [
  {
    id: "FAC-1042",
    file: "factura_venta_1042.jpg",
    product: "Arroz chino",
    qty: 3,
    status: "procesada" as const,
    discounted: "Arroz 600 g · Aceite 30 ml · Cerdo 300 g",
  },
  {
    id: "FAC-1043",
    file: "factura_venta_1043.jpg",
    product: "Bandeja mixta",
    qty: 1,
    status: "procesando" as const,
    discounted: "En análisis por IA…",
  },
];

// ── Datos operativos de ejemplo (Costos — recetas) ───────
export interface RecipeIngredient {
  sku: string;
  name: string;
  qty: number;
  unit: string;
  unitCostPerBase: number; // costo por unidad base (p. ej. por gramo o ml)
}

export interface CostRecipe {
  id: string;
  product: string;
  margin: number; // margen objetivo (0-1)
  ingredients: RecipeIngredient[];
}

export const MOCK_RECIPES: CostRecipe[] = [
  {
    id: "REC-01",
    product: "Arroz chino",
    margin: 0.55,
    ingredients: [
      {
        sku: "INS-001",
        name: "Arroz",
        qty: 200,
        unit: "g",
        unitCostPerBase: 3.8,
      },
      {
        sku: "INS-002",
        name: "Aceite",
        qty: 10,
        unit: "ml",
        unitCostPerBase: 9.2,
      },
      { sku: "INS-005", name: "Sal", qty: 5, unit: "g", unitCostPerBase: 1.5 },
      {
        sku: "INS-003",
        name: "Cerdo",
        qty: 100,
        unit: "g",
        unitCostPerBase: 18.5,
      },
      {
        sku: "INS-004",
        name: "Res",
        qty: 100,
        unit: "g",
        unitCostPerBase: 24.0,
      },
    ],
  },
];

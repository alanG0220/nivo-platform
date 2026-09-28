/**
 * Catálogo de módulos de Nivo.
 * Contenido de marketing y precios de ejemplo (COP). Cada módulo tiene su
 * propio slug para la URL pública (/servicios/:slug).
 */
import type { ModuleDefinition, ModuleId } from "@/types/domain";

export const MODULES: ModuleDefinition[] = [
  {
    id: "rrhh",
    slug: "rrhh",
    name: "RRHH · Flow Desk",
    code: "MOD-01",
    category: "Talento & Gestión",
    status: "Disponible",
    color: "accent",
    icon: "Users",
    shortDesc:
      "Gestión integral de colaboradores, novedades, ausencias, presencia y documentos laborales.",
    longDesc:
      "Flow Desk centraliza el ciclo de vida del colaborador: desde la custodia digital de documentos contractuales hasta la aprobación de vacaciones, incapacidades y novedades. Ordena la operación de gestión humana sin cadenas interminables de correos.",
    monthlyPrice: 89000,
    features: [
      "Gestión de empleados y expedientes laborales",
      "Radicación y aprobación de solicitudes laborales",
      "Novedades y ausencias con flujo de aprobación",
      "Control de presencia y turnos",
      "Custodia digital de documentos laborales",
    ],
    useCases: [
      "Automatizar solicitudes de vacaciones y permisos sin correos dispersos.",
      "Consolidar novedades antes de cada corte de nómina.",
      "Mantener al día la documentación laboral exigida.",
    ],
    targetRoles: [
      "Líderes de Gestión Humana",
      "Gerentes de Operaciones",
      "Jefes de Nómina",
    ],
    integrations: [
      "Módulo de Productividad",
      "Notificaciones por correo y WhatsApp",
      "Exportación a Excel",
    ],
  },
  {
    id: "productividad",
    slug: "productividad",
    name: "Productividad",
    code: "MOD-02",
    category: "Operación & Equipos",
    status: "Disponible",
    color: "primary",
    icon: "CheckSquare",
    shortDesc:
      "Tareas colaborativas, reuniones con actas, calendario corporativo, anuncios y asistente guiado.",
    longDesc:
      "Alinea el trabajo diario de tus equipos sin dispersión de herramientas. Asigna responsables, programa reuniones con actas y compromisos, y comunica de forma oficial a toda la organización.",
    monthlyPrice: 59000,
    features: [
      "Tableros de tareas con asignación por rol",
      "Reuniones con actas y compromisos",
      "Calendario empresarial unificado",
      "Anuncios y circulares con acuse de recibo",
      "Asistente guiado de flujos y recordatorios",
    ],
    useCases: [
      "Seguimiento semanal de proyectos y entregables por área.",
      "Documentación de comités y seguimiento de acuerdos.",
      "Comunicación oficial a todos los colaboradores en un canal.",
    ],
    targetRoles: ["Directores de Proyecto", "Líderes de Área", "Coordinadores"],
    integrations: [
      "Sincronización de calendario",
      "Notificaciones por correo",
      "Módulo RRHH",
    ],
  },
  {
    id: "contabilidad",
    slug: "contabilidad",
    name: "Contabilidad",
    code: "MOD-03",
    category: "Finanzas & Cumplimiento",
    status: "Próximamente",
    color: "amber",
    icon: "BookOpen",
    shortDesc:
      "Causación contable, libros oficiales, reportes y paquete de exportación para tu contador.",
    longDesc:
      "Registra compras, gastos y causaciones de forma ágil y emite balances y libros. Diseñado con el rigor contable colombiano y preparado para la conexión con facturación electrónica DIAN (en hoja de ruta).",
    monthlyPrice: 119000,
    features: [
      "Causación de facturas de compra y gastos",
      "Estados financieros y libros oficiales",
      "Reportes listos para revisión del contador",
      "Cálculo preliminar de retenciones e impuestos",
      "Exportación estructurada de información",
    ],
    useCases: [
      "Cerrar el mes contable en horas, no en semanas.",
      "Evitar doble digitación entre administración y contador externo.",
      "Cumplir a tiempo con requerimientos de entes de control.",
    ],
    targetRoles: [
      "Contadores Públicos",
      "Directores Financieros",
      "Auxiliares Contables",
    ],
    integrations: [
      "Facturación electrónica DIAN (hoja de ruta)",
      "Módulo de Inventarios",
      "Módulo de Costos",
    ],
  },
  {
    id: "inventarios",
    slug: "inventarios",
    name: "Inventarios",
    code: "MOD-04",
    category: "Logística & Stock",
    status: "Próximamente",
    color: "purple",
    icon: "Boxes",
    shortDesc:
      "Control de existencias multibodega, alertas de stock mínimo, movimientos y captura de facturas con IA.",
    longDesc:
      "Controla el flujo de mercancías e insumos en tiempo real por bodega. Registra entradas, salidas y traslados, y recibe alertas configurables de stock mínimo. Con captura de facturas por IA: el usuario sube la foto de una factura y, gracias a la conexión con el módulo de Costos, se descuentan automáticamente los insumos del inventario.",
    monthlyPrice: 79000,
    features: [
      "Control de existencias en tiempo real",
      "Múltiples bodegas y sucursales",
      "Alertas configurables de stock mínimo",
      "Movimientos y reportes de inventario",
      "Captura de facturas con IA y descuento automático de insumos",
    ],
    useCases: [
      "Evitar roturas de stock en productos de alta rotación.",
      "Descontar insumos automáticamente al registrar una venta por factura.",
      "Recibir alertas cuando un insumo baja del umbral configurado.",
    ],
    targetRoles: [
      "Jefes de Bodega y Logística",
      "Administradores de Punto de Venta",
      "Auxiliares",
    ],
    integrations: [
      "Módulo de Costos (recetas)",
      "Captura de facturas con IA",
      "Módulo de Contabilidad",
    ],
  },
  {
    id: "costos",
    slug: "costos",
    name: "Costos",
    code: "MOD-05",
    category: "Costeo & Producción",
    status: "Próximamente",
    color: "rose",
    icon: "Calculator",
    shortDesc:
      "Costeo de productos por receta: define insumos y cantidades y obtén el costo unitario y el precio mínimo de venta.",
    longDesc:
      "Costos permite armar la ficha (receta) de cada producto final indicando los insumos y sus cantidades. Con el costo de compra registrado en Inventarios, Nivo calcula por regla de tres el costo de cada insumo usado y el costo total del producto, sugiriendo un precio mínimo de venta. Está conectado con Inventarios: al vender un producto se descuentan sus insumos.",
    monthlyPrice: 69000,
    features: [
      "Fichas de costo (recetas) con múltiples insumos",
      "Cálculo automático del costo por insumo (regla de tres)",
      "Costo unitario y precio mínimo de venta sugerido",
      "Margen objetivo configurable por producto",
      "Conexión con Inventarios para descuento de insumos",
    ],
    useCases: [
      "Calcular cuánto cuesta producir cada producto final.",
      "Definir el precio mínimo de venta según el costo real.",
      "Enlazar el consumo de insumos con el inventario disponible.",
    ],
    targetRoles: [
      "Administradores",
      "Jefes de Producción",
      "Analistas de Costos",
    ],
    integrations: ["Módulo de Inventarios", "Módulo de Contabilidad"],
  },
];

export const MODULE_BY_ID: Record<ModuleId, ModuleDefinition> = MODULES.reduce(
  (acc, m) => {
    acc[m.id] = m;
    return acc;
  },
  {} as Record<ModuleId, ModuleDefinition>,
);

export function getModuleBySlug(slug: string): ModuleDefinition | undefined {
  return MODULES.find((m) => m.slug === slug);
}

/**
 * Configuración central de marca de Nivo.
 * Todo el nombre, contacto y textos institucionales viven aquí para que
 * renombrar o ajustar la identidad sea una sola edición.
 */
export const brand = {
  name: "Nivo",
  tagline: "Plataforma empresarial modular",
  legalName: "Nivo Plataforma S.A.S.",
  parentEcosystem: "Ecosistema tecnológico Nivo",
  foundedYearsCopy:
    "Más de 6 años de experiencia en procesos administrativos y de inventarios.",

  contact: {
    phone: "311 280 2379",
    phoneE164: "+573112802379",
    whatsapp: "https://wa.me/573112802379",
    email: "hola@nivo.com.co",
    salesEmail: "ventas@nivo.com.co",
    supportEmail: "soporte@nivo.com.co",
    addressCity: "Bogotá D.C., Colombia",
  },

  // Descuentos por periodo de facturación (demostración)
  billing: {
    trimestralDiscount: 0.1, // 10%
    anualDiscount: 0.2, // 20%
    ivaRate: 0.19, // IVA Colombia
    trialDays: 8, // 8 días de prueba
  },

  legal: {
    dataLaw: "Ley Estatutaria 1581 de 2012 (Habeas Data)",
  },
} as const;

/** Formatea un valor numérico como pesos colombianos. */
export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Cálculo de cotización de módulos.
 * Aplica descuentos por periodo e IVA colombiano (valores de demostración
 * configurables en src/config/brand.ts). No hay cobros reales.
 */
import { brand } from "@/config/brand";
import { MODULES } from "@/data/modules";
import type { BillingPeriod, ModuleId, PricingResult } from "@/types/domain";

export function calculatePricing(
  selectedIds: ModuleId[],
  period: BillingPeriod,
): PricingResult {
  const selectedModules = MODULES.filter((m) => selectedIds.includes(m.id));
  const baseMonthlyTotal = selectedModules.reduce(
    (acc, m) => acc + m.monthlyPrice,
    0,
  );

  let discountPercent = 0;
  let monthsMultiplier = 1;
  if (period === "trimestral") {
    discountPercent = brand.billing.trimestralDiscount;
    monthsMultiplier = 3;
  } else if (period === "anual") {
    discountPercent = brand.billing.anualDiscount;
    monthsMultiplier = 12;
  }

  const subtotal = Math.round(
    baseMonthlyTotal * (1 - discountPercent) * monthsMultiplier,
  );
  const iva = Math.round(subtotal * brand.billing.ivaRate);
  const total = subtotal + iva;

  return {
    selectedModules,
    period,
    baseMonthlyTotal,
    discountPercent: discountPercent * 100,
    monthsMultiplier,
    subtotal,
    iva,
    total,
  };
}

import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHead } from "@/components/ui/misc";
import { ModuleIcon } from "@/components/ui/ModuleIcon";
import { MODULES } from "@/data/modules";
import { formatCOP, brand } from "@/config/brand";
import { calculatePricing } from "@/services/pricing";
import { useApp } from "@/store/AppStore";
import type { BillingPeriod } from "@/types/domain";
import clsx from "clsx";

const PERIODS: { id: BillingPeriod; label: string; note?: string }[] = [
  { id: "mensual", label: "Mensual" },
  { id: "trimestral", label: "Trimestral", note: "-10%" },
  { id: "anual", label: "Anual", note: "-20%" },
];

function perModulePrice(base: number, period: BillingPeriod): number {
  if (period === "trimestral")
    return Math.round(base * (1 - brand.billing.trimestralDiscount));
  if (period === "anual")
    return Math.round(base * (1 - brand.billing.anualDiscount));
  return base;
}

export function PricingPage() {
  const { selectedModules, toggleModule, billingPeriod, setBillingPeriod } =
    useApp();
  const calc = calculatePricing(selectedModules, billingPeriod);

  const periodHint =
    billingPeriod === "anual"
      ? "🎉 Ahorras cerca de 2,4 meses al año pagando anual"
      : billingPeriod === "trimestral"
        ? "⚡ 10% de descuento sobre la tarifa base mensual"
        : "Facturación mes a mes, sin permanencia";

  return (
    <div className="animate-fadeIn nivo-container py-16 lg:py-20">
      <SectionHead
        tag="Calculadora y precios"
        title="Arma tu plataforma modular a la medida"
        subtitle="Selecciona los módulos que tu negocio necesita hoy, ajusta el periodo de facturación y obtén descuentos automáticos. Precios de ejemplo en COP."
      />

      {/* Selector de periodo */}
      <div className="mb-2 flex justify-center">
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 dark:border-night-border dark:bg-night-800">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              onClick={() => setBillingPeriod(p.id)}
              className={clsx(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                billingPeriod === p.id
                  ? "bg-primary-500 text-white"
                  : "text-ink-soft dark:text-slate-300",
              )}
            >
              {p.label}
              {p.note && (
                <span
                  className={clsx(
                    "rounded-full px-1.5 py-0.5 text-[0.65rem]",
                    billingPeriod === p.id
                      ? "bg-white/20"
                      : "bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300",
                  )}
                >
                  {p.note}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <p className="mb-10 text-center text-sm text-ink-soft dark:text-slate-400">
        {periodHint}
      </p>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Módulos seleccionables */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
          {MODULES.map((mod) => {
            const selected = selectedModules.includes(mod.id);
            return (
              <button
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                className={clsx(
                  "flex flex-col rounded-lg border p-5 text-left transition-all",
                  selected
                    ? "border-primary-400 bg-primary-50/50 ring-1 ring-primary-200 dark:border-primary-500 dark:bg-primary-500/10 dark:ring-primary-500/30"
                    : "border-slate-200 bg-white hover:border-slate-300 dark:border-night-border dark:bg-night-800",
                )}
              >
                <div className="mb-3 flex items-start justify-between">
                  <ModuleIcon icon={mod.icon} color={mod.color} />
                  <Badge tone={mod.status === "Disponible" ? "ok" : "warn"}>
                    {mod.status}
                  </Badge>
                </div>
                <h3 className="font-heading font-bold text-ink dark:text-white">
                  {mod.name}
                </h3>
                <p className="mt-1 text-sm text-ink-soft dark:text-slate-400">
                  {mod.shortDesc}
                </p>
                <div className="mt-3 font-heading text-xl font-extrabold text-ink dark:text-white">
                  {formatCOP(perModulePrice(mod.monthlyPrice, billingPeriod))}
                  <span className="text-sm font-medium text-ink-faint">
                    {" "}
                    / mes
                  </span>
                </div>
                <ul className="mt-3 flex-1 space-y-1.5">
                  {mod.features.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-ink-soft dark:text-slate-400"
                    >
                      <Check
                        size={13}
                        className="mt-0.5 shrink-0 text-accent-500"
                      />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
                <span
                  className={clsx(
                    "mt-4 inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold",
                    selected
                      ? "bg-primary-500 text-white"
                      : "bg-slate-100 text-ink-soft dark:bg-white/10 dark:text-slate-300",
                  )}
                >
                  {selected ? (
                    <>
                      <Check size={15} /> Módulo incluido
                    </>
                  ) : (
                    "+ Seleccionar módulo"
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Resumen fijo */}
        <div>
          <div className="sticky top-20 rounded-xl border border-slate-200 bg-white p-6 shadow-card dark:border-night-border dark:bg-night-800">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-ink dark:text-white">
                Resumen de selección
              </h3>
              <Badge tone="ok">{brand.billing.trialDays} días de prueba</Badge>
            </div>
            <p className="mb-4 text-sm text-ink-soft dark:text-slate-400">
              Plataforma configurada con facturación{" "}
              <strong className="uppercase">{billingPeriod}</strong>:
            </p>

            <div className="space-y-2 border-b border-slate-100 pb-4 dark:border-night-border">
              {calc.selectedModules.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-ink dark:text-slate-200">{m.name}</span>
                  <span className="font-medium text-ink dark:text-white">
                    {formatCOP(m.monthlyPrice)}
                  </span>
                </div>
              ))}
            </div>

            <dl className="space-y-2 py-4 text-sm">
              <Row
                label="Tarifa base mensual"
                value={formatCOP(calc.baseMonthlyTotal)}
              />
              {calc.discountPercent > 0 && (
                <Row
                  label={`Descuento periodo (${calc.discountPercent}%)`}
                  value={`- ${formatCOP(Math.round(calc.baseMonthlyTotal * calc.monthsMultiplier * (calc.discountPercent / 100)))}`}
                  accent
                />
              )}
              <Row
                label={`Subtotal (${calc.monthsMultiplier} ${calc.monthsMultiplier === 1 ? "mes" : "meses"})`}
                value={formatCOP(calc.subtotal)}
              />
              <Row label="IVA estimado (19%)" value={formatCOP(calc.iva)} />
            </dl>

            <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-night-border">
              <span className="font-heading font-bold text-ink dark:text-white">
                Total estimado
              </span>
              <span className="font-heading text-2xl font-extrabold text-primary-600 dark:text-primary-300">
                {formatCOP(calc.total)}
              </span>
            </div>
            <p className="mt-1 text-right text-xs text-ink-faint">
              Sin cobro hoy · {brand.billing.trialDays} días gratis
            </p>

            <LinkButton to="/contratacion" block size="lg" className="mt-5">
              Continuar a contratación
            </LinkButton>
            <LinkButton
              to="/contacto"
              variant="ghost"
              block
              size="sm"
              className="mt-2"
            >
              ¿Requieres un plan personalizado? Habla con ventas
            </LinkButton>

            <ul className="mt-5 space-y-2 text-xs text-ink-soft dark:text-slate-400">
              <li className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-accent-500" />{" "}
                Procesamiento seguro con Wompi
              </li>
              <li className="flex items-center gap-2">
                <Sparkles size={14} className="text-accent-500" />{" "}
                Acompañamiento e inducción incluidos
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-ink-soft dark:text-slate-400">{label}</dt>
      <dd
        className={clsx(
          "font-medium",
          accent
            ? "text-accent-600 dark:text-accent-400"
            : "text-ink dark:text-white",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

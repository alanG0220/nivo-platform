import { useState, type ReactNode } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Lock,
  ShieldCheck,
  FileText,
  IdCard,
  Building2,
  CreditCard,
  Landmark,
  Wallet,
  Info,
  Loader2,
} from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Field, Input, Select } from "@/components/ui/Field";
import { Logo } from "@/components/ui/Logo";
import { ModuleIcon } from "@/components/ui/ModuleIcon";
import { MODULES } from "@/data/modules";
import { formatCOP, brand } from "@/config/brand";
import { calculatePricing } from "@/services/pricing";
import { useApp } from "@/store/AppStore";
import clsx from "clsx";

const STEPS = [
  "Responsable",
  "Empresa",
  "Plan y módulos",
  "Documentos",
  "Pago",
];

const DOCS = [
  {
    icon: FileText,
    title: "Registro Único Tributario (RUT) actualizado",
    sub: "Documento vigente emitido por la DIAN.",
  },
  {
    icon: Building2,
    title: "Certificado de Existencia y Representación Legal",
    sub: "Cámara de Comercio con vigencia menor a 30 días.",
  },
  {
    icon: IdCard,
    title: "Documento del representante legal",
    sub: "Cédula de ciudadanía del representante legal.",
  },
];

const PSE_BANKS = [
  "Bancolombia",
  "Banco Davivienda",
  "Banco de Bogotá",
  "BBVA Colombia",
  "Banco de Occidente",
  "Nequi",
  "Daviplata",
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { selectedModules, toggleModule, billingPeriod, setBillingPeriod } =
    useApp();
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<"card" | "pse" | "nequi">("card");
  const [processing, setProcessing] = useState(false);

  const calc = calculatePricing(selectedModules, billingPeriod);

  const next = () => setStep((s) => Math.min(5, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = () => {
    setProcessing(true);
    setTimeout(() => navigate("/solicitud-recibida"), 1400);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-night-950">
      {/* Header minimal */}
      <header className="border-b border-slate-200 bg-white dark:border-night-border dark:bg-night-900">
        <div className="nivo-container flex h-16 items-center justify-between">
          <Logo />
          <Badge tone="ok" dot>
            Entorno seguro
          </Badge>
        </div>
      </header>

      <div className="nivo-container max-w-4xl py-10">
        {/* Stepper */}
        <div className="mb-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-night-border dark:bg-night-800">
          <ol className="flex items-center justify-between gap-1">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const done = step > n;
              const active = step === n;
              return (
                <li
                  key={label}
                  className="flex flex-1 flex-col items-center gap-1.5 text-center"
                >
                  <div
                    className={clsx(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                      done && "bg-accent-500 text-white",
                      active && "bg-primary-500 text-white",
                      !done &&
                        !active &&
                        "bg-slate-200 text-ink-soft dark:bg-night-700 dark:text-slate-400",
                    )}
                  >
                    {done ? <Check size={16} /> : n}
                  </div>
                  <span
                    className={clsx(
                      "text-[0.7rem] font-medium sm:text-xs",
                      active ? "text-ink dark:text-white" : "text-ink-faint",
                    )}
                  >
                    {n}. {label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card dark:border-night-border dark:bg-night-800 sm:p-8">
          {step === 1 && (
            <StepShell
              title="Datos del responsable de cuenta"
              desc="La persona autorizada que administrará la plataforma y recibirá las credenciales de acceso de la empresa."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre(s)" required>
                  <Input defaultValue="Alejandra" placeholder="Ej: Alejandra" />
                </Field>
                <Field label="Apellido(s)" required>
                  <Input
                    defaultValue="Gómez Restrepo"
                    placeholder="Ej: Gómez Restrepo"
                  />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Cargo en la empresa" required>
                  <Input
                    defaultValue="Gerente General"
                    placeholder="Ej: Gerente General"
                  />
                </Field>
                <Field
                  label="Correo empresarial"
                  required
                  hint="Aquí recibirás la confirmación de validación y las credenciales."
                >
                  <Input
                    type="email"
                    defaultValue="alejandra@cafearoma.com.co"
                    placeholder="nombre@tuempresa.com.co"
                  />
                </Field>
              </div>
              <Field label="Teléfono celular" required>
                <div className="flex gap-2">
                  <span className="inline-flex h-11 items-center rounded-md border border-slate-300 bg-slate-50 px-3 text-sm font-semibold dark:border-night-border dark:bg-night-900">
                    🇨🇴 +57
                  </span>
                  <Input
                    type="tel"
                    defaultValue="312 458 9021"
                    placeholder="300 123 4567"
                  />
                </div>
              </Field>
            </StepShell>
          )}

          {step === 2 && (
            <StepShell
              title="Información legal de la empresa"
              desc="Datos fiscales para la emisión de la factura y la validación jurídica ante Cámara de Comercio."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Razón social" required>
                  <Input defaultValue="Café & Aroma Especiales S.A.S." />
                </Field>
                <Field label="Nombre comercial" optional>
                  <Input defaultValue="Café Aroma" />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="NIT o identificación tributaria" required>
                  <Input defaultValue="901.482.930-4" />
                </Field>
                <Field label="Tamaño de empresa" required>
                  <Select defaultValue="11-50">
                    <option value="1-10">1 - 10 colaboradores</option>
                    <option value="11-50">11 - 50 colaboradores</option>
                    <option value="51-200">51 - 200 colaboradores</option>
                    <option value="200+">Más de 200 colaboradores</option>
                  </Select>
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Ciudad" required>
                  <Input defaultValue="Bogotá D.C." />
                </Field>
                <Field label="Dirección" required>
                  <Input defaultValue="Calle 93B # 13-45, Oficina 402" />
                </Field>
              </div>
            </StepShell>
          )}

          {step === 3 && (
            <StepShell
              title="Módulos seleccionados y plan"
              desc="Confirma los módulos iniciales que se habilitarán en tu portal privado."
            >
              <div className="mb-5 flex flex-wrap gap-2">
                {(["mensual", "trimestral", "anual"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setBillingPeriod(p)}
                    className={clsx(
                      "rounded-full px-4 py-2 text-sm font-semibold capitalize",
                      billingPeriod === p
                        ? "bg-primary-500 text-white"
                        : "bg-slate-100 text-ink-soft dark:bg-white/10 dark:text-slate-300",
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="space-y-2.5">
                {MODULES.map((mod) => {
                  const on = selectedModules.includes(mod.id);
                  return (
                    <button
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={clsx(
                        "flex w-full items-center justify-between gap-3 rounded-lg border p-4 text-left transition-colors",
                        on
                          ? "border-primary-400 bg-primary-50/50 dark:border-primary-500 dark:bg-primary-500/10"
                          : "border-slate-200 dark:border-night-border",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <ModuleIcon
                          icon={mod.icon}
                          color={mod.color}
                          boxSize={40}
                          size={20}
                        />
                        <div>
                          <p className="font-semibold text-ink dark:text-white">
                            {mod.name}
                          </p>
                          <p className="text-xs text-ink-faint">
                            {mod.shortDesc}
                          </p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="hidden font-semibold text-ink dark:text-white sm:inline">
                          {formatCOP(mod.monthlyPrice)}
                        </span>
                        <Badge tone={on ? "ok" : "neutral"}>
                          {on ? "✓ Incluido" : "+ Agregar"}
                        </Badge>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 flex items-center justify-between rounded-lg bg-slate-50 p-4 dark:bg-night-900">
                <div>
                  <p className="text-xs text-ink-faint">Periodo elegido</p>
                  <p className="font-heading font-bold uppercase text-ink dark:text-white">
                    {billingPeriod}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-faint">Total de la orden</p>
                  <p className="font-heading text-xl font-extrabold text-primary-600 dark:text-primary-300">
                    {formatCOP(calc.total)}
                  </p>
                </div>
              </div>
            </StepShell>
          )}

          {step === 4 && (
            <StepShell
              title="Documentación de la empresa"
              desc="Adjunta los soportes requeridos para la verificación de identidad corporativa. Los requisitos pueden variar según el tipo de empresa."
            >
              <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-primary-200 bg-primary-50 p-4 text-sm text-primary-700 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-200">
                <Info size={18} className="mt-0.5 shrink-0" />
                <span>
                  Tras la verificación de tu información y pago, recibirás la
                  confirmación de acceso por correo. El acceso puede habilitarse
                  a partir del siguiente día hábil.
                </span>
              </div>
              <div className="space-y-3">
                {DOCS.map((d, i) => (
                  <div
                    key={d.title}
                    className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-4 dark:border-night-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-ink-soft dark:bg-white/10">
                        <d.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink dark:text-white">
                          {d.title}
                        </p>
                        <p className="text-xs text-ink-faint">{d.sub}</p>
                      </div>
                    </div>
                    {i === 0 ? (
                      <Badge tone="ok">✓ Cargado</Badge>
                    ) : i === 1 ? (
                      <Badge tone="info">Cargado</Badge>
                    ) : (
                      <label className="cursor-pointer rounded-md border border-dashed border-slate-300 px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-slate-50 dark:border-night-border dark:hover:bg-white/5">
                        Subir archivo
                        <input type="file" className="hidden" />
                      </label>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-faint">
                Demostración: los archivos no se almacenan. Estados posibles:
                pendiente, cargado, aprobado o requiere corrección.
              </p>
            </StepShell>
          )}

          {step === 5 && (
            <StepShell
              title="Pago seguro"
              desc="Procesamiento integrado mediante Wompi, sin salir de esta página."
            >
              <div className="rounded-lg border border-slate-200 p-5 dark:border-night-border">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-heading font-bold text-ink dark:text-white">
                    Wompi Checkout
                  </span>
                  <Badge tone="ok" dot>
                    SSL
                  </Badge>
                </div>
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: "card", icon: CreditCard, label: "Tarjeta" },
                      { id: "pse", icon: Landmark, label: "PSE" },
                      { id: "nequi", icon: Wallet, label: "Nequi" },
                    ] as const
                  ).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={clsx(
                        "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-semibold",
                        method === m.id
                          ? "border-primary-400 bg-primary-50 text-primary-700 dark:border-primary-500 dark:bg-primary-500/10 dark:text-primary-200"
                          : "border-slate-200 text-ink-soft dark:border-night-border dark:text-slate-400",
                      )}
                    >
                      <m.icon size={20} /> {m.label}
                    </button>
                  ))}
                </div>

                {method === "card" && (
                  <div className="space-y-4">
                    <Field label="Número de tarjeta">
                      <Input
                        placeholder="0000 0000 0000 0000"
                        defaultValue="4242 4242 4242 4242"
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Vencimiento">
                        <Input placeholder="MM/AA" defaultValue="08/29" />
                      </Field>
                      <Field label="CVV">
                        <Input placeholder="123" defaultValue="123" />
                      </Field>
                    </div>
                  </div>
                )}
                {method === "pse" && (
                  <div className="space-y-4">
                    <Field label="Entidad bancaria (PSE)">
                      <Select>
                        {PSE_BANKS.map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Tipo de persona">
                      <Select>
                        <option>Persona jurídica (empresa)</option>
                        <option>Persona natural</option>
                      </Select>
                    </Field>
                  </div>
                )}
                {method === "nequi" && (
                  <div className="rounded-lg bg-slate-50 p-5 text-center text-sm text-ink-soft dark:bg-night-900 dark:text-slate-300">
                    Recibirás una notificación push en tu app Nequi para aprobar
                    el pago.
                  </div>
                )}

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-night-border">
                  <div>
                    <p className="text-xs text-ink-faint">Módulos</p>
                    <p className="text-sm font-semibold text-ink dark:text-white">
                      {calc.selectedModules.map((m) => m.name).join(" + ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-ink-faint">Total</p>
                    <p className="font-heading text-xl font-extrabold text-primary-600 dark:text-primary-300">
                      {formatCOP(calc.total)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-lg bg-accent-50 p-4 text-sm text-accent-700 dark:bg-accent-500/10 dark:text-accent-300">
                <ShieldCheck size={18} className="mt-0.5 shrink-0" />
                <span>
                  El procesamiento del pago se realizará de forma segura
                  mediante Wompi. Tus datos financieros están protegidos.
                </span>
              </div>
            </StepShell>
          )}

          {/* Navegación */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-night-border">
            {step > 1 ? (
              <Button variant="secondary" onClick={prev}>
                <ArrowLeft size={16} /> Anterior
              </Button>
            ) : (
              <LinkButton to="/planes" variant="ghost">
                Volver a planes
              </LinkButton>
            )}
            {step < 5 ? (
              <Button onClick={next}>
                Continuar <ArrowRight size={16} />
              </Button>
            ) : (
              <Button size="lg" onClick={submit} disabled={processing}>
                {processing ? (
                  <>
                    <Loader2 size={18} className="animate-spinSlow" />{" "}
                    Procesando con Wompi…
                  </>
                ) : (
                  <>
                    <Lock size={16} /> Pagar y enviar solicitud (
                    {formatCOP(calc.total)})
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-ink-faint">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/ingresar"
            className="font-semibold text-primary-600 hover:underline dark:text-primary-300"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

function StepShell({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <div className="animate-fadeIn">
      <h2 className="font-heading text-xl font-bold text-ink dark:text-white">
        {title}
      </h2>
      <p className="mt-1 mb-6 text-sm text-ink-soft dark:text-slate-400">
        {desc}
      </p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

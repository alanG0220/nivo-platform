import type { ReactNode } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Logo } from "@/components/ui/Logo";
import { formatCOP, brand } from "@/config/brand";
import { calculatePricing } from "@/services/pricing";
import { useApp } from "@/store/AppStore";

const NEXT_STEPS = [
  {
    title: "Validación jurídica",
    desc: "Revisamos la vigencia del RUT y del certificado de Cámara de Comercio adjuntos.",
    highlight: true,
  },
  {
    title: "Emisión de credenciales",
    desc: "Recibirás un enlace seguro para definir la contraseña del usuario Propietario.",
  },
  {
    title: "Inducción y capacitación",
    desc: "Un especialista te guiará para configurar los primeros colaboradores y tareas.",
  },
];

export function SuccessPage() {
  const { selectedModules, billingPeriod } = useApp();
  const calc = calculatePricing(selectedModules, billingPeriod);
  const appId = `NIVO-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-night-950">
      <header className="border-b border-slate-200 bg-white dark:border-night-border dark:bg-night-900">
        <div className="nivo-container flex h-16 items-center">
          <Logo />
        </div>
      </header>

      <div className="nivo-container max-w-2xl py-12">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-card dark:border-night-border dark:bg-night-800">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-50 text-accent-500 dark:bg-accent-500/15">
            <CheckCircle2 size={40} />
          </div>
          <Badge tone="ok">Radicado: {appId}</Badge>
          <h1 className="mt-4 font-heading text-2xl font-extrabold text-ink dark:text-white">
            Recibimos tu solicitud
          </h1>
          <p className="mx-auto mt-2 max-w-md text-ink-soft dark:text-slate-400">
            Tu pago fue confirmado por Wompi. Nuestro equipo inició la
            validación documental de tu empresa.
          </p>

          <div className="mt-6 space-y-2.5 rounded-lg bg-slate-50 p-5 text-left text-sm dark:bg-night-900">
            <Row
              label="Estado actual"
              value={
                <Badge tone="warn">Pago recibido — Validación pendiente</Badge>
              }
            />
            <Row
              label="Módulos solicitados"
              value={calc.selectedModules.map((m) => m.name).join(", ")}
            />
            <Row
              label="Correo del responsable"
              value="alejandra@cafearoma.com.co"
            />
            <Row
              label="Periodo"
              value={<span className="capitalize">{billingPeriod}</span>}
            />
            <Row
              label="Total abonado"
              value={
                <strong className="text-ink dark:text-white">
                  {formatCOP(calc.total)}
                </strong>
              }
            />
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-night-border dark:bg-night-800">
          <h3 className="mb-4 font-heading font-bold text-ink dark:text-white">
            ¿Qué sucederá a continuación?
          </h3>
          <ol className="space-y-4">
            {NEXT_STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${s.highlight ? "bg-accent-500 text-white" : "bg-slate-200 text-ink-soft dark:bg-night-700 dark:text-slate-400"}`}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink dark:text-white">
                    {s.title}
                  </p>
                  <p className="text-sm text-ink-soft dark:text-slate-400">
                    {s.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <LinkButton to="/" variant="secondary">
            Volver al inicio
          </LinkButton>
          <LinkButton to="/ingresar">Iniciar sesión</LinkButton>
          <LinkButton to="/app" variant="ghost">
            Probar portal privado (demo) <ArrowRight size={15} />
          </LinkButton>
        </div>
        <p className="mt-4 text-center text-xs text-ink-faint">
          El inicio de sesión solo funcionará cuando las credenciales hayan sido
          creadas y activadas. Puedes revisar esta solicitud en el{" "}
          <Link
            to="/nivo-ops"
            className="font-semibold text-primary-600 hover:underline dark:text-primary-300"
          >
            panel interno de {brand.name}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-ink-soft dark:text-slate-400">{label}</span>
      <span className="text-right text-ink dark:text-slate-200">{value}</span>
    </div>
  );
}

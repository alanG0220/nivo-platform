import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { Badge } from "@/components/ui/Badge";
import { Logo } from "@/components/ui/Logo";
import { brand } from "@/config/brand";
import { useApp } from "@/store/AppStore";
import type { RoleCode } from "@/types/domain";

const DEMO_ROLES: {
  role: RoleCode;
  label: string;
  badge: string;
  to: string;
}[] = [
  {
    role: "owner",
    label: "Entrar como Propietaria (Café Aroma)",
    badge: "Acceso total",
    to: "/app",
  },
  {
    role: "admin",
    label: "Entrar como Administrador",
    badge: "Operativo",
    to: "/app",
  },
  {
    role: "user",
    label: "Entrar como Usuario / Colaborador",
    badge: "Acceso mínimo",
    to: "/app",
  },
];

export function LoginPage() {
  const navigate = useNavigate();
  const { loginAs } = useApp();

  const enterAs = (role: RoleCode, to: string) => {
    loginAs(role);
    navigate(to);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Formulario */}
      <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Logo />
          <h1 className="mt-8 font-heading text-2xl font-extrabold text-ink dark:text-white">
            Iniciar sesión
          </h1>
          <p className="mt-1 text-sm text-ink-soft dark:text-slate-400">
            Ingresa tus credenciales autorizadas para acceder al portal privado
            de tu empresa.
          </p>

          <div className="mt-5 flex items-start gap-2 rounded-lg border border-primary-200 bg-primary-50 p-3.5 text-xs text-primary-700 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-200">
            <Info size={15} className="mt-0.5 shrink-0" />
            <span>
              ¿Tu solicitud está en validación? Recibirás el correo de
              activación cuando nuestro equipo apruebe los documentos.
            </span>
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              enterAs("owner", "/app");
            }}
          >
            <Field label="Correo empresarial">
              <Input type="email" placeholder="nombre@tuempresa.com.co" />
            </Field>
            <Field label="Contraseña">
              <Input type="password" placeholder="••••••••" />
            </Field>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-soft dark:text-slate-400">
                <input type="checkbox" className="rounded border-slate-300" />{" "}
                Recordar este equipo
              </label>
              <button
                type="button"
                className="font-semibold text-primary-600 hover:underline dark:text-primary-300"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <Button type="submit" block size="lg">
              Iniciar sesión <ArrowRight size={16} />
            </Button>
          </form>

          {/* Demo role switcher */}
          <div className="mt-8 rounded-lg border border-dashed border-slate-300 p-4 dark:border-night-border">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Probar roles en modo demostración
            </p>
            <div className="space-y-2">
              {DEMO_ROLES.map((d) => (
                <button
                  key={d.role}
                  onClick={() => enterAs(d.role, d.to)}
                  className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2.5 text-left text-sm hover:border-primary-300 dark:border-night-border dark:bg-night-800"
                >
                  <span className="font-medium text-ink dark:text-slate-200">
                    {d.label}
                  </span>
                  <Badge tone="info">{d.badge}</Badge>
                </button>
              ))}
              <Link
                to="/nivo-ops"
                className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2.5 text-left text-sm hover:border-warn-500 dark:border-night-border dark:bg-night-800"
              >
                <span className="font-medium text-ink dark:text-slate-200">
                  Entrar al panel interno de {brand.name}
                </span>
                <Badge tone="warn">Nivo Ops</Badge>
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-ink-soft dark:text-slate-400">
            ¿Aún no tienes cuenta?{" "}
            <Link
              to="/planes"
              className="font-semibold text-primary-600 hover:underline dark:text-primary-300"
            >
              Ver planes
            </Link>
            {" · "}
            <Link
              to="/"
              className="font-semibold text-primary-600 hover:underline dark:text-primary-300"
            >
              Volver al inicio
            </Link>
          </p>
        </div>
      </div>

      {/* Banner lateral */}
      <div className="relative hidden items-center justify-center bg-gradient-to-br from-primary-700 to-primary-950 p-12 text-white lg:flex">
        <div className="max-w-md">
          <Badge tone="primary" className="bg-white/15">
            {brand.name} · Portal empresarial
          </Badge>
          <h2 className="mt-5 font-heading text-3xl font-extrabold leading-tight">
            El control total de tu operación en una sola pantalla.
          </h2>
          <p className="mt-4 text-slate-300">
            Módulos conectados, permisos por rol y datos aislados por empresa.
            Todo lo que tu equipo necesita para trabajar con orden.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Un solo acceso para todos los módulos",
              "Permisos granulares por rol",
              "Cada empresa con datos aislados y seguros",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-accent-400" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

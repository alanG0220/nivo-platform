import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  KeyRound,
  Layers,
  ShieldCheck,
  Coins,
  ChevronDown,
} from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHead } from "@/components/ui/misc";
import { ModuleIcon } from "@/components/ui/ModuleIcon";
import { MODULES } from "@/data/modules";
import { brand } from "@/config/brand";
import clsx from "clsx";

const BENEFITS = [
  {
    icon: KeyRound,
    title: "Un solo acceso unificado",
    text: "Tus líderes y colaboradores ingresan con una sola credencial empresarial a todos los módulos contratados.",
  },
  {
    icon: Layers,
    title: "Escalabilidad por módulos",
    text: "Empieza con RRHH y Productividad; agrega Contabilidad, Inventarios o Costos cuando lo necesites, sin cambiar de plataforma.",
  },
  {
    icon: ShieldCheck,
    title: "Gestión de usuarios y permisos",
    text: "Configura accesos granulares para Propietarios, Administradores y Usuarios en segundos, con el principio de mínimo privilegio.",
  },
  {
    icon: Coins,
    title: "Herramientas conectadas",
    text: "Los módulos se comunican entre sí: por ejemplo, Costos e Inventarios comparten insumos para descontar stock automáticamente.",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Selecciona tus módulos",
    text: "Elige solo las soluciones que tu empresa necesita activar hoy.",
  },
  {
    n: "02",
    title: "Registra tu empresa",
    text: "Ingresa razón social, NIT y datos del responsable de la cuenta.",
  },
  {
    n: "03",
    title: "Adjunta documentos",
    text: "Carga RUT y Cámara de Comercio para la validación jurídica.",
  },
  {
    n: "04",
    title: "Realiza el pago",
    text: `Paga de forma segura con Wompi y disfruta ${brand.billing.trialDays} días de prueba.`,
  },
  {
    n: "05",
    title: "Activación e inducción",
    text: "Recibe tus credenciales y una sesión de bienvenida con nuestro equipo.",
  },
];

const FAQS = [
  {
    q: "¿Puedo contratar un solo módulo, como RRHH o Productividad?",
    a: "Sí. Nivo es 100% modular. Puedes comenzar con el módulo que tu negocio requiere hoy y añadir los demás cuando tu operación lo demande, conservando el mismo portal.",
  },
  {
    q: `¿Cómo funciona la prueba gratuita de ${brand.billing.trialDays} días?`,
    a: `Al completar tu registro y confirmar el método de pago con Wompi, se activa tu periodo de prueba con acompañamiento. ${brand.billing.trialDays} días antes del cierre te enviamos recordatorios para que no olvides tu pago.`,
  },
  {
    q: "¿Qué documentos requiere mi empresa para la activación?",
    a: "Para empresas constituidas en Colombia solicitamos el RUT actualizado, el Certificado de Existencia y Representación Legal de la Cámara de Comercio (vigencia menor a 30 días) y el documento de identidad del representante legal.",
  },
  {
    q: "¿Los datos de mi empresa están seguros y cumplen la normativa colombiana?",
    a: `Cumplimos con la ${brand.legal.dataLaw} para la protección de datos personales. La información viaja cifrada y cada empresa queda aislada: ningún usuario puede ver datos de otra empresa.`,
  },
];

export function HomePage() {
  return (
    <div className="animate-fadeIn">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/60 to-transparent dark:from-primary-500/5" />
        <div className="nivo-container grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="section-tag mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              Software empresarial modular · Hecho para Colombia
            </span>
            <h1 className="font-heading text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl dark:text-white">
              Toda tu operación empresarial,{" "}
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                unida en una sola plataforma.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft dark:text-slate-400">
              RRHH, productividad, contabilidad, inventarios y costos: módulos
              independientes y conectados, diseñados para empresas que buscan
              orden y control, pagando solo por lo que necesitan hoy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to="/contratacion" size="lg">
                Comenzar ahora
              </LinkButton>
              <LinkButton to="/planes" variant="secondary" size="lg">
                Ver planes y precios
              </LinkButton>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Check size={16} className="text-accent-500" />{" "}
                {brand.billing.trialDays} días de prueba con inducción
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={16} className="text-accent-500" /> Sin contratos de
                permanencia
              </span>
            </div>
          </div>

          {/* Vista previa del portal privado (contenido ficticio) */}
          <PortalPreview />
        </div>
      </section>

      {/* ── BENEFICIOS ── */}
      <section className="py-16 lg:py-20">
        <div className="nivo-container">
          <SectionHead
            tag="Ventajas empresariales"
            title="Modularidad sin la complejidad de los ERP tradicionales"
            subtitle="Olvida las plataformas monolíticas costosas e inflexibles. Nivo te da la libertad de armar la plataforma a tu medida."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-card transition-shadow hover:shadow-elevated dark:border-night-border dark:bg-night-800"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300">
                  <b.icon size={22} />
                </div>
                <h4 className="font-heading font-bold text-ink dark:text-white">
                  {b.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-slate-400">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÓDULOS DESTACADOS ── */}
      <section className="bg-slate-50 py-16 lg:py-20 dark:bg-night-900/50">
        <div className="nivo-container">
          <SectionHead
            tag="Ecosistema de software"
            title="Soluciones para cada área de tu empresa"
            subtitle="Cada módulo resuelve una necesidad crítica de tu operación diaria."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((mod) => (
              <div
                key={mod.id}
                className="flex flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-card dark:border-night-border dark:bg-night-800"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <ModuleIcon icon={mod.icon} color={mod.color} />
                    <div>
                      <h3 className="font-heading font-bold text-ink dark:text-white">
                        {mod.name}
                      </h3>
                      <span className="text-xs text-ink-faint">
                        {mod.category}
                      </span>
                    </div>
                  </div>
                  <Badge tone={mod.status === "Disponible" ? "ok" : "warn"}>
                    {mod.status}
                  </Badge>
                </div>
                <p className="text-sm leading-relaxed text-ink-soft dark:text-slate-400">
                  {mod.shortDesc}
                </p>
                <ul className="mt-4 space-y-2">
                  {mod.features.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-ink dark:text-slate-300"
                    >
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-accent-500"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center gap-2 pt-2">
                  <LinkButton
                    to={`/servicios/${mod.slug}`}
                    variant="secondary"
                    size="sm"
                  >
                    Conocer módulo
                  </LinkButton>
                  <Link
                    to="/planes"
                    className="ml-auto text-sm font-semibold text-primary-600 hover:underline dark:text-primary-300"
                  >
                    Ver planes →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <LinkButton to="/servicios" variant="navy">
              Ver catálogo completo de módulos
            </LinkButton>
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section className="py-16 lg:py-20">
        <div className="nivo-container">
          <SectionHead
            tag="Paso a paso"
            title="Contratación simple y transparente"
            subtitle="Desde tu registro hasta la inducción de tu equipo, con validación de la información antes de habilitar el acceso."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((s) => (
              <div
                key={s.n}
                className="rounded-lg border border-slate-200 bg-white p-5 dark:border-night-border dark:bg-night-800"
              >
                <div className="mb-3 font-heading text-2xl font-extrabold text-primary-500">
                  {s.n}
                </div>
                <h4 className="font-heading text-sm font-bold text-ink dark:text-white">
                  {s.title}
                </h4>
                <p className="mt-1.5 text-sm text-ink-soft dark:text-slate-400">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-slate-50 py-16 lg:py-20 dark:bg-night-900/50">
        <div className="nivo-container max-w-3xl">
          <SectionHead tag="Dudas habituales" title="Preguntas frecuentes" />
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-gradient-to-br from-primary-800 to-primary-950 py-16 text-center text-white lg:py-20">
        <div className="nivo-container">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight">
            Transforma la gestión de tu empresa con {brand.name}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Únete a las empresas que ya están ordenando su operación con
            software moderno, intuitivo y hecho para Colombia.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton to="/contratacion" variant="accent" size="lg">
              Empezar prueba gratuita
            </LinkButton>
            <LinkButton
              to="/contacto"
              size="lg"
              variant="secondary"
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Hablar con un asesor
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}

function PortalPreview() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-elevated dark:border-night-border dark:bg-night-800">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-night-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-500 font-heading text-sm font-bold text-white">
            CA
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink dark:text-white">
              Café & Aroma Especiales S.A.S.
            </h4>
            <p className="text-xs text-ink-faint">
              NIT: 901.482.930-4 · Plan Modular Pro
            </p>
          </div>
        </div>
        <Badge tone="ok" dot>
          Operativo
        </Badge>
      </div>
      <div className="mt-4 space-y-2.5">
        {[
          {
            icon: "Users",
            color: "accent" as const,
            name: "RRHH · Flow Desk",
            sub: "24 colaboradores · 2 solicitudes",
            badge: <Badge tone="ok">Activo</Badge>,
          },
          {
            icon: "CheckSquare",
            color: "primary" as const,
            name: "Productividad",
            sub: "18 tareas activas · 3 reuniones",
            badge: <Badge tone="ok">Activo</Badge>,
          },
          {
            icon: "BookOpen",
            color: "amber" as const,
            name: "Contabilidad",
            sub: "Libros y reportes",
            badge: <Badge tone="neutral">No contratado</Badge>,
          },
        ].map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between rounded-md border border-slate-100 p-3 dark:border-night-border"
          >
            <div className="flex items-center gap-3">
              <ModuleIcon
                icon={r.icon}
                color={r.color}
                boxSize={36}
                size={18}
              />
              <div>
                <div className="text-sm font-semibold text-ink dark:text-white">
                  {r.name}
                </div>
                <div className="text-xs text-ink-faint">{r.sub}</div>
              </div>
            </div>
            {r.badge}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-md bg-slate-50 p-3 text-center dark:bg-night-900">
          <div className="font-heading text-lg font-extrabold text-ink dark:text-white">
            100%
          </div>
          <div className="text-xs text-ink-faint">Módulos conectados</div>
        </div>
        <div className="rounded-md bg-slate-50 p-3 text-center dark:bg-night-900">
          <div className="font-heading text-lg font-extrabold text-ink dark:text-white">
            1 portal
          </div>
          <div className="text-xs text-ink-faint">Acceso único</div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({
  q,
  a,
  defaultOpen,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-night-border dark:bg-night-800">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-semibold text-ink dark:text-white">{q}</span>
        <ChevronDown
          size={18}
          className={clsx(
            "shrink-0 text-ink-faint transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm leading-relaxed text-ink-soft dark:text-slate-400">
          {a}
        </div>
      )}
    </div>
  );
}

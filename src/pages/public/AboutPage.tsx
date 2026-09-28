import { Compass, Grid3x3, HeartHandshake, RefreshCw } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/misc";
import { DataTable, Th, Td } from "@/components/ui/misc";
import { brand } from "@/config/brand";

const VALUES = [
  {
    icon: Compass,
    title: "Criterio operativo real",
    text: "Cada funcionalidad se diseña con base en cómo trabajan realmente los equipos de gestión humana, contabilidad e inventarios en Colombia.",
  },
  {
    icon: Grid3x3,
    title: "Modularidad auténtica",
    text: "Libertad para contratar, probar y desactivar módulos individuales, sin ataduras ni migraciones traumáticas.",
  },
  {
    icon: HeartHandshake,
    title: "Acompañamiento humano",
    text: "No entregamos solo manuales en PDF. Tu equipo recibe soporte directo e inducción guiada por especialistas.",
  },
  {
    icon: RefreshCw,
    title: "Evolución continua",
    text: "Mejoras constantes y adaptación a los cambios normativos, sin costo adicional.",
  },
];

const COMPARISON = [
  [
    "Modelo de adquisición",
    "Paquetes rígidos con funciones que nunca usas",
    "Modular: pagas solo por los módulos contratados",
  ],
  [
    "Tiempo de implementación",
    "Meses de parametrización y consultoría costosa",
    "Listo para usar en poco tiempo, con datos de ejemplo",
  ],
  [
    "Experiencia de usuario",
    "Interfaces grises, lentas y difíciles de aprender",
    "Diseño moderno, limpio y responsive (móvil y escritorio)",
  ],
  [
    "Moneda y precios",
    "Cotizaciones en dólares sujetas a devaluación",
    "Precios transparentes y estables en pesos colombianos",
  ],
  [
    "Flexibilidad",
    "Contratos de permanencia de 12 a 36 meses",
    `Prueba de ${brand.billing.trialDays} días y planes cancelables`,
  ],
];

export function AboutPage() {
  return (
    <div className="animate-fadeIn">
      <section className="nivo-container py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="section-tag mb-4">Nuestra historia y misión</span>
            <h1 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl dark:text-white">
              De la práctica administrativa real al{" "}
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                software empresarial del futuro.
              </span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft dark:text-slate-400">
              Llevamos más de 6 años de experiencia haciendo procesos
              administrativos y de inventarios para empresas. Trabajamos mano a
              mano con pequeñas y medianas empresas resolviendo el caos de la
              información dispersa: nóminas en hojas de cálculo, tareas
              olvidadas en el chat y contabilidades desconectadas de la realidad
              del negocio.
            </p>
            <p className="mt-4 leading-relaxed text-ink-soft dark:text-slate-400">
              <strong className="text-ink dark:text-white">{brand.name}</strong>{" "}
              nace con una convicción clara: las empresas de nuestra región no
              necesitan sistemas gigantescos e impersonales; necesitan
              herramientas precisas, modulares, fáciles de usar y ajustadas a
              nuestra legislación laboral y tributaria.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-card dark:border-night-border dark:bg-night-800">
            <h3 className="font-heading text-xl font-bold text-ink dark:text-white">
              Nuestro propósito
            </h3>
            <p className="mt-4 leading-relaxed text-ink-soft dark:text-slate-400">
              Simplificar la operación de las pymes de Colombia y Latinoamérica,
              eliminando barreras de costo, complejidad y burocracia
              tecnológica, con un enfoque en modularidad, claridad, soporte y
              crecimiento.
            </p>
            <blockquote className="mt-6 border-l-4 border-accent-500 pl-4 text-lg font-medium italic text-ink dark:text-slate-200">
              «El software no debe obligar a una empresa a cambiar su esencia;
              debe darle orden, agilidad y visión para multiplicar sus
              resultados.»
            </blockquote>
          </div>
        </div>

        <div className="mt-20">
          <SectionHead
            tag="Nuestros principios"
            title="Valores que guían cada decisión"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-lg border border-slate-200 bg-white p-6 dark:border-night-border dark:bg-night-800"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300">
                  <v.icon size={22} />
                </div>
                <h4 className="font-heading font-bold text-ink dark:text-white">
                  {v.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-slate-400">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <SectionHead
            tag="Diferenciación"
            title={`¿Por qué las empresas eligen ${brand.name}?`}
            subtitle="Una comparativa transparente frente al software empresarial tradicional."
          />
          <DataTable>
            <thead>
              <tr>
                <Th>Característica</Th>
                <Th>Software tradicional</Th>
                <Th className="!text-primary-600 dark:!text-primary-300">
                  Plataforma {brand.name}
                </Th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row[0]}>
                  <Td className="font-semibold">{row[0]}</Td>
                  <Td className="text-ink-soft">{row[1]}</Td>
                  <Td className="font-medium text-primary-700 dark:text-primary-300">
                    {row[2]}
                  </Td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </div>

        <div className="mt-16 text-center">
          <h3 className="font-heading text-2xl font-bold text-ink dark:text-white">
            ¿Listo para llevar el control de tu empresa al siguiente nivel?
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <LinkButton to="/planes" size="lg">
              Explorar planes modulares
            </LinkButton>
            <LinkButton to="/contacto" variant="secondary" size="lg">
              Contactar a un asesor
            </LinkButton>
          </div>
        </div>
      </section>
    </div>
  );
}

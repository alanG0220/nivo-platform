import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { brand } from "@/config/brand";
import { MODULES } from "@/data/modules";

export function PublicFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-night-border bg-primary-950 text-slate-300">
      <div className="nivo-container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <Logo light showTagline />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              La plataforma empresarial que reúne talento, tareas, contabilidad,
              inventarios y costos en un solo ecosistema para empresas de
              Colombia y Latinoamérica.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-300">
                🇨🇴 Hecho para Colombia
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-300">
                <ShieldCheck size={13} /> Cifrado SSL
              </span>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h5 className="mb-4 font-heading text-sm font-bold text-white">
              Navegación
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="hover:text-white">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="hover:text-white">
                  Servicios y módulos
                </Link>
              </li>
              <li>
                <Link to="/planes" className="hover:text-white">
                  Planes y precios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-white">
                  Contáctanos
                </Link>
              </li>
            </ul>
          </div>

          {/* Módulos */}
          <div>
            <h5 className="mb-4 font-heading text-sm font-bold text-white">
              Módulos
            </h5>
            <ul className="space-y-2.5 text-sm">
              {MODULES.map((m) => (
                <li key={m.id}>
                  <Link
                    to={`/servicios/${m.slug}`}
                    className="hover:text-white"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h5 className="mb-4 font-heading text-sm font-bold text-white">
              Contacto
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-accent-400" />
                <a
                  href={`tel:${brand.contact.phoneE164}`}
                  className="hover:text-white"
                >
                  {brand.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-accent-400" />
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="hover:text-white"
                >
                  {brand.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-accent-400" />
                {brand.contact.addressCity}
              </li>
            </ul>
            <div className="mt-5 flex flex-col gap-2">
              <Link
                to="/ingresar"
                className="text-sm text-slate-400 hover:text-white"
              >
                Portal de clientes
              </Link>
              <Link
                to="/nivo-ops"
                className="text-sm text-warn-500 hover:text-warn-400"
              >
                Panel interno · Nivo Ops
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {brand.legalName} — Todos los derechos reservados.
          </span>
          <div className="flex flex-wrap gap-4">
            <span>Términos de servicio</span>
            <span>Tratamiento de datos ({brand.legal.dataLaw})</span>
            <span>Seguridad de la información</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

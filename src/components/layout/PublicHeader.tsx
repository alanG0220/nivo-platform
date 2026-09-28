import { useState, type MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import clsx from "clsx";
import { Logo } from "@/components/ui/Logo";
import { Button, LinkButton } from "@/components/ui/Button";
import { useApp } from "@/store/AppStore";

const NAV = [
  { to: "/", label: "Inicio", end: true },
  { to: "/nosotros", label: "Quiénes somos" },
  { to: "/servicios", label: "Servicios" },
  { to: "/planes", label: "Planes" },
  { to: "/contacto", label: "Contáctanos" },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useApp();
  const navigate = useNavigate();

  const goContact = (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    navigate("/contacto");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-night-border dark:bg-night-900/85">
      <div className="nivo-container flex h-16 items-center justify-between">
        <Logo showTagline />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.to === "/contacto" ? (
              <a
                key={item.to}
                href="/contacto"
                onClick={goContact}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-primary-600 dark:text-slate-300 dark:hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  clsx(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary-600 dark:text-white"
                      : "text-ink-soft hover:text-primary-600 dark:text-slate-300 dark:hover:text-white",
                  )
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-md p-2 text-ink-soft transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <LinkButton
            to="/ingresar"
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Iniciar sesión
          </LinkButton>
          <LinkButton
            to="/planes"
            variant="secondary"
            size="sm"
            className="hidden md:inline-flex"
          >
            Ver planes
          </LinkButton>
          <LinkButton
            to="/contratacion"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Comenzar ahora
          </LinkButton>

          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-md p-2 text-ink-soft hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-white/5"
            aria-label="Abrir menú"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden dark:border-night-border dark:bg-night-900">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) =>
              item.to === "/contacto" ? (
                <a
                  key={item.to}
                  href="/contacto"
                  onClick={goContact}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft dark:text-slate-300"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "rounded-md px-3 py-2.5 text-sm font-medium",
                      isActive
                        ? "bg-primary-50 text-primary-600 dark:bg-white/10 dark:text-white"
                        : "text-ink-soft dark:text-slate-300",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <LinkButton
              to="/ingresar"
              variant="secondary"
              block
              onClick={() => setOpen(false)}
            >
              Iniciar sesión
            </LinkButton>
            <LinkButton
              to="/contratacion"
              variant="primary"
              block
              onClick={() => setOpen(false)}
            >
              Comenzar ahora
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}

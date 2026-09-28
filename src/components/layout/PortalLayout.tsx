import { useState, type ReactNode } from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import {
  LayoutGrid,
  Settings,
  LifeBuoy,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Lock,
} from "lucide-react";
import clsx from "clsx";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/store/AppStore";
import { MOCK_COMPANY } from "@/data/mock";
import { ROLE_LABEL } from "@/data/rbac";
import { MODULE_BY_ID } from "@/data/modules";
import { ModuleIcon } from "@/components/ui/ModuleIcon";

export function PortalLayout() {
  const { session, logout, theme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Guarda de sesión simulada: si no hay sesión, mostrar aviso e ir a login.
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 dark:bg-night-950">
        <div className="max-w-sm rounded-xl border border-slate-200 bg-white p-8 text-center shadow-card dark:border-night-border dark:bg-night-800">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-500/15">
            <Lock size={22} />
          </div>
          <h2 className="font-heading text-lg font-bold text-ink dark:text-white">
            Acceso restringido
          </h2>
          <p className="mt-2 text-sm text-ink-soft dark:text-slate-400">
            Debes iniciar sesión para acceder al portal privado.
          </p>
          <Link
            to="/ingresar"
            className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-primary-500 px-5 text-sm font-semibold text-white hover:bg-primary-600"
          >
            Ir a iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  const activeModules = MOCK_COMPANY.modules.filter(
    (m) => m.status === "activo" || m.status === "en_prueba",
  );

  const doLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-night-950">
      {/* Overlay móvil */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform dark:border-night-border dark:bg-night-900 lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-night-border">
          <Logo />
          <button className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Empresa */}
        <div className="mx-4 mt-4 flex items-center gap-3 rounded-lg bg-slate-50 p-3 dark:bg-night-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-500 font-heading text-sm font-bold text-white">
            CA
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-ink dark:text-white">
              {MOCK_COMPANY.commercialName}
            </p>
            <p className="truncate text-xs text-ink-faint">
              NIT: {MOCK_COMPANY.nit}
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <SidebarLabel>Principal</SidebarLabel>
          <SidebarLink
            to="/app"
            end
            icon={<LayoutGrid size={18} />}
            label="Inicio / Resumen"
            onNav={() => setMobileOpen(false)}
          />

          <SidebarLabel className="mt-5">Módulos contratados</SidebarLabel>
          {activeModules.map((m) => {
            const def = MODULE_BY_ID[m.id];
            return (
              <SidebarLink
                key={m.id}
                to={`/app/modulos/${m.id}`}
                icon={
                  <ModuleIcon
                    icon={def.icon}
                    color={def.color}
                    boxSize={26}
                    size={15}
                  />
                }
                label={def.name}
                onNav={() => setMobileOpen(false)}
              />
            );
          })}

          <SidebarLabel className="mt-5">Administración</SidebarLabel>
          {session.role === "owner" && (
            <SidebarLink
              to="/app/configuracion"
              icon={<Settings size={18} />}
              label="Configuración de empresa"
              badge={<Badge tone="warn">Owner</Badge>}
              onNav={() => setMobileOpen(false)}
            />
          )}
          <SidebarLink
            to="/contacto"
            icon={<LifeBuoy size={18} />}
            label="Ayuda y soporte"
            onNav={() => setMobileOpen(false)}
          />
        </nav>

        {/* Usuario */}
        <div className="border-t border-slate-200 p-4 dark:border-night-border">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-500 text-sm font-bold text-white">
              {session.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink dark:text-white">
                {session.name}
              </p>
              <p className="truncate text-xs text-ink-faint">
                Rol: {ROLE_LABEL[session.role]}
              </p>
            </div>
            <button
              onClick={doLogout}
              className="rounded-md p-1.5 text-ink-faint hover:bg-slate-100 hover:text-danger-500 dark:hover:bg-white/5"
              title="Cerrar sesión"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Contenido */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 dark:border-night-border dark:bg-night-900">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu size={22} />
            </button>
            <Badge tone="ok" dot>
              Plan modular activo
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 text-ink-soft hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/nivo-ops"
              className="hidden rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-slate-50 sm:inline-block dark:border-night-border dark:text-slate-300"
            >
              Nivo Ops
            </Link>
            <Link
              to="/"
              className="rounded-md px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
            >
              Web pública
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        "mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-ink-faint",
        className,
      )}
    >
      {children}
    </p>
  );
}

function SidebarLink({
  to,
  end,
  icon,
  label,
  badge,
  onNav,
}: {
  to: string;
  end?: boolean;
  icon: ReactNode;
  label: string;
  badge?: ReactNode;
  onNav?: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNav}
      className={({ isActive }) =>
        clsx(
          "mb-1 flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-white"
            : "text-ink-soft hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-white/5",
        )
      }
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {badge}
    </NavLink>
  );
}

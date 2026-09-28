/**
 * Estado global de la aplicación (Fase 1, en memoria).
 * Maneja: tema claro/oscuro, sesión/rol de demostración, selección de
 * módulos y periodo de facturación para la cotización.
 *
 * Al conectar Supabase, `session` se poblará desde Supabase Auth y la
 * selección de módulos podrá persistirse; el resto de la interfaz no cambia.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  BillingPeriod,
  ModuleId,
  RoleCode,
  SessionUser,
} from "@/types/domain";
import { DEMO_SESSIONS } from "@/data/mock";

type Theme = "light" | "dark";

interface AppState {
  theme: Theme;
  toggleTheme: () => void;

  /** Sesión de demostración. null = no autenticado. */
  session: SessionUser | null;
  loginAs: (role: RoleCode) => void;
  logout: () => void;

  selectedModules: ModuleId[];
  toggleModule: (id: ModuleId) => void;
  setSelectedModules: (ids: ModuleId[]) => void;

  billingPeriod: BillingPeriod;
  setBillingPeriod: (p: BillingPeriod) => void;
}

const AppContext = createContext<AppState | null>(null);

const THEME_KEY = "nivo_theme";

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const saved = window.localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved) return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [session, setSession] = useState<SessionUser | null>(null);
  const [selectedModules, setSelectedModulesState] = useState<ModuleId[]>([
    "rrhh",
    "productividad",
  ]);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("mensual");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  const loginAs = useCallback((role: RoleCode) => {
    setSession(DEMO_SESSIONS[role]);
  }, []);

  const logout = useCallback(() => setSession(null), []);

  const toggleModule = useCallback((id: ModuleId) => {
    setSelectedModulesState((current) => {
      if (current.includes(id)) {
        // mantener al menos 1 módulo seleccionado
        if (current.length === 1) return current;
        return current.filter((m) => m !== id);
      }
      return [...current, id];
    });
  }, []);

  const setSelectedModules = useCallback(
    (ids: ModuleId[]) => setSelectedModulesState(ids),
    [],
  );

  const value = useMemo<AppState>(
    () => ({
      theme,
      toggleTheme,
      session,
      loginAs,
      logout,
      selectedModules,
      toggleModule,
      setSelectedModules,
      billingPeriod,
      setBillingPeriod,
    }),
    [
      theme,
      toggleTheme,
      session,
      loginAs,
      logout,
      selectedModules,
      toggleModule,
      setSelectedModules,
      billingPeriod,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de <AppStoreProvider>");
  return ctx;
}

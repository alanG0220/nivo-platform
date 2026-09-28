import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MODULE_BY_ID } from "@/data/modules";
import { ModuleIcon } from "@/components/ui/ModuleIcon";
import { Badge } from "@/components/ui/Badge";
import { useApp } from "@/store/AppStore";
import type { ModuleId } from "@/types/domain";

import { RrhhWorkspace } from "./modules/RrhhWorkspace";
import { ProductividadWorkspace } from "./modules/ProductividadWorkspace";
import { ContabilidadWorkspace } from "./modules/ContabilidadWorkspace";
import { InventariosWorkspace } from "./modules/InventariosWorkspace";
import { CostosWorkspace } from "./modules/CostosWorkspace";

const VALID: ModuleId[] = [
  "rrhh",
  "productividad",
  "contabilidad",
  "inventarios",
  "costos",
];

export function ModuleWorkspacePage() {
  const { session } = useApp();
  const { id } = useParams();

  if (!session) return <Navigate to="/ingresar" replace />;
  if (!id || !VALID.includes(id as ModuleId))
    return <Navigate to="/app" replace />;

  const moduleId = id as ModuleId;
  const def = MODULE_BY_ID[moduleId];

  return (
    <div className="animate-fadeIn mx-auto max-w-6xl">
      <Link
        to="/app"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-primary-600 dark:text-slate-400"
      >
        <ArrowLeft size={16} /> Volver al resumen
      </Link>

      <div className="mb-6 flex items-center gap-4">
        <ModuleIcon icon={def.icon} color={def.color} boxSize={52} size={26} />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl font-extrabold text-ink dark:text-white">
              {def.name}
            </h1>
            <Badge tone={def.status === "Disponible" ? "ok" : "warn"}>
              {def.status === "Disponible" ? "Activo" : "Vista previa"}
            </Badge>
          </div>
          <p className="text-sm text-ink-soft dark:text-slate-400">
            {def.shortDesc}
          </p>
        </div>
      </div>

      {moduleId === "rrhh" && <RrhhWorkspace />}
      {moduleId === "productividad" && <ProductividadWorkspace />}
      {moduleId === "contabilidad" && <ContabilidadWorkspace />}
      {moduleId === "inventarios" && <InventariosWorkspace />}
      {moduleId === "costos" && <CostosWorkspace />}
    </div>
  );
}

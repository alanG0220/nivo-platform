import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { DataTable, Th, Td } from "@/components/ui/misc";
import { Info } from "lucide-react";
import { formatCOP } from "@/config/brand";

// Vista previa: la lógica contable real (causación, libros, folios y la
// integración con la DIAN) se implementará en una fase posterior.
const ENTRIES = [
  {
    date: "25/09/2026",
    doc: "FC-1042",
    concept: "Compra de insumos",
    type: "Compra",
    value: 1250000,
  },
  {
    date: "24/09/2026",
    doc: "GA-0311",
    concept: "Servicios públicos",
    type: "Gasto",
    value: 480000,
  },
  {
    date: "22/09/2026",
    doc: "FV-2098",
    concept: "Venta de productos",
    type: "Ingreso",
    value: 3120000,
  },
];

export function ContabilidadWorkspace() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-2.5 rounded-lg border border-primary-200 bg-primary-50 p-4 text-sm text-primary-700 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-200">
        <Info size={18} className="mt-0.5 shrink-0" />
        <span>
          Vista previa del módulo. La causación, los libros oficiales y la
          conexión con facturación electrónica DIAN (folios) están en la hoja de
          ruta. Cuando quieras, definimos juntos ese flujo con un contador.
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <KPI label="Ingresos del mes" value={formatCOP(3120000)} tone="ok" />
        <KPI label="Egresos del mes" value={formatCOP(1730000)} tone="danger" />
        <KPI label="Resultado" value={formatCOP(1390000)} tone="info" />
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading font-bold text-ink dark:text-white">
            Movimientos recientes
          </h3>
          <Badge tone="warn">Vista previa</Badge>
        </div>
        <DataTable>
          <thead>
            <tr>
              <Th>Fecha</Th>
              <Th>Documento</Th>
              <Th>Concepto</Th>
              <Th>Tipo</Th>
              <Th>Valor</Th>
            </tr>
          </thead>
          <tbody>
            {ENTRIES.map((e) => (
              <tr key={e.doc}>
                <Td>{e.date}</Td>
                <Td className="font-semibold">{e.doc}</Td>
                <Td>{e.concept}</Td>
                <Td>
                  <Badge
                    tone={
                      e.type === "Ingreso"
                        ? "ok"
                        : e.type === "Gasto"
                          ? "warn"
                          : "neutral"
                    }
                  >
                    {e.type}
                  </Badge>
                </Td>
                <Td>{formatCOP(e.value)}</Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </Card>

      <Card className="text-center">
        <p className="text-sm text-ink-soft dark:text-slate-400">
          Este módulo aún no está contratado para tu empresa.
        </p>
        <LinkButton to="/planes" className="mt-3">
          Ver planes
        </LinkButton>
      </Card>
    </div>
  );
}

function KPI({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "ok" | "danger" | "info";
}) {
  const color =
    tone === "ok"
      ? "text-accent-600"
      : tone === "danger"
        ? "text-danger-500"
        : "text-primary-600";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-night-border dark:bg-night-800">
      <p className="text-xs uppercase tracking-wide text-ink-faint">{label}</p>
      <p className={`mt-1 font-heading text-xl font-extrabold ${color}`}>
        {value}
      </p>
    </div>
  );
}

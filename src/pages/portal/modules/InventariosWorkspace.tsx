import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, Th, Td } from "@/components/ui/misc";
import { Sparkles, Upload, ImageIcon, Bell } from "lucide-react";
import {
  MOCK_STOCK,
  MOCK_WAREHOUSES,
  MOCK_INVOICE_CAPTURES,
} from "@/data/mock";
import { formatCOP } from "@/config/brand";

const STATUS_TONE: Record<string, { tone: BadgeTone; label: string }> = {
  ok: { tone: "ok", label: "En nivel" },
  bajo: { tone: "warn", label: "Stock bajo" },
  critico: { tone: "danger", label: "Crítico" },
};

export function InventariosWorkspace() {
  const [captures, setCaptures] = useState(MOCK_INVOICE_CAPTURES);
  const [alertThreshold, setAlertThreshold] = useState(50);

  const simulateCapture = () => {
    const id = `FAC-${1044 + captures.length}`;
    setCaptures((prev) => [
      {
        id,
        file: `factura_venta_${id}.jpg`,
        product: "Nueva factura",
        qty: 1,
        status: "procesando",
        discounted: "Analizando con IA…",
      },
      ...prev,
    ]);
    // Simular fin del procesamiento IA
    setTimeout(() => {
      setCaptures((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                status: "procesada",
                product: "Arroz chino",
                qty: 2,
                discounted: "Arroz 400 g · Aceite 20 ml · Cerdo 200 g",
              }
            : c,
        ),
      );
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* IA: captura de facturas */}
      <Card className="border-primary-200 bg-primary-50/40 dark:border-primary-500/30 dark:bg-primary-500/5">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles size={18} className="text-primary-500" />
          <h3 className="font-heading font-bold text-ink dark:text-white">
            Captura de facturas con IA
          </h3>
          <Badge tone="info">Automatización</Badge>
        </div>
        <p className="text-sm text-ink-soft dark:text-slate-400">
          Sube la foto de una factura de venta. La IA identifica los productos
          vendidos y, usando las recetas del módulo de Costos, descuenta
          automáticamente los insumos del inventario.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-primary-300 bg-white px-4 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50 dark:border-primary-500/40 dark:bg-night-800 dark:text-primary-300">
            <Upload size={16} /> Subir foto de factura
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={simulateCapture}
            />
          </label>
          <Button variant="ghost" size="sm" onClick={simulateCapture}>
            <ImageIcon size={15} /> Simular captura
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          {captures.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-white p-3 text-sm dark:border-night-border dark:bg-night-800"
            >
              <div className="flex items-center gap-3">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-ink-soft dark:bg-white/10">
                  <ImageIcon size={16} />
                </div>
                <div>
                  <p className="font-semibold text-ink dark:text-white">
                    {c.file}
                  </p>
                  <p className="text-xs text-ink-faint">
                    {c.product} × {c.qty} · Descuenta: {c.discounted}
                  </p>
                </div>
              </div>
              <Badge tone={c.status === "procesada" ? "ok" : "warn"}>
                {c.status === "procesada" ? "Procesada" : "Procesando…"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Alertas configurables */}
      <Card>
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-warn-500" />
          <h3 className="font-heading font-bold text-ink dark:text-white">
            Alertas de stock mínimo
          </h3>
        </div>
        <p className="mt-1 text-sm text-ink-soft dark:text-slate-400">
          El administrador configura el umbral. Cuando un insumo baja de este
          porcentaje del mínimo, se envían alertas de compra.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={alertThreshold}
            onChange={(e) => setAlertThreshold(Number(e.target.value))}
            className="w-64 accent-primary-500"
          />
          <span className="font-heading text-lg font-bold text-ink dark:text-white">
            {alertThreshold}%
          </span>
          <Badge tone="warn">2 insumos por debajo del umbral</Badge>
        </div>
      </Card>

      {/* Existencias por bodega */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading font-bold text-ink dark:text-white">
            Existencias
          </h3>
          <div className="flex gap-2">
            {MOCK_WAREHOUSES.map((w, i) => (
              <Badge key={w} tone={i === 0 ? "info" : "neutral"}>
                {w}
              </Badge>
            ))}
          </div>
        </div>
        <DataTable>
          <thead>
            <tr>
              <Th>SKU</Th>
              <Th>Insumo</Th>
              <Th>Existencia</Th>
              <Th>Mínimo</Th>
              <Th>Costo unitario</Th>
              <Th>Estado</Th>
            </tr>
          </thead>
          <tbody>
            {MOCK_STOCK.map((s) => {
              const meta = STATUS_TONE[s.status];
              return (
                <tr key={s.sku}>
                  <Td className="font-semibold">{s.sku}</Td>
                  <Td>{s.name}</Td>
                  <Td>{s.stock}</Td>
                  <Td>{s.min}</Td>
                  <Td>{formatCOP(s.unitCost)}</Td>
                  <Td>
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </DataTable>
      </Card>
    </div>
  );
}

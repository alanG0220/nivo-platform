import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { DataTable, Th, Td } from "@/components/ui/misc";
import { Plus, Trash2, Info, Link2 } from "lucide-react";
import { MOCK_RECIPES, type RecipeIngredient } from "@/data/mock";
import { formatCOP } from "@/config/brand";

/**
 * Costos: arma la ficha (receta) de un producto con sus insumos y cantidades.
 * Con el costo por unidad base (que viene de Inventarios), calcula por regla
 * de tres el costo de cada insumo usado, el costo total del producto y el
 * precio mínimo de venta sugerido según el margen objetivo.
 */
export function CostosWorkspace() {
  const [product, setProduct] = useState(MOCK_RECIPES[0].product);
  const [margin, setMargin] = useState(
    Math.round(MOCK_RECIPES[0].margin * 100),
  );
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(
    MOCK_RECIPES[0].ingredients,
  );

  const totals = useMemo(() => {
    // costo insumo = cantidad usada × costo por unidad base
    const perIngredient = ingredients.map((ing) => ({
      ...ing,
      lineCost: ing.qty * ing.unitCostPerBase,
    }));
    const totalCost = perIngredient.reduce((acc, i) => acc + i.lineCost, 0);
    // precio mínimo = costo / (1 - margen)
    const marginRate = Math.min(0.95, Math.max(0, margin / 100));
    const minPrice = marginRate < 1 ? totalCost / (1 - marginRate) : totalCost;
    return { perIngredient, totalCost, minPrice };
  }, [ingredients, margin]);

  const updateIngredient = (idx: number, patch: Partial<RecipeIngredient>) => {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === idx ? { ...ing, ...patch } : ing)),
    );
  };

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      {
        sku: `INS-${String(prev.length + 1).padStart(3, "0")}`,
        name: "Nuevo insumo",
        qty: 0,
        unit: "g",
        unitCostPerBase: 0,
      },
    ]);
  };

  const removeIngredient = (idx: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-2.5 rounded-lg border border-accent-200 bg-accent-50 p-4 text-sm text-accent-700 dark:border-accent-500/30 dark:bg-accent-500/10 dark:text-accent-300">
        <Link2 size={18} className="mt-0.5 shrink-0" />
        <span>
          Costos está conectado con Inventarios: el costo por unidad de cada
          insumo proviene de lo que registraste al comprarlo. Al vender el
          producto, sus insumos se descuentan del inventario.
        </span>
      </div>

      <Card>
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink dark:text-slate-200">
              Producto final
            </span>
            <Input
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Ej: Arroz chino"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink dark:text-slate-200">
              Margen objetivo (%)
            </span>
            <Input
              type="number"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              min={0}
              max={95}
            />
          </label>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-heading font-bold text-ink dark:text-white">
            Insumos de la receta
          </h3>
          <Button size="sm" variant="secondary" onClick={addIngredient}>
            <Plus size={15} /> Agregar insumo
          </Button>
        </div>

        <DataTable>
          <thead>
            <tr>
              <Th>Insumo</Th>
              <Th>Cantidad</Th>
              <Th>Unidad</Th>
              <Th>Costo / unidad</Th>
              <Th>Costo del insumo</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {totals.perIngredient.map((ing, idx) => (
              <tr key={idx}>
                <Td>
                  <Input
                    value={ing.name}
                    onChange={(e) =>
                      updateIngredient(idx, { name: e.target.value })
                    }
                    className="h-9"
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={ing.qty}
                    onChange={(e) =>
                      updateIngredient(idx, { qty: Number(e.target.value) })
                    }
                    className="h-9 w-24"
                  />
                </Td>
                <Td>
                  <Input
                    value={ing.unit}
                    onChange={(e) =>
                      updateIngredient(idx, { unit: e.target.value })
                    }
                    className="h-9 w-16"
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={ing.unitCostPerBase}
                    onChange={(e) =>
                      updateIngredient(idx, {
                        unitCostPerBase: Number(e.target.value),
                      })
                    }
                    className="h-9 w-24"
                  />
                  <span className="ml-1 text-xs text-ink-faint">
                    /{ing.unit}
                  </span>
                </Td>
                <Td className="font-semibold text-ink dark:text-white">
                  {formatCOP(ing.lineCost)}
                </Td>
                <Td>
                  <button
                    onClick={() => removeIngredient(idx)}
                    className="rounded p-1.5 text-ink-faint hover:bg-danger-soft hover:text-danger-500"
                    aria-label="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </DataTable>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-faint">
          <Info size={13} /> El costo del insumo se calcula por regla de tres:
          cantidad usada × costo por unidad. Ej.: 200 g × $3,80/g = $760.
        </p>
      </Card>

      {/* Resultado */}
      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard
          label="Costo total del producto"
          value={formatCOP(totals.totalCost)}
          tone="ink"
          sub={`Receta de «${product}»`}
        />
        <ResultCard
          label={`Margen objetivo`}
          value={`${margin}%`}
          tone="info"
          sub="Configurable por producto"
        />
        <ResultCard
          label="Precio mínimo de venta"
          value={formatCOP(Math.round(totals.minPrice))}
          tone="accent"
          sub="Sugerido según costo y margen"
        />
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  tone,
  sub,
}: {
  label: string;
  value: string;
  tone: "ink" | "info" | "accent";
  sub: string;
}) {
  const color =
    tone === "accent"
      ? "text-accent-600 dark:text-accent-400"
      : tone === "info"
        ? "text-primary-600 dark:text-primary-300"
        : "text-ink dark:text-white";
  return (
    <Card compact>
      <p className="text-xs uppercase tracking-wide text-ink-faint">{label}</p>
      <p className={`mt-1 font-heading text-2xl font-extrabold ${color}`}>
        {value}
      </p>
      <p className="mt-0.5 text-xs text-ink-faint">{sub}</p>
    </Card>
  );
}

import { Card } from "@/components/ui/Card";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_TASKS } from "@/data/mock";

const COLUMNS = ["Por hacer", "En progreso", "Completado"] as const;

const PRIORITY_TONE: Record<string, BadgeTone> = {
  Urgente: "danger",
  Alta: "warn",
  Media: "info",
  Baja: "neutral",
};

export function ProductividadWorkspace() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Stat label="Tareas en curso" value="18" />
          <Stat label="Reuniones esta semana" value="3" />
          <Stat label="Anuncios activos" value="2" />
        </div>
        <Button size="sm">+ Nueva tarea</Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {COLUMNS.map((col) => {
          const tasks = MOCK_TASKS.filter((t) => t.column === col);
          return (
            <div
              key={col}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-night-border dark:bg-night-900/50"
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-heading text-sm font-bold text-ink dark:text-white">
                  {col}
                </h4>
                <Badge tone="neutral">{tasks.length}</Badge>
              </div>
              <div className="space-y-3">
                {tasks.map((t) => (
                  <Card
                    key={t.id}
                    compact
                    className={col === "Completado" ? "opacity-80" : ""}
                  >
                    <Badge
                      tone={
                        col === "Completado" ? "ok" : PRIORITY_TONE[t.priority]
                      }
                    >
                      {col === "Completado"
                        ? "✓ Finalizada"
                        : `Prioridad ${t.priority}`}
                    </Badge>
                    <h5
                      className={`mt-2 text-sm font-semibold text-ink dark:text-white ${col === "Completado" ? "line-through" : ""}`}
                    >
                      {t.title}
                    </h5>
                    <div className="mt-2 flex items-center justify-between text-xs text-ink-faint">
                      <span>{t.assignee}</span>
                      <span>Vence: {t.deadline}</span>
                    </div>
                  </Card>
                ))}
                {tasks.length === 0 && (
                  <p className="py-6 text-center text-xs text-ink-faint">
                    Sin tareas
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-night-border dark:bg-night-800">
      <div className="font-heading text-xl font-extrabold text-ink dark:text-white">
        {value}
      </div>
      <div className="text-xs text-ink-faint">{label}</div>
    </div>
  );
}

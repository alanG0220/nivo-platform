import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, Th, Td } from "@/components/ui/misc";
import { MOCK_EMPLOYEES, MOCK_ABSENCES } from "@/data/mock";

export function RrhhWorkspace() {
  const [absences, setAbsences] = useState(MOCK_ABSENCES);

  const resolve = (id: string, approve: boolean) => {
    setAbsences((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: approve ? "Aprobada" : "Pendiente" } : a,
      ),
    );
  };

  const pending = absences.filter((a) => a.status === "Pendiente").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Colaboradores" value={String(MOCK_EMPLOYEES.length)} />
        <Stat
          label="Solicitudes pendientes"
          value={String(pending)}
          highlight
        />
        <Stat label="Presencia hoy" value="22 / 24" />
        <Stat label="Documentos al día" value="96%" />
      </div>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading font-bold text-ink dark:text-white">
            Novedades y solicitudes
          </h3>
          <Badge tone="warn">{absences.length} radicadas</Badge>
        </div>
        <DataTable>
          <thead>
            <tr>
              <Th>Radicado</Th>
              <Th>Colaborador</Th>
              <Th>Tipo</Th>
              <Th>Fechas</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {absences.map((a) => (
              <tr key={a.id}>
                <Td className="font-semibold">{a.id}</Td>
                <Td>{a.employee}</Td>
                <Td>{a.type}</Td>
                <Td>{a.dates}</Td>
                <Td>
                  <Badge tone={a.status === "Pendiente" ? "warn" : "ok"}>
                    {a.status}
                  </Badge>
                </Td>
                <Td>
                  {a.status === "Pendiente" ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => resolve(a.id, true)}>
                        Aprobar
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => resolve(a.id, false)}
                      >
                        Rechazar
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-ink-faint">Resuelta</span>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading font-bold text-ink dark:text-white">
            Directorio de empleados
          </h3>
          <Button size="sm" variant="secondary">
            + Nuevo colaborador
          </Button>
        </div>
        <DataTable>
          <thead>
            <tr>
              <Th>Código</Th>
              <Th>Nombre</Th>
              <Th>Cargo</Th>
              <Th>Área</Th>
              <Th>Contrato</Th>
              <Th>Ingreso</Th>
            </tr>
          </thead>
          <tbody>
            {MOCK_EMPLOYEES.map((e) => (
              <tr key={e.id}>
                <Td className="font-semibold">{e.id}</Td>
                <Td>{e.name}</Td>
                <Td>{e.position}</Td>
                <Td>{e.department}</Td>
                <Td>{e.contract}</Td>
                <Td>{e.entryDate}</Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </Card>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-night-border dark:bg-night-800">
      <div
        className={`font-heading text-2xl font-extrabold ${highlight ? "text-warn-500" : "text-ink dark:text-white"}`}
      >
        {value}
      </div>
      <div className="text-xs text-ink-faint">{label}</div>
    </div>
  );
}

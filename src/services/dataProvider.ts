/**
 * Capa de datos desacoplada.
 *
 * Hoy la implementación es `MockDataProvider` (datos en memoria). Cuando se
 * conecte Supabase, se crea `SupabaseDataProvider` que implemente la misma
 * interfaz `DataProvider` y se cambia una sola línea en `getDataProvider()`.
 * Las pantallas nunca hablan directo con los mocks: hablan con esta interfaz.
 */
import type {
  Application,
  ApplicationStatus,
  Company,
  CompanyUser,
} from "@/types/domain";
import {
  MOCK_APPLICATIONS,
  MOCK_COMPANY,
  MOCK_COMPANY_USERS,
} from "@/data/mock";

export interface DataProvider {
  getCompany(): Promise<Company>;
  getCompanyUsers(): Promise<CompanyUser[]>;
  getApplications(): Promise<Application[]>;
  updateApplicationStatus(
    id: string,
    status: ApplicationStatus,
    historyAction: string,
  ): Promise<Application[]>;
}

class MockDataProvider implements DataProvider {
  private applications: Application[] = [...MOCK_APPLICATIONS];

  async getCompany(): Promise<Company> {
    return MOCK_COMPANY;
  }

  async getCompanyUsers(): Promise<CompanyUser[]> {
    return MOCK_COMPANY_USERS;
  }

  async getApplications(): Promise<Application[]> {
    return this.applications;
  }

  async updateApplicationStatus(
    id: string,
    status: ApplicationStatus,
    historyAction: string,
  ): Promise<Application[]> {
    this.applications = this.applications.map((app) =>
      app.id === id
        ? {
            ...app,
            status,
            history: [
              { time: nowLabel(), action: historyAction },
              ...app.history,
            ],
          }
        : app,
    );
    return this.applications;
  }
}

function nowLabel(): string {
  return (
    "Hoy " +
    new Date().toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

let provider: DataProvider | null = null;

/** Punto único de intercambio mock ↔ Supabase. */
export function getDataProvider(): DataProvider {
  if (!provider) {
    provider = new MockDataProvider();
    // Futuro: provider = new SupabaseDataProvider(supabaseClient);
  }
  return provider;
}

import { Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PortalLayout } from "@/components/layout/PortalLayout";

// Páginas públicas
import { HomePage } from "@/pages/public/HomePage";
import { AboutPage } from "@/pages/public/AboutPage";
import { ServicesPage } from "@/pages/public/ServicesPage";
import { ModuleDetailPage } from "@/pages/public/ModuleDetailPage";
import { PricingPage } from "@/pages/public/PricingPage";
import { ContactPage } from "@/pages/public/ContactPage";
import { CheckoutPage } from "@/pages/public/CheckoutPage";
import { SuccessPage } from "@/pages/public/SuccessPage";
import { LoginPage } from "@/pages/public/LoginPage";

// Portal privado
import { PortalHomePage } from "@/pages/portal/PortalHomePage";
import { CompanySettingsPage } from "@/pages/portal/CompanySettingsPage";
import { ModuleWorkspacePage } from "@/pages/portal/ModuleWorkspacePage";

// Panel interno
import { OpsConsolePage } from "@/pages/ops/OpsConsolePage";

export function App() {
  return (
    <Routes>
      {/* ── Web pública ── */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/servicios/:slug" element={<ModuleDetailPage />} />
        <Route path="/planes" element={<PricingPage />} />
        <Route path="/contacto" element={<ContactPage />} />
      </Route>

      {/* Flujo de contratación / auth (sin header público completo) */}
      <Route path="/contratacion" element={<CheckoutPage />} />
      <Route path="/solicitud-recibida" element={<SuccessPage />} />
      <Route path="/ingresar" element={<LoginPage />} />

      {/* ── Portal privado de empresa ── */}
      <Route path="/app" element={<PortalLayout />}>
        <Route index element={<PortalHomePage />} />
        <Route path="configuracion" element={<CompanySettingsPage />} />
        <Route path="modulos/:id" element={<ModuleWorkspacePage />} />
      </Route>

      {/* ── Panel interno de Nivo ── */}
      <Route path="/nivo-ops" element={<OpsConsolePage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

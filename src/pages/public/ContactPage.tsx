import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { SectionHead } from "@/components/ui/misc";
import { brand } from "@/config/brand";

export function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="animate-fadeIn nivo-container py-16 lg:py-20">
      <SectionHead
        tag="Contáctanos"
        title="Hablemos sobre tu empresa"
        subtitle="Cuéntanos qué necesitas y un asesor te contactará. También puedes escribirnos o llamarnos directamente."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Datos de contacto */}
        <div className="space-y-4">
          {[
            {
              icon: Phone,
              label: "Teléfono",
              value: brand.contact.phone,
              href: `tel:${brand.contact.phoneE164}`,
            },
            {
              icon: MessageCircle,
              label: "WhatsApp",
              value: brand.contact.phone,
              href: brand.contact.whatsapp,
            },
            {
              icon: Mail,
              label: "Correo",
              value: brand.contact.email,
              href: `mailto:${brand.contact.email}`,
            },
            {
              icon: MapPin,
              label: "Ubicación",
              value: brand.contact.addressCity,
            },
          ].map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-night-border dark:bg-night-800"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300">
                <c.icon size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-ink-faint">
                  {c.label}
                </p>
                {c.href ? (
                  <a
                    href={c.href}
                    className="font-semibold text-ink hover:text-primary-600 dark:text-white"
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="font-semibold text-ink dark:text-white">
                    {c.value}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className="rounded-lg border border-primary-200 bg-primary-50 p-5 text-sm text-ink-soft dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-slate-300">
            Atención comercial de lunes a viernes. Respondemos las solicitudes
            en el siguiente día hábil.
          </div>
        </div>

        {/* Formulario */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-card dark:border-night-border dark:bg-night-800">
          {sent ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 size={48} className="mb-4 text-accent-500" />
              <h3 className="font-heading text-xl font-bold text-ink dark:text-white">
                ¡Mensaje enviado!
              </h3>
              <p className="mt-2 max-w-xs text-sm text-ink-soft dark:text-slate-400">
                Gracias por escribirnos. Un asesor de {brand.name} te contactará
                pronto. (Demostración: no se envía información real.)
              </p>
              <Button
                variant="secondary"
                className="mt-5"
                onClick={() => setSent(false)}
              >
                Enviar otro mensaje
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre" required>
                  <Input required placeholder="Tu nombre" />
                </Field>
                <Field label="Empresa" required>
                  <Input required placeholder="Nombre de tu empresa" />
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Correo" required>
                  <Input
                    type="email"
                    required
                    placeholder="nombre@empresa.com"
                  />
                </Field>
                <Field label="Teléfono" required>
                  <Input type="tel" required placeholder="300 123 4567" />
                </Field>
              </div>
              <Field label="Módulo de interés">
                <Select defaultValue="">
                  <option value="" disabled>
                    Selecciona un módulo
                  </option>
                  <option>RRHH · Flow Desk</option>
                  <option>Productividad</option>
                  <option>Contabilidad</option>
                  <option>Inventarios</option>
                  <option>Costos</option>
                  <option>Varios módulos</option>
                </Select>
              </Field>
              <Field label="Mensaje">
                <textarea
                  rows={4}
                  placeholder="Cuéntanos qué necesitas…"
                  className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:border-night-border dark:bg-night-900 dark:text-slate-100"
                />
              </Field>
              <Button type="submit" block size="lg">
                Enviar mensaje
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

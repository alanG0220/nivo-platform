# Nivo · Plataforma empresarial modular

**Nivo** es una plataforma SaaS empresarial modular pensada para empresas de
Colombia y Latinoamérica. Una empresa contrata uno o varios módulos y administra
su operación desde un portal privado único, con aislamiento total de datos entre
empresas.

Esta es la **Fase 1: frontend de demostración** — interfaz completa, navegable y
responsive, con **datos simulados**. La arquitectura está preparada para conectar
después **Supabase** (autenticación, base de datos, almacenamiento y permisos vía
RLS), **Wompi** (pagos) y un servicio de **correo** (notificaciones y credenciales).

> ⚠️ No hay pagos reales, IA real ni backend en esta fase. Todos los datos son
> ficticios y las acciones (aprobar, activar, pagar) son simuladas.

---

## Stack

- **Vite + React 18 + TypeScript**
- **React Router** para el enrutamiento
- **Tailwind CSS** con design tokens de marca (tema claro/oscuro)
- **lucide-react** para íconos
- Capa de datos desacoplada (`DataProvider`) lista para intercambiar mock ↔ Supabase

## Requisitos

- Node.js 20 o superior

## Puesta en marcha

```bash
npm install
npm run dev        # servidor de desarrollo (http://localhost:5173)
npm run build      # build de producción → dist/
npm run preview    # previsualiza el build
```

> Nota: este proyecto se creó en un entorno sin acceso al registro de npm, por lo
> que las dependencias no se instalaron ni se compiló allí. Ejecuta `npm install`
> en tu máquina o deja que Netlify lo haga en el despliegue.

## Módulos

| Módulo                                       | Estado       | URL pública                |
| -------------------------------------------- | ------------ | -------------------------- |
| RRHH · Flow Desk                             | Disponible   | `/servicios/rrhh`          |
| Productividad                                | Disponible   | `/servicios/productividad` |
| Contabilidad                                 | Próximamente | `/servicios/contabilidad`  |
| Inventarios (con captura de facturas por IA) | Próximamente | `/servicios/inventarios`   |
| Costos (recetas con regla de tres)           | Próximamente | `/servicios/costos`        |

Inventarios y Costos están **conectados**: Costos define la receta de cada
producto (insumos y cantidades) y calcula el costo unitario y el precio mínimo de
venta; Inventarios descuenta esos insumos al registrar ventas (captura de factura
por IA en la hoja de ruta).

## Rutas principales

**Web pública**

- `/` — Inicio
- `/nosotros` — Quiénes somos
- `/servicios` y `/servicios/:slug` — Servicios y detalle de módulo
- `/planes` — Planes (selector de periodo + multiselección + resumen)
- `/contacto` — Contáctanos
- `/contratacion` — Solicitud/contratación en 5 pasos
- `/solicitud-recibida` — Confirmación
- `/ingresar` — Iniciar sesión (con selector de rol de demostración)

**Portal privado** (requiere "iniciar sesión" en la demo)

- `/app` — Inicio / resumen
- `/app/configuracion` — Configuración de empresa (**solo Propietario**)
- `/app/modulos/:id` — Espacio de trabajo de cada módulo

**Panel interno de Nivo**

- `/nivo-ops` — Consola de operaciones (solicitudes, KPIs, acciones)

> Para explorar el portal privado, entra a `/ingresar` y usa el **selector de
> roles de demostración** (Propietario / Administrador / Usuario), o entra al
> panel interno con el botón "Nivo Ops".

## Roles y permisos (RBAC)

Tres roles: **Propietario (owner)**, **Administrador (admin)** y **Usuario (user)**.
El modelo separa _rol_ (nivel general) de _permiso_ (acción concreta por módulo).

Principios: mínimo privilegio, denegar por defecto, aislamiento por empresa,
módulo activo obligatorio, validación en backend (RLS) y auditoría. Ver:

- `src/data/rbac.ts` — roles, catálogo de permisos y matriz por rol
- `src/types/domain.ts` — contratos de datos

La matriz de permisos es editable visualmente en `/app/configuracion` (pestaña
"Matriz de permisos").

## Estructura del proyecto

```
src/
  config/brand.ts         Nombre, contacto, descuentos, formatCOP()
  types/domain.ts         Tipos de dominio (contratos compartidos mock/Supabase)
  data/
    modules.ts            Catálogo de los 5 módulos
    rbac.ts               Roles, permisos y matriz
    mock.ts               Datos simulados (empresa, usuarios, solicitudes…)
  services/
    dataProvider.ts       Capa de datos desacoplada (punto de intercambio a Supabase)
    pricing.ts            Cálculo de cotización (descuentos + IVA)
  store/AppStore.tsx      Estado global (tema, sesión demo, selección de módulos)
  components/
    ui/                   Componentes reutilizables (Button, Card, Badge, Modal…)
    layout/               Layouts públicos y del portal
  pages/
    public/               Páginas de la web pública
    portal/               Portal privado (+ modules/ para cada módulo)
    ops/                  Panel interno de Nivo
```

## Cómo conectar el backend (fases siguientes)

La capa de datos está aislada tras `getDataProvider()` en
`src/services/dataProvider.ts`. Para conectar Supabase:

1. Crear `SupabaseDataProvider` que implemente la interfaz `DataProvider`.
2. Cambiar una línea en `getDataProvider()` para devolver esa implementación.
3. Poblar `session` en `AppStore` desde Supabase Auth.
4. Definir políticas **RLS** y funciones SQL con los mismos códigos de permiso de
   `src/data/rbac.ts`, aplicando la secuencia de validación:
   usuario autenticado → pertenece a la empresa → módulo activo → tiene el permiso.

**Pagos (Wompi):** el paso 5 de `/contratacion` está preparado para incrustar el
widget de Wompi. Hoy el botón "Pagar y enviar solicitud" es simulado.

**Correo:** al aprobar/activar una solicitud en `/nivo-ops` se dispararía el envío
de credenciales al responsable (hoy es una acción simulada).

## Despliegue en Netlify

El repositorio incluye `netlify.toml` con el comando de build, la carpeta
publicada (`dist`) y el redirect SPA. Conecta el repo en Netlify y despliega; no
requiere configuración adicional para la Fase 1.

---

© Nivo Plataforma S.A.S. — Demostración. Datos ficticios.

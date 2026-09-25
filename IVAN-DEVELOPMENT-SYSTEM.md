# IVAN-DEVELOPMENT-SYSTEM · ivangarcia.pro

> Cómo se construye. Qué y por qué → `PROJECT-BRIEF.md` · Cómo se ve → `IVAN-DESIGN-SYSTEM.md`.

---

## 1. Stack

| Pieza | Elección | Motivo |
|---|---|---|
| Framework | **Astro** (última estable al instalar), `output: 'static'` | HTML estático = lo más rápido y barato de servir |
| Lenguaje | TypeScript `strict` | Props y esquemas tipados |
| Estilos | **CSS moderno, sin framework** (decisión 2026-09-25): variables CSS (`tokens.css`), `@layer`, nesting, `clamp()`, container queries, `:has()` y `<style>` con ámbito de Astro por componente. **Stylelint** obliga a usar los tokens | Marca muy a medida, cero dependencias en runtime, control total |
| CMS | **Keystatic** (contenido en archivos dentro del repo) | Edición de toda la web sin base de datos |
| Contenido | Astro Content Collections (loader `glob`) con esquemas Zod, que leen los mismos archivos que escribe Keystatic | Tipado y validación en el build |
| Interactividad | JS vanilla en `<script>` de Astro. Sin framework en la web pública (React solo lo usa el panel de Keystatic) | JS mínimo |
| Imágenes | `astro:assets` (`<Image>` / `<Picture>`, AVIF + WebP, `widths`, `sizes`, lazy, dimensiones explícitas) | LCP y CLS |
| Fuentes | Auto-alojadas en WOFF2, con subset latin + latin-ext (á é í ó ú ü ñ ¿ ¡ « » ✦ →), `font-display: swap` y preload de Clash Display 600 | Sin dependencias externas |
| SEO | `@astrojs/sitemap`, `robots.txt`, JSON-LD por página | — |
| Email marketing | **MailerLite** | UE, RGPD, grupos y automatizaciones |
| Formularios | Endpoint PHP en Hostinger (`/api/*.php`) | Ver §8 |
| Analítica | GTM + GA4 con Consent Mode v2 | Eventos de §9 |
| Código | **GitHub** | Historial + Keystatic en modo GitHub |
| Hosting | **Hostinger Cloud Startup** | Predicar con el ejemplo; LiteSpeed + CDN |

> Licencias: Clash Display y Satoshi (Fontshare, uso comercial gratuito; verificar la licencia al descargar y guardarla en `/src/assets/fonts/LICENSES`), Instrument Serif y JetBrains Mono (OFL).

---

## 2. Dónde vive cada cosa (no hay base de datos)

| Dato | Dónde se guarda |
|---|---|
| Textos, servicios, precios, casos, testimonios, guías, recursos, FAQ, ajustes | **Archivos en el repo** (`src/content/**`, en Markdown/MDOC/YAML/JSON) versionados en GitHub. Keystatic los edita y hace commit |
| Imágenes de contenido | `src/assets/**`, en el repo, optimizadas en el build |
| Suscriptores de la newsletter | **MailerLite** (grupo «Newsletter» + campos `source`, `placement`, `lead_magnet`) |
| Solicitudes de prototipo y leads del servicio | **MailerLite** (grupo «Prototipo») + **email a info@ivangarcia.pro** con todos los datos. MailerLite hace de CRM inicial |
| Métricas | GA4 |
| Secretos (API key de MailerLite, SMTP) | Fuera de `public_html` en Hostinger (`config.php` fuera del webroot) y en GitHub Secrets para el CI. **Nunca en el repo** |

Si más adelante hace falta un CRM de verdad (pipeline de ventas), el endpoint PHP solo cambia de destino.

---

## 3. Estructura del proyecto

```
/
├─ PROJECT-BRIEF.md · IVAN-DESIGN-SYSTEM.md · IVAN-DEVELOPMENT-SYSTEM.md · README.md
├─ astro.config.mjs          # integración Keystatic condicional (§6)
├─ keystatic.config.ts       # esquema del CMS (§6)
├─ public/
│  ├─ fonts/                 # woff2 subset
│  ├─ api/                   # endpoints PHP: newsletter.php, prototipo.php
│  ├─ .htaccess              # caché, compresión, redirecciones, cabeceras de seguridad
│  ├─ robots.txt · favicon.svg · og/…
├─ src/
│  ├─ styles/
│  │  ├─ tokens.css          # variables CSS del Design System (única fuente)
│  │  └─ global.css          # @layer reset, base, layout, utilities; prose; foco
│  ├─ lib/
│  │  ├─ site.ts             # constantes de marca, datos legales, URLs
│  │  ├─ affiliate.ts        # buildAffiliateUrl() + metadatos de tracking
│  │  ├─ analytics.ts        # push al dataLayer respetando el consentimiento
│  │  └─ seo.ts              # helpers de JSON-LD
│  ├─ components/
│  │  ├─ ui/                 # primitivos del manual: Button, Eyebrow, Chip, Logo, Monogram,
│  │  │                      #   OutlineNumber, GoldRibbon, Glow, BrowserFrame, Toast,
│  │  │                      #   NewsletterForm, AffiliateCard, Metric, PromptBlock, VideoFacade
│  │  ├─ testimonials/       # diseños intercambiables: Carousel (activo), Constellation, SingleVoice,
│  │  │                      #   BeforeAfter, Wall, MessageStack (catálogo en /lab/testimonios)
│  │  ├─ sections/           # bloques de página: Hero, Works, LearnFree, ServiceTeaser,
│  │  │                      #   About, NewsletterSection, …
│  │  ├─ forms/              # PrototypeForm, Field, RadioGroup
│  │  └─ seo/                # SeoHead, JsonLd, Breadcrumbs
│  ├─ layouts/
│  │  └─ BaseLayout.astro    # head SEO, fuentes, header, footer, banner de cookies, CTA sticky
│  ├─ content/               # archivos editados por Keystatic
│  │  ├─ pages/              # singletons: home.yaml, diseno-web.yaml, settings.yaml
│  │  ├─ services/ · plans/ · cases/ · testimonials/ · faqs/
│  │  ├─ resources/ · guides/
│  ├─ content.config.ts      # colecciones + esquemas Zod
│  └─ pages/
│     ├─ index.astro
│     ├─ diseno-web.astro            (siguiente fase)
│     ├─ recursos/ · guias/          (más adelante)
│     ├─ aviso-legal.astro · privacidad.astro · cookies.astro · afiliacion.astro
│     └─ 404.astro
```

**Convenciones**
- Componentes `.astro` con `interface Props` tipada y un comentario de uso al principio:
  ```astro
  ---
  /**
   * Button · CTA del manual. Un único `variant="gold"` por pantalla.
   * <Button href="/recursos" variant="gold" arrow cta="hero_learn">Aprender gratis</Button>
   */
  ```
- Ningún color, fuente, radio ni espaciado «a mano»: siempre `var(--token)` (lo vigila Stylelint).
- El texto visible sale de `src/content` (editable), no escrito a mano en los componentes, salvo microcopy de sistema (errores, aria-labels).
- Placeholders siempre visibles con el formato `[…]`.

---

## 4. CSS moderno: tokens y arquitectura

**Capas** (`global.css`): `@layer reset, tokens, base, layout, components, utilities;`
- `reset`: reset moderno mínimo.
- `tokens`: `@import "./tokens.css" layer(tokens);`
- `base`: `html/body` (fondo, color, `color-scheme: dark`), tipografía base, `::selection`, `:focus-visible`, enlaces, `prefers-reduced-motion`.
- `layout`: `.container`, `.section`, `.section-head` (patrón del manual).
- `components`: solo lo compartido que no pertenece a un componente (`.prose` para guías).
- `utilities`: pocas y explícitas: `.visually-hidden`, `.serif-em`, `.mono`.
- El resto vive en el `<style>` con ámbito de cada componente `.astro`.

**`tokens.css`**: todas las variables del Design System (color `--c-*`, fuentes `--f-*`, escala fluida `--fs-*`, espaciado `--s-1…--s-9` con base 4, `--gutter`, `--container`, `--section-y`, radios `--r-*`, `--shadow-cta`, `--ease`, duraciones `--t-*`).

**Stylelint** (`stylelint-config-standard` + `stylelint-declaration-strict-value`): exige `var()` en color, fondo, borde, fuente y radio (se permiten `0`, `inherit`, `currentColor`, `transparent`). Solo `tokens.css` queda excluido. `npm run lint:css` forma parte de `npm run check` y del CI.

**Reglas**
- Mobile-first; media queries por rango (`@media (width >= 48rem)`) y container queries en componentes que cambian según su hueco.
- Unidades lógicas (`margin-inline`, `padding-block`).
- Animar solo `transform`, `opacity` y `background-position` (barrido del oro).
- Sin `!important` salvo `.visually-hidden` y reduced-motion.

**Reutilizar con otra marca:** cambiar solo `tokens.css`, las fuentes de `public/fonts`, `src/lib/site.ts` y los contenidos. Los componentes no conocen valores concretos.

---

## 5. Contenido: colecciones

| Colección | Campos clave |
|---|---|
| `pages` (singletons) | Home: hero (h1, verbos, sub, CTA), cinta, textos de cada sección · `settings`: redes, YouTube, enlace de afiliado, datos legales, GTM ID |
| `services` | slug, nombre, para quién, beneficio, incluye[], orden |
| `plans` | servicio, modalidad (`unico` · `fraccionado` · `renting`), precio, cuota inicial, cuota mensual, meses (24), incluye[], no incluye[], `provisional: boolean` |
| `cases` | título, cliente, url, sector, qué pedía, qué se hizo, resultado (solo real, opcional), imágenes (antes/después), destacado |
| `testimonials` | cita, nombre, negocio, url, foto (opcional), servicio relacionado |
| `faqs` | pregunta, respuesta, página (`diseno-web`, …) |
| `resources` | título, slug, tipo (`tutorial`, `prompt`, `checklist`, `plantilla`), youtubeId, resumen, herramientas[], prompt, requiere email (`gated`), grupo de MailerLite, relacionados[], guía pilar, fecha |
| `guides` | título, slug, descripción, cuerpo (MDOC), keyword, relacionados[], fecha, actualizado |

Los precios provisionales llevan `provisional: true` → se muestran con la nota «Precio orientativo».

---

## 6. Keystatic

- **Modo local** (`npm run dev` → `http://localhost:4321/keystatic`): edita archivos del repo; se guarda con commit + push.
- **Modo GitHub (online):** panel en **`admin.ivangarcia.pro`**, desplegado como app Node.js en Hostinger (plan Cloud) con el adaptador `@astrojs/node`. Cada guardado hace commit en GitHub → se dispara el despliegue de la web pública.
- **La web pública nunca incluye Keystatic:** la integración se carga de forma condicional:
  ```js
  const withAdmin = process.env.KEYSTATIC === 'true' || process.argv.includes('dev');
  integrations: [ ...(withAdmin ? [react(), keystatic()] : []), sitemap() ]
  ```
  Build público: `astro build` (estático). Build del panel: `KEYSTATIC=true astro build` con el adaptador Node.
- Comprobar en hPanel que Cloud Startup admite apps Node.js antes de configurar el panel online. Hasta entonces, se edita en local.

---

## 7. Despliegue (GitHub → Hostinger)

1. Push a `main` (manual o desde Keystatic).
2. GitHub Actions: `npm ci` → `npm run check` (astro check + lint) → `npm run build`.
3. Subida de `dist/` a `public_html` de Hostinger por SSH/rsync (credenciales en GitHub Secrets), sin tocar `/api/config` fuera del webroot.
4. Purga de la caché del CDN de Hostinger si está activo.

`.htaccess` (LiteSpeed/Apache):
- `Cache-Control: public, max-age=31536000, immutable` para `/_astro/*` y `/fonts/*`; `max-age=0, must-revalidate` para HTML.
- Brotli/Gzip, redirección a HTTPS y sin `www`, `ErrorDocument 404 /404.html`.
- Cabeceras: `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` y CSP compatible con GTM y YouTube-nocookie.

---

## 8. Formularios

**Newsletter** (`NewsletterForm`) → `POST /api/newsletter.php`
- Campos: `email`, ocultos `source`, `placement`, `lead_magnet`, honeypot `website` (vacío) y timestamp mínimo (más de 2 s).
- PHP: valida, descarta si hay honeypot, llama a la API de MailerLite (suscriptor + grupo + campos), con **doble opt-in** activado en MailerLite, y responde en JSON.
- UI: validación accesible en el cliente (sin `alert`) → «Enviando…» → éxito «Revisa tu email para confirmar» / error con cómo corregirlo. Funciona sin JS (POST normal + página de respuesta).

**Prototipo gratis** (`PrototypeForm`) → `POST /api/prototipo.php`
- Campos: nombre, email, negocio/sector, web actual (opcional, URL), tipo (radio: corporativa, marca personal, landing), objetivo (1 frase), aceptación de privacidad (checkbox obligatorio, sin marcar), honeypot.
- PHP: valida → MailerLite (grupo «Prototipo») + email a `info@ivangarcia.pro` → JSON.
- Evento `prototype_request` al tener éxito.
- **Cupo semanal (10):** el endpoint lleva la cuenta de las solicitudes válidas de la semana ISO en curso (archivo fuera del webroot o consulta al grupo de MailerLite). `GET /api/cupos.php` → `{ restantes, semana }`, con caché de 60 s. La página pinta el cupo con un script mínimo. Sin JS, sin cupo, se muestra el formulario igualmente y el servidor decide. Con 0 plazas: formulario de lista de espera (grupo «Prototipo · espera»).

Rate limit básico por IP en PHP (archivo temporal) y en ningún caso se exponen claves en el cliente.

---

## 9. Analítica y afiliación

`src/lib/analytics.ts` → `track(event, params)` hace `dataLayer.push` **solo si hay consentimiento** de analítica; si no, no hace nada. Consent Mode v2 con todo denegado por defecto.

| Evento | Parámetros |
|---|---|
| `cta_click` | `cta_id`, `placement`, `page_type`, `intent` (`learn` · `service` · `newsletter` · `affiliate`) |
| `affiliate_click` | `partner` (`hostinger`), `source_type` (`video` · `guide` · `resource` · `home`), `source_slug`, `video_id`, `placement`, `campaign` |
| `newsletter_signup` | `form_id`, `placement`, `lead_magnet` |
| `prototype_request` | `service_type`, `placement` |
| `video_play` | `video_id`, `source_slug` |

Todos los CTA pasan por `Button` / `AffiliateLink` con `data-cta` + `data-placement`; un único listener delegado en `BaseLayout` envía los eventos.

**Afiliación** (`src/lib/affiliate.ts`):
```ts
export const HOSTINGER_URL = 'https://www.hostinger.com/es/refer?REFERRALCODE=IVANGARCIAPRO';
export function buildAffiliateUrl(meta: AffiliateMeta): string {
  // Hoy el enlace de referido no admite subID → devolvemos la URL tal cual
  // y la atribución viaja en el evento affiliate_click.
  // Si se pasa al programa de afiliados con subID, se añade aquí.
  return HOSTINGER_URL;
}
```
`<AffiliateLink>` siempre renderiza `rel="sponsored noopener"` + `target="_blank"` + marca visible «Enlace de afiliado».

---

## 10. SEO técnico

- `SeoHead`: `<title>` y descripción únicos, canonical, Open Graph + Twitter Card con imagen por página (1200×630, estilo del manual), `theme-color #090807`, `lang="es"`.
- `JsonLd`: `Person` + `WebSite` en todas las páginas; `Service`/`Offer`, `VideoObject` (+ `Clip`), `Article`, `BreadcrumbList` y `FAQPage` según la página.
- Un H1 por página, HTML semántico (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`) y breadcrumbs en todas las páginas salvo la Home.
- Sitemap automático; `robots.txt` que excluye `/api/`; en `admin.ivangarcia.pro`, `noindex` + `Disallow: /`.

---

## 11. Presupuesto de calidad (no negociable)

| Métrica | Objetivo |
|---|---|
| Lighthouse móvil (rendimiento, accesibilidad, buenas prácticas, SEO) | **≥ 95** en las cuatro |
| LCP | **< 2 s** (el H1 de la Home es texto → preload de Clash 600) |
| CLS | **< 0,05** (dimensiones explícitas, `size-adjust` en los fallbacks de fuentes) |
| JS por página | Objetivo < 15 KB gzip en la web pública (sin contar GTM) |
| Peso de fuentes | < 150 KB en total, subset |
| Accesibilidad | WCAG 2.2 AA: contraste, foco visible, teclado, `alt` descriptivos, objetivos ≥ 24px (44 en táctil), `prefers-reduced-motion`, pausa en contenido en movimiento |
| Responsive | 360 → 2560 px sin scroll horizontal. El móvil se diseña, no se encoge |
| Terceros | GTM y YouTube se cargan solo tras consentimiento o interacción (vídeo con fachada, `youtube-nocookie.com`) |

---

## 12. Flujo de trabajo por página

1. Leer los tres .md.
2. Construir **una página** (la Home primero).
3. Revisión propia: escritorio + móvil (capturas), Lighthouse, teclado, reduced-motion, checklist anti-genérica (Design System §13).
4. Entregar al cliente → validación → siguiente página.

**Comandos** (tras la instalación):
```
npm run dev        # desarrollo + Keystatic local en /keystatic
npm run check      # astro check + tipos
npm run build      # build estático público
npm run preview    # servir dist/
```

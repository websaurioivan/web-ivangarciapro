# ivangarcia.pro

Web de Iván García: **webs que impactan, venden y posicionan**.
Astro (estático) + CSS moderno con tokens + Keystatic. Alojada en Hostinger.

> Documentación del proyecto:
> - [`PROJECT-BRIEF.md`](PROJECT-BRIEF.md): qué se construye y por qué (negocio, públicos, decisiones).
> - [`IVAN-DESIGN-SYSTEM.md`](IVAN-DESIGN-SYSTEM.md): tokens, componentes y reglas de diseño.
> - [`IVAN-DEVELOPMENT-SYSTEM.md`](IVAN-DEVELOPMENT-SYSTEM.md): stack, estructura, SEO, analítica y despliegue.

## Requisitos

- Node.js **22.12 o superior** (recomendado 24 LTS).

## Puesta en marcha

```bash
npm install
npm run dev          # http://localhost:4321  ·  panel de contenido: http://localhost:4321/keystatic
npm run check        # tipos (astro check) + CSS (stylelint: obliga a usar tokens)
npm run build        # web estática en dist/
npm run preview      # sirve dist/
```

## Editar contenido

Abre `http://localhost:4321/keystatic` con `npm run dev`. Todo se guarda como archivos en `src/content/` (sin base de datos):

| En Keystatic | Archivo |
|---|---|
| Home | `src/content/pages/home.json` |
| Diseño web (servicio) | `src/content/pages/diseno-web.json` |
| Ajustes generales (datos legales, Hostinger, GTM, reseñas, cupo de prototipos) | `src/content/pages/settings.json` |
| Servicios y precios | `src/content/services/*.yaml` |
| Testimonios · Casos · Recursos | `src/content/{testimonials,cases,resources}/*.yaml` |

Después: `git commit` + `git push` → se despliega solo.

Los textos entre `[corchetes]` son **placeholders pendientes de datos reales**. En los títulos, las palabras entre `*asteriscos*` salen en cursiva serif.

## Despliegue (GitHub → Hostinger)

1. Cada push a `main` ejecuta `.github/workflows/deploy.yml`: `npm ci` → `npm run check` → `npm run build` y publica `dist/` en la rama **`hostinger-deploy`**.
2. En Hostinger (hPanel → **Avanzado → Git**): repositorio `https://github.com/websaurioivan/web-ivangarciapro.git`, rama **`hostinger-deploy`**, directorio vacío (raíz del dominio). Activa el **despliegue automático** (webhook) para que se actualice en cada push.
3. **Endpoints PHP** (`/api/*.php`): copia `server/ig-config.example.php` a `/home/<usuario>/ig-config.php` (**fuera** de `public_html`) y rellena el token y los grupos de MailerLite.

### Pruebas → producción
El workflow compila con `PUBLIC_STAGING: 'true'`: todas las páginas llevan `noindex` y `robots.txt` bloquea todo. **Al pasar al dominio real**, cambia esa línea a `'false'` en `.github/workflows/deploy.yml`.

## Reutilizar con otra marca

Cambia `src/styles/tokens.css` (colores, tipografías, escala, radios), las fuentes de `public/fonts/`, `src/lib/site.ts` y el contenido de `src/content/`. Los componentes solo usan tokens.

## Estructura

```
src/
  components/  ui/ (primitivos del manual) · sections/ · service/ · testimonials/ · forms/ · layout/ · seo/
  content/     contenido editable (Keystatic)
  layouts/     BaseLayout, LegalLayout
  lib/         site, seo, analytics, text, stack, testimonials
  pages/       index, diseno-web, legales, 404, lab/testimonios, robots.txt
  styles/      tokens.css, global.css
public/        fuentes, favicon, OG, .htaccess, api/*.php
server/        plantilla de configuración PHP (no se publica)
```

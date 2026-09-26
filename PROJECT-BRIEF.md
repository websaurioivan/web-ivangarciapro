# PROJECT-BRIEF · ivangarcia.pro

> Documento maestro del proyecto. Fuente de verdad para **qué** se construye y **por qué**.
> Diseño → `IVAN-DESIGN-SYSTEM.md` · Desarrollo → `IVAN-DEVELOPMENT-SYSTEM.md`.
> Última actualización: 2026-09-25.

---

## 0. Estado y fuentes

| Fuente | Estado |
|---|---|
| Manual de marca «Identidad visual · Iván García · Oro» v2.0 (`Downloads/Identidad visual Iván García oro/…Oro.dc.html`) | Leído completo. Fuente de verdad visual |
| Briefing del cliente (pegado en el chat) | **Leído hasta** «ARQUITECTURA → Home → Presentar: propuesta, trabajos, método, contenido, recu…». El texto llegó cortado ahí. Lo posterior no se ha recibido |
| Respuestas del cliente en el chat (2026-09-25) | Incorporadas en §12 (registro de decisiones) |
| Captura de newsletter (hero lima centrado) | **Solo como idea de captación de newsletter.** No se toma ningún elemento de diseño de ella |

**Reglas de trabajo**
- No inventar: ni cifras, ni reseñas, ni clientes, ni resultados. Si falta un dato → `[placeholder entre corchetes]` visible.
- Paso a paso: **primero la Home, validación, y después la siguiente página**. No construir lead magnets ni páginas no pedidas.
- Todo el contenido editable desde Keystatic.

---

## 1. Marca y posicionamiento

- **Marca:** Iván García (marca personal). Dominio: **ivangarcia.pro**.
- **Qué hace:** creación de páginas web con inteligencia artificial, diseño web orientado a conversión y posicionamiento en Google.
- **Idea central:** **Webs que impactan, venden y posicionan.**
- **Promesa:** particulares, emprendedores, autónomos y empresas consiguen webs de calidad profesional eliminando gran parte de la complejidad, el coste y la dependencia técnica.
- **Intersección:** **DISEÑO × IA × GOOGLE × NEGOCIO**.
- **No** posicionarlo como «otro diseñador web». Construir la percepción de **referencia en español** para aprender y contratar webs visualmente excepcionales, rápidas, orientadas a negocio y preparadas para Google.
- **Idioma:** solo español. Sin selector de idiomas. Estructura preparada para añadir idiomas en el futuro.

---

## 2. Modelo de negocio: cuatro motores conectados

### 2.1 Contenido y YouTube (adquisición)
Temas: creación de webs con IA, diseño web, prompts, herramientas, SEO, Google, hosting, automatización, casos prácticos y proyectos completos desde cero.

Los vídeos **no se limitan a incrustarse**. Cada vídeo importante se convierte en un recurso indexable (`/recursos/[slug]`) con:
introducción · vídeo · resumen · herramientas utilizadas · prompt · recursos · enlaces relacionados · CTA · artículos relacionados.

Flujos: **YouTube → Web** y **Google → Web → YouTube**.

### 2.2 Afiliación Hostinger (monetización)
- Enlace actual: `https://www.hostinger.com/es/refer?REFERRALCODE=IVANGARCIAPRO`
- Recorrido: quiere crear web → descubre tutorial → ve cómo Iván lo construye → obtiene prompt/recurso → **necesita publicarla → Hostinger**.
- **Nunca artificial.** Aparece exactamente cuando resuelve una necesidad real. Ejemplo: «Ya tenemos nuestra web. Ahora necesitamos publicarla para que cualquiera pueda acceder a ella.»
- Páginas para búsquedas comerciales de hosting **solo donde haya oportunidad SEO legítima**.
- **Tracking:** el enlace de referido no admite subID. La atribución se mide en nuestro lado con el evento `affiliate_click` (vídeo origen, artículo origen, recurso, CTA, ubicación y campaña). Si más adelante se entra en el programa de afiliados con subID, se cambia en un único punto de configuración.
- Enlaces de afiliado **siempre identificados** (voz del manual: «Enlace de afiliado: yo gano comisión, tú no pagas más»). `rel="sponsored"`.
- **Coherencia:** la propia web se aloja en Hostinger (plan Cloud Startup del cliente). «El hosting que uso yo» tiene que ser verdad.

### 2.3 Servicio profesional de diseño web
Para quien no quiere hacerla: **«¿Prefieres que lo haga por ti?»**

- **No vender tecnología**: nada de Astro, frameworks ni código en el discurso.
- **Vender:** diseño único, impacto visual, conversión, velocidad, SEO, facilidad, tranquilidad, rapidez de ejecución, mínima dependencia técnica y excelente experiencia móvil.
- **Servicios:** web corporativa · marca personal · landing page.
- **Landing independiente** del servicio (`/diseno-web`). La Home solo lo presenta y dirige hacia ella.
- Ver §6 para modalidades, precios, renting y prototipo.

### 2.4 Newsletter: activo central
- **Decisión 2026-09-25:** la newsletter es **una sección de la Home**, no una landing propia (por ahora no existe `/newsletter`). El archivo `/newsletter/[slug]` queda aplazado.
- No vender «recibir emails». Vender **el beneficio de pertenecer**.
- **Concepto:** **Una web mejor cada semana.**
- **Promesa (2026-09-26):** un email a la semana con consejos, ideas y recomendaciones para tener una web **impactante**, que **convierte visitas en clientes**, **automatizada** y que **posiciona en Google** y genera visibilidad.
- **Sin incentivo por ahora.** El regalo flotante («¿Quieres un regalo?», formato 3-2-1) está construido pero **desactivado** (`src/content/pages/gift.json` → `enabled: false`) hasta decidir el lead magnet.
- **Frecuencia comunicada:** «cada semana». El día se define más adelante.
- **Proveedor:** MailerLite.
- Microcopy bajo el formulario: **Gratis · Sin spam · Puedes salir cuando quieras.**
- **Idea tomada de la captura:** bloque protagonista, con una promesa potente y concreta, foto real de Iván y formulario en una sola línea sin fricción. El diseño sale del manual Oro.
- **Botón de newsletter:** no va en el bloque de servicios, donde el único CTA es el prototipo gratis (§6.4).

**Cinco funciones de la newsletter**
1. **Audiencia propia:** menos dependencia del algoritmo de YouTube, de Google y de las redes.
2. **Potenciar YouTube:** nunca «Nuevo vídeo». Cada email entrega valor por sí mismo y usa el vídeo como ampliación (Email → YouTube).
3. **Afiliación contextual:** concepto → resultado → prompt → vídeo → herramienta para publicar (Hostinger). **Primero valor, después monetización.** No convertir todos los emails en promociones.
4. **Vender servicios:** casos, antes/después, proyectos, procesos, errores habituales, más el CTA «¿Prefieres que lo haga por ti?».
5. **Relación:** que Iván pase de ser «el chico del vídeo» a una referencia recurrente.

**Captación (varios puntos de entrada, no solo un formulario genérico)**
- **Home:** sección visible pero no intrusiva.
- **Recursos como lead magnet:** no bloquear todo. Mantener recursos abiertos para SEO, confianza y enlaces, y pedir el email solo en los de mayor valor. Ejemplos del briefing, **no se construyen hasta que se pidan**: prompt maestro para crear webs profesionales con IA, sistema de diseño web con Astro, checklist SEO antes de publicar, prompt para crear una inmobiliaria completa, plantilla para clínicas, checklist 100/100 en Lighthouse, prompts de los vídeos.
- **Dentro de los artículos:** en contexto y sin popups. Ejemplo: «Cada semana comparto los prompts, herramientas y procesos que estoy utilizando para crear este tipo de webs.» + formulario.
- **Dentro de las páginas de vídeo** (`/recursos/[slug]`): CTA de newsletter junto a Hostinger y los contenidos relacionados.

---

## 3. Flywheels (la arquitectura se diseña alrededor de ellos)

```
YOUTUBE → WEB → RECURSO → NEWSLETTER → NUEVO CONTENIDO → YOUTUBE → HOSTINGER → INGRESOS
GOOGLE → BLOG/RECURSOS → NEWSLETTER → YOUTUBE → HOSTINGER
GOOGLE / YOUTUBE → WEB → SERVICIO → CLIENTE
```

---

## 4. Público objetivo

| Perfil | Desea | Miedos |
|---|---|---|
| **DIY**: quiere crear su propia web | Ahorrar dinero, aprovechar la IA, resultado profesional, aprender rápido, aparecer en Google, independencia | No saber programar ni diseñar, gastar demasiado, perder tiempo, algo amateur, no posicionarse, romper la web, depender de un técnico |
| **Autónomos y empresas** | Más clientes, confianza, diferenciación, visibilidad, rapidez, tranquilidad | Volver a pagar una web que no vende, proyectos eternos, mantenimiento, costes ocultos, proveedores poco accesibles, dependencia técnica |
| **Profesionales que prefieren delegar**: «Quiero este resultado, pero no quiero hacerlo yo» | Tiempo | → Se dirigen al servicio |

---

## 5. Conversiones por intención (no hay una conversión universal)

| Intención | CTA | Destino |
|---|---|---|
| Educativa | **Aprender gratis** / Crear mi web | `/recursos`, `/guias` |
| Recurrente | Únete a la newsletter | Sección newsletter (Home, artículos y recursos) |
| Tutorial | Conseguir el recurso → después **Publicar mi web** | Recurso → Hostinger |
| Comercial | **Quiero mi prototipo gratis** / Quiero mi web | `/diseno-web` y bloque de servicios |

---

## 6. Servicio: oferta comercial

### 6.1 Tipos
Web corporativa · Web de marca personal · Landing page.

### 6.2 Modalidades de pago (confirmado 2026-09-25)
**Todas las modalidades incluyen lo mismo:** hosting, dominio y mantenimiento técnico durante **1 año** (en el renting: mientras dure el renting, *interpretación pendiente de confirmar*), panel para que el cliente edite su web y **entrega en 7 días** (desde la luz verde y la recepción de textos e imágenes).
1. **Pago único.**
2. **Pago fraccionado:** en **3 meses, sin intereses**.
3. **Renting mensual**:
   - **Permanencia de 24 meses** con **cuota inicial** más una cuota mensual.
   - Se puede **pasar a pago único** en cualquier momento.
   - **Cancelar antes de 24 meses** conlleva una **penalización igual al importe completo de la web**.
   - **Al acabar, la web es del cliente.** Si no tiene hosting ni dominio propios, pasa a pagarlos él: Iván le ayuda con sus vídeos a contratar Hostinger y migrarla (sinergia con la afiliación).
- **Ninguna modalidad incluye cambios.** Los hace el cliente desde su panel o los contrata como servicio extra.

**Servicios extra (precio a consultar):** cambios en la web · páginas adicionales · Google Ads · SEO local.

**Prototipo:** entrega en 24 h para pedidos de lunes a jueves; pedidos de viernes a domingo → [lunes, pendiente de confirmar]. Máximo 10 por semana.

**Formulario:** incluye **teléfono / WhatsApp** (obligatorio: convierte más).

**Ámbito:** clientes de **habla hispana**. Sin geolocalizar (sin SEO local de Albacete de momento).

**Precios PROVISIONALES** (editables en Keystatic, pendientes de que el cliente los fije):

| Servicio | Pago único | Fraccionado | Renting (24 meses) |
|---|---|---|---|
| Landing page | [690 €] | [3 × 230 €] | [99 € inicial + 39 €/mes] |
| Marca personal | [1.190 €] | [3 × 397 €] | [149 € inicial + 59 €/mes] |
| Web corporativa | [1.790 €] | [3 × 597 €] | [199 € inicial + 79 €/mes] |

**Qué incluye cada web (estándar provisional, editable):**
- Diseño único; ninguna plantilla.
- Copy orientado a conversión.
- Adaptada a móvil.
- SEO técnico de base: metas, datos estructurados, sitemap y velocidad.
- Formulario de contacto conectado.
- Analítica con consentimiento de cookies.
- Textos legales enlazados. El contenido legal lo aporta el cliente.
- Panel para editar textos e imágenes.
- Formación breve de uso del panel.


### 6.3 Argumento diferencial: sin WordPress, sin mantenimiento
Vender el beneficio: **webs que no necesitan mantenimiento porque no usan WordPress.**

Argumentos, siempre en positivo y sin cifras no verificables:
- Sin plugins que actualizar, que se rompen entre sí o que abren agujeros de seguridad.
- Sin actualizaciones semanales ni sustos del tipo «se me ha caído la web».
- Más rápida por diseño: páginas ligeras que Google premia.
- Menos superficie de ataque: no hay base de datos ni panel de administración expuestos al público.
- Sin pagar cada año licencias de plugins premium, temas y mantenimiento técnico.
- **Con IA, WordPress deja de tener sentido para la mayoría de negocios:** la IA crea diseño y contenido a medida sin arrastrar la complejidad de un CMS pensado hace 20 años. En WordPress, cada mejora añade plugins, peso y coste.

**Tono:** firme pero honesto (voz del manual: «A resultado», sin exageraciones del tipo «el mejor del mundo»). Nunca inventar estadísticas; si se cita un dato, con fuente.

### 6.4 Lead magnet del servicio: Prototipo gratis en 24 horas
- **Solo en los bloques y páginas de servicio.** Es el CTA de oro del bloque de servicios de la Home y de `/diseno-web`.
- **Promesa:** «Recibe un prototipo gratis de tu web en 24 horas. Mira que te guste y, solo entonces, pagas por ella.»
- **Condiciones estándar provisionales** (editables):
  - Prototipo navegable de la página principal, en una URL privada temporal.
  - Plazo: 24 h laborables desde que se recibe la información completa del formulario.
  - Sin compromiso. Si no te convence, no pagas nada.
  - El prototipo sigue siendo propiedad de Iván hasta que se contrate.
  - **Máximo 10 prototipos por semana** (lunes a domingo). Es un compromiso real: el contador debe ser verdadero.
- **Urgencia honesta:** se muestra «Quedan [N] de 10 prototipos esta semana». N sale del número real de solicitudes de la semana (lo calcula el endpoint, ver Development System §8). Con 0 plazas, el formulario pasa a «Lista de espera para la próxima semana». Nunca un contador falso ni fijo.
- **Formulario corto:** nombre · email · teléfono/WhatsApp · negocio/sector · web actual (opcional) · qué necesitas (corporativa / marca personal / landing) · qué quieres conseguir (1 frase) · aceptación de privacidad. Honeypot antispam.
- Microcopy: «Sin compromiso · Respuesta en 24 h laborables · Tus datos solo para preparar el prototipo».

---

## 7. Arquitectura del sitio

| URL | Objetivo | Estado |
|---|---|---|
| `/` | Posicionamiento global, reparto por intención, newsletter y servicio | **Fase actual** |
| `/diseno-web` | Landing del servicio en profundidad + prototipo gratis | Siguiente |
| `/recursos` y `/recursos/[slug]` | Centro de recursos + página complementaria de cada vídeo o lead magnet (p. ej. `/recursos/web-inmobiliaria-ia`) | Más adelante |
| `/guias` y `/guias/[slug]` | Artículos SEO (pilar: «cómo crear una web con IA») | Más adelante |
| `/hosting` (+ `/hosting/hostinger-opiniones` si hay oportunidad SEO) | «El hosting que uso yo»: cómo publicar | Más adelante |
| `/sobre-mi` | E-E-A-T, quién es Iván | Más adelante |
| `/contacto` | Colaboraciones | Más adelante |
| `/aviso-legal`, `/privacidad`, `/cookies`, `/afiliacion` | Legal y transparencia | Con la Home (mínimo) |
| `404` | Con la marca y tres rutas de salida | Con la Home |

Sin `/newsletter` por ahora (ver §2.4).

---

## 8. Home: estructura propuesta (pendiente de validar al construirla)

| # | Sección | Función | CTA de oro de la pantalla |
|---|---|---|---|
| 1 | **Hero**. H1: «Webs que *impactan*, venden y posicionan.» Momento wow propuesto: «Una web, tres verbos» (ver Design System §8) | Captar y demostrar | **Aprender gratis** → `/recursos`. Secundario ghost: «Quiero mi web» → bloque de servicio |
| 2 | Cinta de oro: DISEÑO ✦ IA ✦ GOOGLE ✦ NEGOCIO | Posicionar | — |
| 3 | Trabajos (2–3 reales) | Prueba | — (enlace de texto) |
| 4 | Aprende gratis: vídeo-recurso destacado + recursos + línea «Para publicarla uso Hostinger» | YouTube, email y afiliación | Enlace de texto al recurso |
| 5 | **¿Prefieres que la haga yo?** Tres servicios, modalidades, argumento «sin WordPress, sin mantenimiento», testimonio real | Vender el servicio | **Quiero mi prototipo gratis** |
| 6 | Quién soy (foto real, 3 líneas) | Confianza | — |
| 7 | **Newsletter**: «Una web mejor cada semana», bloque protagonista con foto de Iván | Audiencia propia | **Quiero recibirla** (o equivalente) |
| 8 | Footer con el nombre gigante, legal y aviso de afiliación | — | — |

> El briefing original seguía describiendo la Home («…contenido, recu[rsos]…») y el texto se cortó. Si hay requisitos adicionales en esa parte, deben añadirse aquí.

---

## 9. SEO

| Página | Keyword principal | H1 |
|---|---|---|
| `/` | diseño web con inteligencia artificial + marca «Iván García» | Webs que *impactan*, venden y posicionan |
| `/diseno-web` | diseño web para autónomos y empresas | [a definir con la página] |
| `/recursos` | prompts para crear webs con IA | Recursos para crear tu web con IA |
| `/recursos/[slug]` | búsqueda del vídeo («crear web inmobiliaria con IA») | Título orientado a la búsqueda |
| `/guias/crear-web-con-ia` | cómo crear una página web con IA | Cómo crear una página web con IA, paso a paso |

- Un H1 por página; H2 para secciones o pasos; H3 para elementos.
- Enlazado interno en estrella: pilar ↔ recursos; cada recurso enlaza a 1 pilar, 2 relacionados, la newsletter y el servicio (enlace de texto); hosting ↔ cómo publicar.
- JSON-LD: `Person` (Iván García, con sameAs a YouTube y redes, para distinguirlo de otros «Iván García»), `WebSite`, `Service` + `Offer`, `VideoObject`, `Article`, `BreadcrumbList` y `FAQPage` (solo como estructura; Google ya casi no muestra estos resultados enriquecidos).

---

## 10. Medición
GTM + GA4 con Consent Mode v2. Eventos: `cta_click`, `affiliate_click`, `newsletter_signup`, `prototype_request`, `video_play`. Detalle en el Development System §9.

---

## 11. Datos legales (aviso legal, LSSI)
- **Titular:** Iván García Montes
- **NIF:** 49210035V
- **Domicilio:** Calle Juan de Herrera, 1, Ático D, 02005 Albacete
- **Email:** info@ivangarcia.pro
- **Sitio:** ivangarcia.pro

---

## 12. Registro de decisiones

| Fecha | Decisión |
|---|---|
| 2026-09-25 | Email marketing: **MailerLite** |
| 2026-09-25 | Afiliación: enlace de referido de Hostinger (sin subID → tracking propio) |
| 2026-09-25 | Hosting: **GitHub (código) + Hostinger Cloud Startup (web)**, con despliegue automático |
| 2026-09-25 | CMS: **Keystatic** para textos de toda la web, servicios, testimonios, casos, guías y recursos |
| 2026-09-25 | Rutas de contenido: `/guias` + `/recursos` |
| 2026-09-25 | **CTA de oro del hero de la Home: «Aprender gratis»** |
| 2026-09-25 | Solo español; sin selector de idiomas |
| 2026-09-25 | Newsletter: **sección de la Home**, sin landing propia; «cada semana» |
| 2026-09-25 | Servicio: pago único, fraccionado y renting de 24 meses (§6.2); sin cambios incluidos; panel autogestionable |
| 2026-09-25 | Lead magnet del servicio: **Prototipo gratis en 24 h**, solo en los bloques de servicio |
| 2026-09-25 | Estilos: **CSS moderno sin framework** (sin Tailwind); dependencias solo cuando sean necesarias |
| 2026-09-25 | Cinta de oro lenta (90 s por vuelta). Tarjetas apiladas al hacer scroll en Trabajos y Servicios |
| 2026-09-25 | Testimonios: **carrusel** en la Home (después del bloque de servicio). Las otras 5 versiones quedan como componentes en `src/components/testimonials/` (catálogo en `/lab/testimonios`) |
| 2026-09-25 | `/diseno-web` construida: hero + línea de tiempo, trabajos, miedos resueltos, 4 pasos, servicios, tabla de modalidades, sin WordPress, testimonios antes/después, FAQ y formulario (con lista de espera) |
| 2026-09-25 | Movimiento: se respeta `prefers-reduced-motion` al 100 % (opción A) |
| 2026-09-25 | Prototipos limitados a **10 por semana**, con contador real y lista de espera |
| 2026-09-25 | Argumento diferencial: sin WordPress → sin mantenimiento |
| 2026-09-25 | Método: paso a paso; **Home primero** y validación antes de seguir |

---

## 13. Pendiente del cliente (se usan placeholders mientras tanto)
- [ ] Resto del briefing original (a partir de «Home → …recu»), si existe.
- [ ] Precios definitivos y condiciones exactas del prototipo.
- [ ] Proyectos reales (capturas, qué se pedía, qué se hizo, resultados medidos si los hay).
- [ ] Testimonios reales (nombre, negocio, enlace).
- [ ] Fotos reales de Iván (luz cálida, fondo oscuro; nada de stock).
- [ ] URL del canal de YouTube y redes; 2–3 vídeos para el bloque «Aprende gratis».
- [ ] Contenido de la newsletter de muestra (cuando exista).
- [ ] Cifras de audiencia, solo si son reales.

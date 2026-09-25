# IVAN-DESIGN-SYSTEM · ivangarcia.pro

> Sistema de diseño web derivado del manual «Identidad visual · Iván García · Oro» v2.0.
> **El manual manda.** Este documento lo traslada al medio web, completa lo que el manual no define y fija reglas anti-genéricas.
> Nunca usar colores, fuentes, radios ni espaciados fuera de este sistema.

---

## 1. Concepto

**«Un taller a oscuras donde el oro solo se enciende cuando hay algo que ganar.»**

- Negro cálido, mucho aire, poco color. «Parece caro; no lo es.»
- El **punto de oro** del logo («un piloto encendido») es semántica de todo el sistema: **un punto que brilla significa que algo está vivo, es nuevo o es una acción.**
- **Un único CTA de oro por pantalla.** El resto, ghost o enlace de texto.
- Proporción de color en cualquier pantalla: **70 % negro cálido · 18 % superficies · 8 % texto · 4 % oro.**

---

## 2. Color

| Token CSS | Valor | Uso | Contraste sobre `--bg` |
|---|---|---|---|
| `--c-bg` | `#090807` | Fondo base | — |
| `--c-surface` | `#110F0C` | Tarjetas, bloques, inputs | — |
| `--c-surface-2` | `#1A1713` | Chips, elementos anidados, código, barra sticky | — |
| `--c-line` | `rgba(255,236,200,.08)` | Bordes y divisores | — |
| `--c-line-strong` | `rgba(255,236,200,.12)` | Borde de inputs y chips sobre fondo | — |
| `--c-ghost-border` | `rgba(247,242,232,.18)` | Borde del botón secundario | — |
| `--c-ink` | `#F7F2E8` | Titulares, texto destacado, logo | ~18:1 |
| `--c-text` | `#A9A397` | Párrafos | 7,9:1 |
| `--c-meta` | `#8C867B` | Legal, metadatos, fechas | 5,5:1 |
| `--c-muted` | `#7D776C` | **Solo** texto tachado o decorativo (4,48:1, no AA) | — |
| `--c-gold` | `#F2B92C` | Acción: CTA, enlaces de acción, datos positivos, ✓ | 11:1 |
| `--c-gold-hover` | `#FFD66E` | Hover del botón de oro | — |
| `--c-gold-light` | `#FFE08A` | Hover de enlaces de oro, brillos | — |
| `--c-amber` | `#E9A21A` | **Solo** resplandor difuminado (opacidad 20–35 %). Nunca en bloque | — |
| `--c-error` | `#E8795A` | Errores de formulario (en el manual es el ✕) | 6,9:1 |
| `--c-on-gold` | `#090807` | **Texto sobre oro: siempre negro** | 11:1 |

**Degradados permitidos (solo estos):**
- `--g-gold-text`: `linear-gradient(105deg,#FFE9A8 0%,#F2B92C 30%,#B9801F 55%,#FFD66E 80%,#F2B92C 100%)`, con `background-size:220% 100%`. Solo en la palabra en cursiva serif del H1 y en el nombre gigante del footer.
- `--g-gold-coin`: `radial-gradient(circle at 30% 25%,#FFE9A8 0%,#F2B92C 45%,#B9801F 100%)`. Solo en el monograma «iG».
- `--g-footer-name`: `linear-gradient(180deg,#FFE9A8 0%,#F2B92C 40%,#8A5E17 100%)`.

**Prohibido (manual):** oro sobre claro · blanco sobre oro · degradados de colores · deformar el logo · oro en chips.

**Selección de texto:** fondo oro, texto negro.
**Esquema de color:** solo oscuro (`color-scheme: dark`). Sin modo claro.

---

## 3. Tipografía

| Familia | Rol | Pesos |
|---|---|---|
| **Clash Display** (Fontshare) | Titulares: «grita» | 500 · 600 · 700 |
| **Satoshi** (Fontshare) | Interfaz y párrafos: «explica» | 400 · 500 · 700 |
| **Instrument Serif** *Italic* | Énfasis: «emociona». **1–3 palabras por titular**, nunca frases enteras | 400 italic |
| **JetBrains Mono** | Datos, metadatos, precios, etiquetas técnicas, breadcrumbs | 400 · 500 |

**Escala** (tamaño en px en escritorio / interlineado / tracking):

| Token | Escritorio | Fluido | Interlineado | Tracking | Fuente |
|---|---|---|---|---|---|
| `display` | 120–184 | `clamp(56px, 11vw, 184px)` | 0.88–0.9 | −4.5 % | Clash 600 |
| `h2` | 72–92 | `clamp(38px, 6.4vw, 92px)` | 0.92–0.95 | −4 % | Clash 600 |
| `lead` | 30–62 | `clamp(30px, 4.2vw, 62px)` | 1.04 | −3.5 % | Clash 500 |
| `h3` | 32 | `clamp(24px, 2.6vw, 32px)` | 1.1 | −2 % | Clash 500/600 |
| `body-lg` | 20 | `clamp(17px, 1.5vw, 20px)` | 1.55 | 0 | Satoshi 400 |
| `body` | 18 | 18 (16 en móvil) | 1.6 | 0 | Satoshi 400 |
| `small` | 15 | — | 1.55 | 0 | Satoshi |
| `micro` | 13 | — | 1.5 | 0 | Satoshi |
| `mono` | 12 | — | 1.4 | 0.04em si va en mayúsculas | JetBrains Mono |

- Énfasis serif dentro de un titular: `font-weight:400; letter-spacing:-0.02em; padding-right:.06em` (evita que se corte la cursiva).
- `text-wrap: balance` en titulares y `pretty` en párrafos.
- Ancho de lectura en artículos: 68ch.

---

## 4. Espaciado, retícula y radios

- **Base 4:** `4 · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 160`.
- **Contenedor:** `max-width: 1360px`. Márgenes laterales `clamp(20px, 4vw, 48px)`.
- **Retícula:** 12 columnas en escritorio, gap de 16–48. En móvil, 1 columna.
- **Padding vertical de sección:** `clamp(80px, 12vw, 160px)`.
- **Separador entre secciones:** `border-top: 1px solid var(--c-line)`.
- **Radios:** `8` (inputs pequeños, código) · `18` (chips grandes, miniaturas) · `28` (bloques y tarjetas) · `999` (botones, píldoras, formulario newsletter).

**Patrón de cabecera de sección (del manual):** H2 a la izquierda (≈7 columnas), alineado por la base, con la intro a la derecha (≈5 columnas, `max-width:420px`), `flex-wrap`, gap `24px 48px`. En móvil: título y luego párrafo.

---

## 5. Profundidad y efectos

- **Sombra del CTA de oro (la única sombra de UI):** `inset 0 1px 0 rgba(255,240,200,.7), 0 18px 50px -14px rgba(242,185,44,.7)`.
- **Resplandor ámbar:** círculo `#E9A21A`, `filter: blur(140–170px)`, opacidad 0.20–0.35, **siempre saliendo de un borde**. **Máximo uno por pantalla**, y señalando dónde está la acción (hero, bloque de servicio, tarjeta de afiliado, footer).
- **Resplandor que sigue al cursor:** solo en el hero, `radial-gradient(circle, rgba(242,185,44,.26) 0%, rgba(233,162,26,.09) 34%, transparent 64%)`, transición 1.2s. Solo con puntero fino y sin reduced-motion.
- **Grano:** textura estática SVG muy sutil sobre el fondo (opacidad ≈ 0.05–0.07). **No** usar una capa `position:fixed` con `mix-blend-mode`, que es cara de repintar en móvil.

---

## 6. Logo y monograma

- **Logo:** punto de oro (con brillo `box-shadow: 0 0 18px 2px rgba(242,185,44,.7)`) + «Iván» en Clash 600 + «*García*» en Instrument Serif italic (×1.14).
- **Sobre oro:** todo negro; el punto pasa a negro. **Sobre claro:** monocromo negro.
- **Área de respeto:** la altura de la «I». Tamaño mínimo: 96 px.
- **Monograma «iG»:** moneda con `--g-gold-coin`, para favicon, avatar y OG.

---

## 7. Componentes

### 7.1 Botones
| Variante | Estilo | Uso |
|---|---|---|
| **Primario oro** | Píldora, `padding:18px 28px`, fondo oro, texto negro 700 16px, sombra del CTA. Hover: fondo `#FFD66E` y la flecha se separa (gap 12→18px), 300ms | **Uno por pantalla.** Flecha → solo si lleva a otro sitio |
| **Secundario ghost** | Píldora, `padding:18px 26px`, borde `--c-ghost-border`, texto crema 500. Hover: borde oro al 60 % | Alternativa al CTA principal. **Sin flecha** |
| **Enlace de texto** | Oro 500–700 15px + `→`. Hover: `#FFE08A` y gap 8→14px | Acciones secundarias («Ver servicio», «Usar mi enlace») |
| **Envío de formulario** | Como el primario, **sin flecha**. Estados: normal → «Enviando…» (deshabilitado, `aria-busy`) → ✓ | Formularios |

### 7.2 Eyebrow (píldora con punto)
Píldora, borde oro al 28 %, fondo oro al 6 %, punto de 7 px con brillo, texto crema 13px.
**Regla:** solo para información **viva o de estado**: «Nuevo vídeo», «Por email», «Prototipo en 24 h», «Plazas de [mes] abiertas». **No** encima de cada H2.

### 7.3 Número en contorno
Instrument Serif italic, `color:transparent; -webkit-text-stroke:1px rgba(242,185,44,.6)`, 80–150px.
**Regla:** solo cuando hay **secuencia real** (pasos del método, nº de edición). Nunca como decoración de sección.

### 7.4 Cinta de oro
Franja de oro inclinada **−2°**, movimiento lento (90 s por vuelta), sobresaliendo del ancho (`margin: 0 -4vw`), texto negro en Clash 600 `clamp(22px,2.6vw,36px)` separado por **✦** (en Instrument Serif), en movimiento continuo.
**Reglas:** **una por página**, es el único bloque grande de oro. Botón de **pausa** visible (WCAG 2.2.2). Detenida con `prefers-reduced-motion`.
Contenido en la Home: **DISEÑO ✦ IA ✦ GOOGLE ✦ NEGOCIO**.

### 7.5 Chips
Relleno `--c-surface-2` sobre tarjetas; borde fino `--c-line-strong` sobre el fondo. 13px, píldora. **Nunca en oro.**
Chip de filtro seleccionado: borde oro al 45 % y texto crema.

### 7.6 Captación de newsletter (formulario en píldora)
Contenedor píldora `--c-bg`, borde `--c-line-strong`, padding 6px. Input transparente (16px, `min-height:48px`) + botón de oro. **Label accesible** (visualmente oculto). Microcopy debajo: «Gratis · Sin spam · Puedes salir cuando quieras.»
En móvil, el formulario se apila: input arriba y botón a todo el ancho debajo.

### 7.7 Tarjeta de afiliado
`--c-surface`, borde oro al 30 %, radio 28, resplandor ámbar en la esquina. Etiqueta en mono. Título tipo «El hosting que *uso yo*». Texto de transparencia. Enlace de texto «Usar mi enlace →». Siempre con una marca visible «Enlace de afiliado».

### 7.8 Métrica
Cifra en Clash 600 de 88px, con el símbolo en oro. **Solo con datos reales.**

### 7.9 Rejilla de 1px (patrón «Esencia»)
`display:grid; gap:1px; background: var(--c-line); border:1px solid var(--c-line); border-radius:28px; overflow:hidden`, con celdas en `--c-bg`. Hover de celda: `--c-surface`. Alternativa a las tarjetas sueltas.

### 7.10 Lista con líneas finas (patrón «Tipografía / Voz»)
Filas con `border-bottom:1px solid var(--c-line)`, padding 28–32px, etiqueta en mono a la izquierda (≈170px) y contenido a la derecha. Para servicios, comparativas y FAQ.

### 7.11 Toast
Píldora `--c-surface-2`, borde oro al 40 %, mono 14px, centrado abajo, `role="status"`, 1.4s.

### 7.12 Marco de navegador (para trabajos y el momento wow)
Barra con 3 puntos `#2A261F` y URL en mono en píldora. Cuerpo `--c-bg`, radio 28, borde crema al 10 %.

### 7.14 Tarjetas apiladas (petición del cliente, 2026-09-25)
Tarjetas `--c-surface`, radio 28 y borde `--c-line-strong`, con `position: sticky` y desplazamiento `--i × 16–28px`: se **agrupan al bajar y se separan al subir**. La tarjeta tapada se encoge un 5 % y se oscurece (JS mínimo en `lib/stack.ts`). Contador en mono «**01** / 03 · etiqueta».
**Dónde:** Trabajos y Servicios y precios (contenido secuencial). No usarlas en más de 2–3 secciones por página. Solo con altura de pantalla ≥ 640px; con reduced-motion no hay efecto de profundidad.

### 7.15 Testimonios (biblioteca de diseños)
Todos en `src/components/testimonials/`, con los mismos datos (`Testimonial[]` de `lib/testimonials.ts`). Catálogo visual en `/lab/testimonios`.

| Componente | Uso recomendado |
|---|---|
| **Carousel** (activo en la Home) | Volumen de prueba social. 3/2/1 tarjetas, autoplay de 5 s con pausa (hover, toque, foco, botón), estrellas y nota media en oro (dato positivo, solo real) |
| Constellation | Home alternativa, con fotos reales de clientes |
| SingleVoice | Junto a un CTA, con un testimonio muy potente |
| BeforeAfter | Página de servicio: transformación ✓/✕ |
| Wall | Cuando haya 8+ testimonios cortos |
| MessageStack | Capturas reales de mensajes (con permiso) |

**Regla:** una sola versión por página, nunca cifras de valoración inventadas.

### 7.13 Pie de página
Resplandor ámbar desde abajo, enlaces en 13px `--c-meta`, y **«Iván García» gigante** en Instrument Serif italic con `--g-footer-name`, `font-size:min(19vw,320px)`, cortado por abajo.

---

## 8. Momento wow (único): «Una web, tres verbos» (propuesto)

- **Escritorio:** el hero queda fijo (~200vh de scroll). Los verbos del H1 se encienden por turno con el barrido dorado (*impactan → venden → posicionan*). A la vez, un marco de navegador con un proyecto real pasa por tres estados: (1) el diseño se compone, (2) entra un contacto por el formulario, (3) la web aparece en una página de resultados de Google.
- **Móvil:** sin fijado. Los verbos funcionan como selector de estado bajo el marco, con avance automático cuando está a la vista y **botón de pausa**.
- **Reduced-motion:** estado final estático, con los tres estados en tríptico.
- Mientras no haya un proyecto real: `[proyecto real]` en el marco.
- **Todo lo demás es sobrio.** No hay más momentos coreografiados en la página.

---

## 9. Movimiento

- **Curva:** `cubic-bezier(.2,.8,.2,1)`.
- **Hover de tarjeta:** `translateY(-6px)` + borde oro al 45 %, 350ms.
- **Barrido del oro** en texto: `background-position` 0 → 100 %, 1.4s.
- **CTA:** separación de la flecha y cambio de fondo, 300ms.
- **Prohibido:** aparición fade-up en cada sección (el manual lo usa en su documento, la web **no**). Parallax decorativo. Animaciones que se reproducen solas sin que el usuario haga nada, salvo la cinta y el momento wow, ambos con pausa.
- **`prefers-reduced-motion: reduce`:** sin cinta en movimiento, sin fijado, sin cursor que sigue, transiciones ≤ 150ms solo de color.

---

## 10. Estados y huecos del manual (resueltos)

| Elemento | Especificación |
|---|---|
| **Foco** | `:focus-visible { outline:2px solid var(--c-gold); outline-offset:3px }`. Sobre el botón de oro: `box-shadow: 0 0 0 2px var(--c-bg), 0 0 0 4px var(--c-gold)` |
| **Input** | Fondo `--c-surface`, borde `--c-line-strong`, radio 18 (o píldora), texto crema 16px, placeholder `--c-meta`. Foco: borde oro al 60 % |
| **Error** | Borde y texto `--c-error`; el mensaje dice **cómo corregirlo** («Falta la @: escribe un email como nombre@dominio.com»). `aria-invalid` + `aria-describedby`. Foco al primer error |
| **Éxito** | ✓ en oro + mensaje en crema que explica qué pasa ahora («Revisa tu email para confirmar»). Nada de verde |
| **Deshabilitado** | Opacidad 0.5, `cursor:not-allowed` |
| **Radio / checkbox** | Personalizados: círculo o cuadrado con borde `--c-line-strong`; al marcarse, relleno oro + ✓ negro. Área táctil ≥ 44px |
| **Navegación móvil** | Botón de texto «Menú» / «Cerrar», sin icono de hamburguesa. Panel a pantalla completa `--c-bg`, enlaces en Clash 600 de 40px, resplandor desde el borde inferior, CTA de oro abajo. Trampa de foco, `Esc` cierra y se bloquea el scroll |
| **CTA fijo en móvil** | Barra inferior `--c-surface-2` con borde superior `--c-line`, un botón de oro a todo el ancho. Aparece al salir del hero y se oculta cuando hay un formulario a la vista. Respeta `safe-area-inset-bottom` |
| **Cabecera** | Sólida `--c-bg` (sin efecto cristal), logo + navegación 14px + CTA ghost. En móvil: logo + «Menú» |
| **Tablas** | Filas separadas con `--c-line`, cabecera en mono 12px `--c-meta`, datos en mono, «incluido» = ✓ oro, «no incluido» = — en `--c-meta` |
| **FAQ** | `<details>` nativo con filas de línea fina; el indicador es «+» en oro que gira 45° |
| **Bloque de prompt** | `--c-surface-2`, radio 18, cabecera en mono («PROMPT · [nombre]») + botón «Copiar prompt» → toast «Copiado» |
| **Código en línea y bloques** | JetBrains Mono 14px, fondo `--c-surface-2`, radio 8 |
| **Breadcrumbs** | Mono 12px `--c-meta`, separador `/`; el actual en crema |
| **Vídeo** | Fachada: póster + botón circular de oro con ▶ negro. El iframe solo se carga al hacer clic |
| **Banner de cookies** | Hoja inferior `--c-surface-2`. **«Rechazar» y «Aceptar» con el mismo peso** (ambos ghost; no se usa oro, por RGPD/AEPD) + «Configurar» |
| **404** | Número en contorno «404» en serif, frase en la voz de la marca y tres enlaces: Home, Recursos, Diseño web |

---

## 11. Imagen

- Fotografía real: **luz cálida dorada, fondos oscuros, grano ligero.**
- **Nada de stock ni robots.** Capturas de proyectos reales, fotogramas de vídeos y retratos de Iván.
- Placeholders visibles `[Foto de Iván · luz cálida lateral]` mientras no haya material.

---

## 12. Voz y copy

- Hablar de **tú**, frases cortas, verbos de acción. **Sin emojis en la web.**
- «Primero doy. Luego, si te he ayudado, me eliges.» Transparencia siempre.
- Cuatro rasgos: **Generoso · Cercano · Premium · A resultado** («¿y esto qué me hace vender?»).
- Los CTA dicen exactamente lo que pasa: «Quiero mi prototipo gratis», «Aprender gratis», «Usar mi enlace», «Crear mi web con Hostinger →».

| ✓ Sí | ✕ No |
|---|---|
| Tu web online este finde. *(solo si se cumple)* | Soluciones digitales integrales para tu negocio. |
| Todo esto es gratis. Si te ayuda, ya sabes dónde estoy. | Contenido exclusivo solo para clientes premium. |
| Enlace de afiliado: yo gano comisión, tú no pagas más. | El mejor hosting del mundo, garantizado. |
| Crear mi web con Hostinger → | Haz clic aquí para saber más |

Claims disponibles: «Webs que *impactan*, venden y posicionan» (principal) · «El hosting que *uso yo*» · «Una web *mejor* cada semana» · «Te la hago yo, o te enseño gratis a hacerla tú».

---

## 13. Reglas anti-genéricas (checklist de revisión)

- [ ] ¿Hay más de un CTA de oro visible a la vez? → Solo uno.
- [ ] ¿Eyebrow encima de un H2 sin información viva? → Quitarla.
- [ ] ¿Números 01/02/03 sin secuencia real? → Quitarlos.
- [ ] ¿Rejilla de tarjetas idénticas? → Lista con líneas finas o rejilla de 1px, salvo que sean objetos (vídeo, recurso, afiliado).
- [ ] ¿Fade-up al hacer scroll? → Quitarlo.
- [ ] ¿Flecha en un ghost o en un envío? → Quitarla.
- [ ] ¿Cifra grande sin dato real? → Quitarla.
- [ ] ¿Más de un resplandor por pantalla o uno flotando en el centro? → Uno, saliendo de un borde.
- [ ] ¿Stock, robots, mockup de portátil genérico? → Material real.
- [ ] ¿Carrusel de testimonios o 3 columnas de precios con «Popular»? → Una cita junto a la decisión; tabla honesta.
- [ ] ¿Franja de logos de herramientas? → Chips en contexto.
- [ ] ¿Hamburguesa, cabecera de cristal o selector de modo? → Botón «Menú», cabecera sólida, solo modo oscuro.

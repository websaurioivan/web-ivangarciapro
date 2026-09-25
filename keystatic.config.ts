/**
 * Keystatic · panel de contenido de ivangarcia.pro
 * Local: `npm run dev` → http://localhost:4321/keystatic
 * Todo se guarda como archivos en src/content (sin base de datos).
 * Los esquemas deben coincidir con src/content.config.ts.
 */
import { config, fields, collection, singleton } from '@keystatic/core';

const cta = (label: string) =>
  fields.object(
    {
      label: fields.text({ label: 'Texto del botón' }),
      href: fields.text({ label: 'Enlace' }),
    },
    { label },
  );

const emHint = 'Rodea con *asteriscos* las 1–3 palabras que van en cursiva serif.';

const titled = (label: string, extra: Record<string, any> = {}) =>
  fields.object(
    {
      title: fields.text({ label: 'Título', description: emHint }),
      intro: fields.text({ label: 'Intro', multiline: true }),
      ...extra,
    },
    { label },
  );

const textList = (label: string) => fields.array(fields.text({ label: 'Elemento' }), { label, itemLabel: (p) => p.value });

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Iván García' },
    navigation: {
      Páginas: ['home', 'disenoWeb', 'settings'],
      Servicio: ['services', 'testimonials', 'cases'],
      Contenido: ['resources'],
    },
  },
  singletons: {
    settings: singleton({
      label: 'Ajustes generales',
      path: 'src/content/pages/settings',
      format: { data: 'json' },
      schema: {
        siteName: fields.text({ label: 'Nombre del sitio' }),
        siteDescription: fields.text({ label: 'Descripción por defecto (SEO)', multiline: true }),
        youtubeUrl: fields.text({ label: 'URL del canal de YouTube' }),
        socials: fields.array(
          fields.object({ name: fields.text({ label: 'Red' }), url: fields.text({ label: 'URL' }) }),
          { label: 'Redes sociales', itemLabel: (p) => p.fields.name.value || 'Red' },
        ),
        hostingerUrl: fields.text({ label: 'Enlace de referido de Hostinger' }),
        gtmId: fields.text({ label: 'ID de Google Tag Manager (vacío = sin analítica)' }),
        prototypesPerWeek: fields.integer({ label: 'Prototipos por semana', defaultValue: 10 }),
        reviews: fields.object(
          {
            value: fields.text({ label: 'Nota media (solo real, ej. «4,9»)' }),
            count: fields.text({ label: 'Nº de reseñas (solo real)' }),
            url: fields.text({ label: 'URL de tus reseñas en Google' }),
          },
          { label: 'Reseñas de Google' },
        ),
        legal: fields.object(
          {
            owner: fields.text({ label: 'Titular' }),
            nif: fields.text({ label: 'NIF' }),
            address: fields.text({ label: 'Domicilio' }),
            email: fields.text({ label: 'Email' }),
          },
          { label: 'Datos legales' },
        ),
      },
    }),
    home: singleton({
      label: 'Home',
      path: 'src/content/pages/home',
      format: { data: 'json' },
      schema: {
        seo: fields.object(
          {
            title: fields.text({ label: 'Title' }),
            description: fields.text({ label: 'Meta description', multiline: true }),
          },
          { label: 'SEO' },
        ),
        hero: fields.object(
          {
            titleStart: fields.text({ label: 'H1 · inicio', description: 'Ej.: «Webs que»' }),
            verbs: fields.array(fields.text({ label: 'Verbo' }), {
              label: 'H1 · tres verbos (se encienden por turno)',
              itemLabel: (p) => p.value,
            }),
            subtitle: fields.text({ label: 'Subtítulo', multiline: true }),
            primary: cta('CTA de oro'),
            secondary: cta('CTA secundario'),
            steps: fields.array(
              fields.object({
                label: fields.text({ label: 'Etiqueta' }),
                caption: fields.text({ label: 'Descripción del estado' }),
              }),
              { label: 'Estados del marco', itemLabel: (p) => p.fields.label.value },
            ),
            frameUrl: fields.text({ label: 'URL mostrada en el marco' }),
            frameNote: fields.text({ label: 'Nota bajo el marco' }),
          },
          { label: 'Hero' },
        ),
        ribbon: fields.array(fields.text({ label: 'Palabra' }), {
          label: 'Cinta de oro',
          itemLabel: (p) => p.value,
        }),
        works: fields.object(
          {
            title: fields.text({ label: 'Título', description: emHint }),
            intro: fields.text({ label: 'Intro', multiline: true }),
            link: cta('Enlace'),
          },
          { label: 'Trabajos' },
        ),
        learn: fields.object(
          {
            title: fields.text({ label: 'Título', description: emHint }),
            intro: fields.text({ label: 'Intro', multiline: true }),
            featured: fields.object(
              {
                eyebrow: fields.text({ label: 'Etiqueta viva (vacío = sin etiqueta)' }),
                title: fields.text({ label: 'Título del vídeo' }),
                summary: fields.text({ label: 'Resumen', multiline: true }),
                youtubeId: fields.text({ label: 'ID de YouTube' }),
                duration: fields.text({ label: 'Duración' }),
                href: fields.text({ label: 'Página del recurso' }),
              },
              { label: 'Vídeo destacado' },
            ),
            allLink: cta('Enlace a todos los recursos'),
            hosting: fields.object(
              {
                text: fields.text({ label: 'Texto', multiline: true }),
                linkLabel: fields.text({ label: 'Texto del enlace' }),
                disclosure: fields.text({ label: 'Aviso de afiliado' }),
              },
              { label: 'Línea de Hostinger' },
            ),
          },
          { label: 'Aprende gratis' },
        ),
        service: fields.object(
          {
            title: fields.text({ label: 'Título', description: emHint }),
            intro: fields.text({ label: 'Intro', multiline: true }),
            compareTitle: fields.text({ label: 'Título comparativa', description: emHint }),
            compareIntro: fields.text({ label: 'Intro comparativa', multiline: true }),
            compare: fields.array(
              fields.object({
                yes: fields.text({ label: 'Con Iván (✓)' }),
                no: fields.text({ label: 'Con WordPress (✕)' }),
              }),
              { label: 'Filas comparativa', itemLabel: (p) => p.fields.yes.value },
            ),
            stepsTitle: fields.text({ label: 'Título pasos' }),
            steps: fields.array(
              fields.object({
                title: fields.text({ label: 'Paso' }),
                text: fields.text({ label: 'Descripción', multiline: true }),
              }),
              { label: 'Pasos', itemLabel: (p) => p.fields.title.value },
            ),
            cta: cta('CTA de oro'),
            microcopy: fields.text({ label: 'Microcopy bajo el CTA' }),
            servicesLink: cta('Enlace al servicio'),
          },
          { label: 'Servicio' },
        ),
        testimonials: fields.object(
          { title: fields.text({ label: 'Título', description: emHint }) },
          { label: 'Testimonios (los testimonios se editan en «Testimonios»)' },
        ),
        about: fields.object(
          {
            title: fields.text({ label: 'Título', description: emHint }),
            text: fields.text({ label: 'Texto', multiline: true }),
            link: cta('Enlace'),
            photoAlt: fields.text({ label: 'Texto alternativo de la foto' }),
          },
          { label: 'Quién soy' },
        ),
        newsletter: fields.object(
          {
            title: fields.text({ label: 'Título', description: emHint }),
            text: fields.text({ label: 'Texto', multiline: true }),
            topics: fields.array(fields.text({ label: 'Tema' }), {
              label: 'Qué recibirás',
              itemLabel: (p) => p.value,
            }),
            button: fields.text({ label: 'Texto del botón' }),
            microcopy: fields.text({ label: 'Microcopy' }),
          },
          { label: 'Newsletter' },
        ),
      },
    }),
    disenoWeb: singleton({
      label: 'Diseño web (servicio)',
      path: 'src/content/pages/diseno-web',
      format: { data: 'json' },
      schema: {
        seo: fields.object(
          { title: fields.text({ label: 'Title' }), description: fields.text({ label: 'Meta description', multiline: true }) },
          { label: 'SEO' },
        ),
        hero: fields.object(
          {
            title: fields.text({ label: 'H1', description: emHint }),
            subtitle: fields.text({ label: 'Subtítulo', multiline: true }),
            primary: cta('CTA de oro'),
            secondary: cta('CTA secundario'),
            timeline: fields.array(
              fields.object({ when: fields.text({ label: 'Cuándo' }), what: fields.text({ label: 'Qué pasa' }) }),
              { label: 'Línea de tiempo', itemLabel: (p) => p.fields.when.value },
            ),
            timelineNote: fields.text({ label: 'Nota bajo la línea de tiempo' }),
          },
          { label: 'Hero' },
        ),
        works: titled('Trabajos', { link: cta('Enlace') }),
        fears: titled('Miedos resueltos', {
          rows: fields.array(
            fields.object({ fear: fields.text({ label: 'Miedo' }), answer: fields.text({ label: 'Respuesta', multiline: true }) }),
            { label: 'Filas', itemLabel: (p) => p.fields.fear.value },
          ),
        }),
        process: titled('Cómo funciona', {
          steps: fields.array(
            fields.object({ title: fields.text({ label: 'Paso' }), text: fields.text({ label: 'Descripción', multiline: true }) }),
            { label: 'Pasos', itemLabel: (p) => p.fields.title.value },
          ),
        }),
        plans: titled('Servicios y precios (precios en «Servicios»)', {
          delivery: fields.text({ label: 'Plazo de entrega' }),
          note: fields.text({ label: 'Nota de precios' }),
        }),
        modes: titled('Modalidades de pago', {
          columns: textList('Columnas (3)'),
          rows: fields.array(
            fields.object({ label: fields.text({ label: 'Fila' }), values: textList('Valores (3, uno por columna)') }),
            { label: 'Filas', itemLabel: (p) => p.fields.label.value },
          ),
          extrasTitle: fields.text({ label: 'Título servicios extra' }),
          extras: textList('Servicios extra'),
        }),
        compare: titled('Sin WordPress', {
          rows: fields.array(
            fields.object({ yes: fields.text({ label: 'Con Iván (✓)' }), no: fields.text({ label: 'Con WordPress (✕)' }) }),
            { label: 'Filas', itemLabel: (p) => p.fields.yes.value },
          ),
        }),
        testimonials: fields.object({ title: fields.text({ label: 'Título', description: emHint }) }, { label: 'Testimonios' }),
        faq: fields.object(
          {
            title: fields.text({ label: 'Título', description: emHint }),
            items: fields.array(
              fields.object({ q: fields.text({ label: 'Pregunta' }), a: fields.text({ label: 'Respuesta', multiline: true }) }),
              { label: 'Preguntas', itemLabel: (p) => p.fields.q.value },
            ),
          },
          { label: 'Preguntas frecuentes' },
        ),
        form: titled('Formulario del prototipo', {
          button: fields.text({ label: 'Botón' }),
          microcopy: fields.text({ label: 'Microcopy' }),
          success: fields.text({ label: 'Mensaje de éxito', multiline: true }),
          waitlistTitle: fields.text({ label: 'Lista de espera · título' }),
          waitlistText: fields.text({ label: 'Lista de espera · texto', multiline: true }),
          waitlistButton: fields.text({ label: 'Lista de espera · botón' }),
          waitlistSuccess: fields.text({ label: 'Lista de espera · éxito', multiline: true }),
        }),
      },
    }),
  },
  collections: {
    services: collection({
      label: 'Servicios',
      path: 'src/content/services/*',
      slugField: 'name',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Nombre' } }),
        order: fields.integer({ label: 'Orden', defaultValue: 1 }),
        forWho: fields.text({ label: 'Para quién (1 frase)', multiline: true }),
        includes: fields.array(fields.text({ label: 'Incluye' }), { label: 'Incluye', itemLabel: (p) => p.value }),
        plans: fields.array(
          fields.object({
            mode: fields.select({
              label: 'Modalidad',
              options: [
                { label: 'Pago único', value: 'unico' },
                { label: 'Pago fraccionado', value: 'fraccionado' },
                { label: 'Renting', value: 'renting' },
              ],
              defaultValue: 'unico',
            }),
            price: fields.text({ label: 'Precio (texto, ej. «1.790 €»)' }),
            upfront: fields.text({ label: 'Cuota inicial (renting)' }),
            monthly: fields.text({ label: 'Cuota mensual (renting) o plazos (fraccionado)' }),
            months: fields.integer({ label: 'Meses de permanencia', defaultValue: 24 }),
            provisional: fields.checkbox({ label: 'Precio provisional', defaultValue: true }),
          }),
          { label: 'Modalidades y precios', itemLabel: (p) => p.fields.mode.value },
        ),
      },
    }),
    testimonials: collection({
      label: 'Testimonios',
      path: 'src/content/testimonials/*',
      slugField: 'name',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Nombre' } }),
        role: fields.text({ label: 'Cargo · Negocio' }),
        url: fields.text({ label: 'Web del cliente (opcional)' }),
        quote: fields.text({ label: 'Testimonio completo (2–4 frases)', multiline: true }),
        short: fields.text({ label: 'Frase corta (para el muro en movimiento)' }),
        before: fields.text({ label: 'Cómo era antes (para la versión antes/después)' }),
        rating: fields.integer({ label: 'Estrellas (1–5)', defaultValue: 5, validation: { min: 1, max: 5 } }),
        order: fields.integer({ label: 'Orden', defaultValue: 1 }),
        featured: fields.checkbox({ label: 'Mostrar en la Home', defaultValue: true }),
      },
    }),
    cases: collection({
      label: 'Casos / Trabajos',
      path: 'src/content/cases/*',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Proyecto' } }),
        client: fields.text({ label: 'Cliente' }),
        sector: fields.text({ label: 'Sector' }),
        url: fields.text({ label: 'URL publicada' }),
        need: fields.text({ label: 'Qué necesitaba', multiline: true }),
        done: fields.text({ label: 'Qué hicimos', multiline: true }),
        result: fields.text({ label: 'Resultado medido (solo si es real)', multiline: true }),
        tags: fields.array(fields.text({ label: 'Etiqueta' }), { label: 'Etiquetas', itemLabel: (p) => p.value }),
        order: fields.integer({ label: 'Orden', defaultValue: 1 }),
        featured: fields.checkbox({ label: 'Mostrar en la Home', defaultValue: true }),
      },
    }),
    resources: collection({
      label: 'Recursos',
      path: 'src/content/resources/*',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        type: fields.select({
          label: 'Tipo',
          options: [
            { label: 'Tutorial', value: 'tutorial' },
            { label: 'Prompt', value: 'prompt' },
            { label: 'Checklist', value: 'checklist' },
            { label: 'Plantilla', value: 'plantilla' },
          ],
          defaultValue: 'tutorial',
        }),
        summary: fields.text({ label: 'Resumen', multiline: true }),
        gated: fields.checkbox({ label: 'Se entrega por email', defaultValue: false }),
        featured: fields.checkbox({ label: 'Mostrar en la Home', defaultValue: false }),
        order: fields.integer({ label: 'Orden', defaultValue: 1 }),
      },
    }),
  },
});

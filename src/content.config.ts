/**
 * Colecciones de contenido. Leen los archivos que escribe Keystatic (keystatic.config.ts).
 * Si cambias un campo en Keystatic, cámbialo también aquí.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const cta = z.object({ label: z.string(), href: z.string() });

const settings = defineCollection({
  loader: glob({ pattern: 'settings.json', base: './src/content/pages' }),
  schema: z.object({
    siteName: z.string(),
    siteDescription: z.string(),
    youtubeUrl: z.string(),
    socials: z.array(z.object({ name: z.string(), url: z.string() })),
    hostingerUrl: z.url(),
    gtmId: z.string(),
    prototypesPerWeek: z.number().int().positive(),
    reviews: z.object({ value: z.string(), count: z.string(), url: z.string() }),
    legal: z.object({ owner: z.string(), nif: z.string(), address: z.string(), email: z.email() }),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: 'home.json', base: './src/content/pages' }),
  schema: z.object({
    seo: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({
      titleStart: z.string(),
      verbs: z.array(z.string()).length(3),
      subtitle: z.string(),
      primary: cta,
      secondary: cta,
      steps: z.array(z.object({ label: z.string(), caption: z.string() })).length(3),
      frameUrl: z.string(),
      frameNote: z.string(),
    }),
    ribbon: z.array(z.string()).min(2),
    works: z.object({ title: z.string(), intro: z.string(), link: cta }),
    learn: z.object({
      title: z.string(),
      intro: z.string(),
      featured: z.object({
        eyebrow: z.string(),
        title: z.string(),
        summary: z.string(),
        youtubeId: z.string(),
        duration: z.string(),
        href: z.string(),
      }),
      allLink: cta,
      hosting: z.object({ text: z.string(), linkLabel: z.string(), disclosure: z.string() }),
    }),
    service: z.object({
      title: z.string(),
      intro: z.string(),
      compareTitle: z.string(),
      compareIntro: z.string(),
      compare: z.array(z.object({ yes: z.string(), no: z.string() })),
      stepsTitle: z.string(),
      steps: z.array(z.object({ title: z.string(), text: z.string() })),
      cta,
      microcopy: z.string(),
      servicesLink: cta,
    }),
    testimonials: z.object({ title: z.string() }),
    about: z.object({ title: z.string(), text: z.string(), link: cta, photoAlt: z.string() }),
    newsletter: z.object({
      title: z.string(),
      text: z.string(),
      topics: z.array(z.string()),
      button: z.string(),
      microcopy: z.string(),
    }),
  }),
});

const gift = defineCollection({
  loader: glob({ pattern: 'gift.json', base: './src/content/pages' }),
  schema: z.object({
    enabled: z.boolean(),
    pill: z.string(),
    kicker: z.string(),
    title: z.string(),
    text: z.string(),
    items: z.array(z.object({ n: z.string(), text: z.string() })),
    giftText: z.string(),
    leadMagnet: z.string(),
    button: z.string(),
    microcopy: z.string(),
    success: z.string(),
    dismissDays: z.number().int().min(0),
  }),
});

const section = z.object({ title: z.string(), intro: z.string() });

const disenoWeb = defineCollection({
  loader: glob({ pattern: 'diseno-web.json', base: './src/content/pages' }),
  schema: z.object({
    seo: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      primary: cta,
      secondary: cta,
      timeline: z.array(z.object({ when: z.string(), what: z.string() })),
      timelineNote: z.string(),
    }),
    works: section.extend({ link: cta }),
    fears: section.extend({ rows: z.array(z.object({ fear: z.string(), answer: z.string() })) }),
    process: section.extend({ steps: z.array(z.object({ title: z.string(), text: z.string() })) }),
    plans: section.extend({ delivery: z.string(), note: z.string() }),
    modes: section.extend({
      columns: z.array(z.string()).length(3),
      rows: z.array(z.object({ label: z.string(), values: z.array(z.string()).length(3) })),
      extrasTitle: z.string(),
      extras: z.array(z.string()),
    }),
    compare: section.extend({ rows: z.array(z.object({ yes: z.string(), no: z.string() })) }),
    testimonials: z.object({ title: z.string() }),
    faq: z.object({ title: z.string(), items: z.array(z.object({ q: z.string(), a: z.string() })) }),
    form: section.extend({
      button: z.string(),
      microcopy: z.string(),
      success: z.string(),
      waitlistTitle: z.string(),
      waitlistText: z.string(),
      waitlistButton: z.string(),
      waitlistSuccess: z.string(),
    }),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/services' }),
  schema: z.object({
    name: z.string(),
    order: z.number().int(),
    forWho: z.string(),
    includes: z.array(z.string()),
    plans: z.array(
      z.object({
        mode: z.enum(['unico', 'fraccionado', 'renting']),
        price: z.string(),
        upfront: z.string().optional().default(''),
        monthly: z.string().optional().default(''),
        months: z.number().int().optional(),
        provisional: z.boolean(),
      }),
    ),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    url: z.string().optional().default(''),
    quote: z.string(),
    short: z.string().optional().default(''),
    before: z.string().optional().default(''),
    rating: z.number().int().min(1).max(5).default(5),
    order: z.number().int().default(1),
    featured: z.boolean(),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    sector: z.string(),
    url: z.string(),
    need: z.string(),
    done: z.string(),
    result: z.string().optional().default(''),
    tags: z.array(z.string()),
    order: z.number().int(),
    featured: z.boolean(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['tutorial', 'prompt', 'checklist', 'plantilla']),
    summary: z.string(),
    gated: z.boolean(),
    featured: z.boolean(),
    order: z.number().int(),
  }),
});

export const collections = { settings, home, disenoWeb, gift, services, testimonials, cases, resources };

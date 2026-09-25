/**
 * Modelo común para todos los diseños de testimonios (src/components/testimonials/*).
 * Cualquier diseño recibe `Testimonial[]`, así que cambiar de diseño es cambiar el componente.
 */
import { getCollection } from 'astro:content';

export interface Testimonial {
  name: string;
  /** Cargo · negocio */
  role: string;
  /** Testimonio completo (2–4 frases) */
  quote: string;
  /** Frase corta (muro en movimiento) */
  short: string;
  /** Cómo era antes (versión antes/después) */
  before: string;
  url: string;
  rating: number;
  initial: string;
}

export interface ReviewsSummary {
  value: string;
  count: string;
  url: string;
}

export async function getTestimonials(opts: { featuredOnly?: boolean } = {}): Promise<Testimonial[]> {
  const entries = await getCollection('testimonials', (t) => !opts.featuredOnly || t.data.featured);
  return entries
    .sort((a, b) => a.data.order - b.data.order)
    .map(({ data: d }) => ({
      name: d.name,
      role: d.role,
      quote: d.quote,
      short: d.short || d.quote,
      before: d.before,
      url: d.url,
      rating: d.rating,
      initial: d.name.replace(/[[\]]/g, '').trim().charAt(0).toUpperCase(),
    }));
}

export { pad2 } from './text';
export const starText = (n = 5) => '★'.repeat(Math.max(0, Math.min(5, n)));

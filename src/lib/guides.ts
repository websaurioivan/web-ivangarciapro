/**
 * Guías · utilidades comunes (hub, temas, artículo, RSS).
 * Publicada = no es borrador y su fecha de publicación ya ha llegado (permite programar artículos).
 * En `npm run dev` se ven también borradores y programadas, para revisarlas antes de publicar.
 */
import { readFileSync } from 'node:fs';
import { getCollection, type CollectionEntry } from 'astro:content';

export type Guide = CollectionEntry<'guides'>;
export type Topic = CollectionEntry<'topics'>;

const isPublished = (g: Guide) => import.meta.env.DEV || (!g.data.draft && g.data.publishedAt.getTime() <= Date.now());

export async function getGuides(): Promise<Guide[]> {
  return (await getCollection('guides', isPublished)).sort(
    (a, b) => (b.data.updatedAt ?? b.data.publishedAt).getTime() - (a.data.updatedAt ?? a.data.publishedAt).getTime(),
  );
}

export async function getTopics(): Promise<Topic[]> {
  return (await getCollection('topics')).sort((a, b) => a.data.order - b.data.order);
}

/** Minutos de lectura (~220 palabras/min). Acepta la guía (lee su archivo .mdoc) o un texto. */
export function readingTime(source: Guide | string | undefined): number {
  let text = typeof source === 'string' ? source : (source?.body ?? '');
  if (!text && typeof source === 'object' && source?.filePath) {
    try {
      text = readFileSync(source.filePath, 'utf8').replace(/^---[\s\S]*?---/, '');
    } catch {
      text = '';
    }
  }
  const words = text.replace(/\{%[\s\S]*?%\}/g, ' ').replace(/[#>*_`|\-[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Relacionadas: las elegidas a mano o, si no hay, las del mismo tema (pilar primero). */
export function relatedFor(guide: Guide, all: Guide[], max = 3): Guide[] {
  const byId = new Map(all.map((g) => [g.id, g]));
  const manual = guide.data.related.map((id) => byId.get(id)).filter((g): g is Guide => !!g && g.id !== guide.id);
  if (manual.length) return manual.slice(0, max);
  return all
    .filter((g) => g.id !== guide.id && g.data.topic === guide.data.topic)
    .sort((a, b) => Number(b.data.pillar) - Number(a.data.pillar))
    .concat(all.filter((g) => g.id !== guide.id && g.data.topic !== guide.data.topic))
    .slice(0, max);
}

const fmt = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
export const formatDate = (d: Date) => fmt.format(d);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** «3:20» → 200 */
export const toSeconds = (t: string) => t.split(':').map(Number).reduce((acc, n) => acc * 60 + (Number.isFinite(n) ? n : 0), 0);

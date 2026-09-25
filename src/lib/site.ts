/**
 * Datos globales de marca. Los editables viven en src/content/pages/settings.json (Keystatic).
 */
import { getEntry } from 'astro:content';

export const SITE_URL = 'https://ivangarcia.pro';

export async function getSettings() {
  const entry = await getEntry('settings', 'settings');
  if (!entry) throw new Error('Falta src/content/pages/settings.json');
  return entry.data;
}

export const NAV = [
  { label: 'Recursos', href: '/recursos' },
  { label: 'Guías', href: '/guias' },
  { label: 'Diseño web', href: '/diseno-web' },
  { label: 'Newsletter', href: '/#newsletter' },
] as const;

export const LEGAL_LINKS = [
  { label: 'Aviso legal', href: '/aviso-legal' },
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Afiliación', href: '/afiliacion' },
] as const;

/** '/diseno-web.html' | '/index.html' | '/diseno-web/' → '/diseno-web' | '/' (build.format 'file') */
export const cleanPath = (path: string) => path.replace(/(index)?\.html$/, '').replace(/\/$/, '') || '/';

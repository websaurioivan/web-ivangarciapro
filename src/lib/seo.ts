/**
 * Helpers de datos estructurados (JSON-LD).
 */
import { SITE_URL } from './site';

type Settings = Awaited<ReturnType<typeof import('./site').getSettings>>;

export function personSchema(s: Settings) {
  const sameAs = [s.youtubeUrl, ...s.socials.map((x) => x.url)].filter((u) => u.startsWith('http'));
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#ivan`,
    name: 'Iván García',
    alternateName: s.legal.owner,
    url: SITE_URL,
    email: `mailto:${s.legal.email}`,
    jobTitle: 'Diseñador web especializado en IA y SEO',
    knowsAbout: ['Diseño web', 'Inteligencia artificial', 'SEO', 'Conversión', 'Hosting'],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema(s: Settings) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: s.siteName,
    description: s.siteDescription,
    inLanguage: 'es-ES',
    publisher: { '@id': `${SITE_URL}/#ivan` },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

export const graph = (...nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

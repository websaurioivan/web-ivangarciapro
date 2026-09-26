/**
 * RSS de guías: /guias/rss.xml
 */
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getGuides } from '../../lib/guides';
import { plain } from '../../lib/text';

export async function GET(context: APIContext) {
  const guides = (await getGuides()).filter((g) => !g.data.draft);
  return rss({
    title: 'Guías · Iván García',
    description: 'Guías para crear webs que impactan, venden y posicionan.',
    site: context.site ?? 'https://ivangarcia.pro',
    items: guides.map((g) => ({
      title: plain(g.data.title),
      description: g.data.description,
      pubDate: g.data.publishedAt,
      link: `/guias/${g.id}`,
    })),
    customData: '<language>es-es</language>',
  });
}

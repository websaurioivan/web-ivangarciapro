/**
 * robots.txt dinámico.
 * PUBLIC_STAGING=true (dominio de pruebas) → bloquea todo. En producción → permite todo salvo /api y /lab.
 */
import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/site';

export const GET: APIRoute = () => {
  const staging = import.meta.env.PUBLIC_STAGING === 'true';
  const body = staging
    ? ['User-agent: *', 'Disallow: /', ''].join('\n')
    : ['User-agent: *', 'Allow: /', 'Disallow: /api/', 'Disallow: /lab/', '', `Sitemap: ${SITE_URL}/sitemap-index.xml`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

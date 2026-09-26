// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';

// Keystatic (panel de contenido) solo se carga en desarrollo o en el build del panel.
// La web pública se compila 100 % estática y sin React.
const isDev = process.argv.includes('dev');
const withAdmin = isDev || process.env.KEYSTATIC === 'true';

export default defineConfig({
  site: 'https://ivangarcia.pro',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [
    markdoc(),
    ...(withAdmin ? [react(), keystatic()] : []),
    sitemap({ filter: (page) => !page.includes('/keystatic') && !page.includes('/404') && !page.includes('/lab') }),
  ],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});

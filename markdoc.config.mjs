// @ts-check
/**
 * Markdoc · cómo se renderiza el cuerpo de las guías (src/content/guides/*.mdoc).
 * Cada etiqueta corresponde a un bloque del editor de Keystatic (keystatic.config.ts → guides.content.components).
 * Si añades un bloque, añádelo en los dos sitios.
 */
import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';

/** @param {string} name */
const c = (name) => component(`./src/components/guides/${name}.astro`);

export default defineMarkdocConfig({
  nodes: {
    // El artículo ya es <article> en la plantilla: el cuerpo va en un <div>
    document: { ...nodes.document, render: 'div' },
    // Saltos de línea simples → «\n» (en párrafos normales se ven como espacio; en prompts, como salto)
    softbreak: { transform: () => '\n' },
    heading: { ...nodes.heading, render: c('Heading') },
    // content y language como props del componente (por defecto Markdoc no pasa content)
    fence: {
      render: c('CodeBlock'),
      attributes: {
        content: { type: String, required: true },
        language: { type: String },
        process: { type: Boolean, render: false, default: true },
      },
    },
  },
  tags: {
    callout: {
      render: c('Callout'),
      attributes: {
        type: { type: String, default: 'tip', matches: ['tip', 'warning', 'error'] },
        title: { type: String, default: '' },
      },
    },
    prompt: {
      render: c('PromptBlock'),
      attributes: { title: { type: String, default: 'Prompt' } },
    },
    steps: { render: c('Steps') },
    tool: {
      render: c('ToolCard'),
      selfClosing: true,
      attributes: {
        name: { type: String, required: true },
        url: { type: String, required: true },
        description: { type: String, default: '' },
        affiliate: { type: Boolean, default: false },
        cta: { type: String, default: 'Ver herramienta' },
      },
    },
    moment: {
      render: c('VideoMoment'),
      selfClosing: true,
      attributes: {
        time: { type: String, required: true },
        label: { type: String, default: 'Ver este paso en el vídeo' },
      },
    },
    newsletter: {
      render: c('NewsletterInline'),
      selfClosing: true,
      attributes: {
        title: { type: String, default: '' },
        text: { type: String, default: '' },
      },
    },
  },
});

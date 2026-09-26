/**
 * Tema de resaltado de código «Oro» (Shiki / TextMate) con la paleta del manual.
 * Fondo --c-surface-2, texto crema, palabras clave en oro, cadenas en oro luz, comentarios en meta.
 * Contrastes ≥ 4.5:1 sobre #1a1713.
 */
export const oroTheme = {
  name: 'ivan-oro',
  type: 'dark' as const,
  colors: {
    'editor.background': '#1a1713',
    'editor.foreground': '#f7f2e8',
  },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#8c867b', fontStyle: 'italic' } },
    { scope: ['keyword', 'storage', 'storage.type', 'keyword.control', 'keyword.operator.new'], settings: { foreground: '#f2b92c' } },
    { scope: ['string', 'string.quoted', 'string.template', 'markup.inline.raw'], settings: { foreground: '#ffe08a' } },
    { scope: ['constant.numeric', 'constant.language', 'support.constant'], settings: { foreground: '#ffd66e' } },
    { scope: ['entity.name.tag', 'meta.tag.sgml', 'support.type.property-name', 'meta.object-literal.key'], settings: { foreground: '#f2b92c' } },
    { scope: ['entity.other.attribute-name', 'variable.parameter'], settings: { foreground: '#d7cfbf' } },
    { scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: '#f7f2e8', fontStyle: 'bold' } },
    { scope: ['variable', 'variable.other'], settings: { foreground: '#f7f2e8' } },
    { scope: ['punctuation', 'meta.brace', 'keyword.operator'], settings: { foreground: '#a9a397' } },
    { scope: ['markup.heading', 'entity.name.section'], settings: { foreground: '#f2b92c', fontStyle: 'bold' } },
  ],
};

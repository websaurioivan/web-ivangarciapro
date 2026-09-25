/**
 * Convierte *palabras* en <em class="serif-em"> (énfasis serif del manual) escapando el resto.
 * Uso: <h2 set:html={emph(data.title)} />
 */
const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function emph(text: string, extraClass = ''): string {
  const cls = ['serif-em', extraClass].filter(Boolean).join(' ');
  return escapeHtml(text).replace(/\*([^*]+)\*/g, `<em class="${cls}">$1</em>`);
}

/** Quita los asteriscos para usos en texto plano (title, aria-label, JSON-LD). */
export const plain = (text: string) => text.replace(/\*/g, '');

/** true si el texto sigue siendo un placeholder «[…]» pendiente del cliente. */
export const isPlaceholder = (text: string) => /^\s*\[.*\]\s*$/.test(text);

/** 1 → «01» (contadores y pasos) */
export const pad2 = (n: number) => String(n).padStart(2, '0');

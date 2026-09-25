/**
 * Tarjetas apiladas al hacer scroll.
 * Marcado: <div class="stack" data-stack> <article class="stack__card" style="--i:0">…</article> … </div>
 * CSS (global.css): cada tarjeta es sticky con un desplazamiento según --i, así que se agrupan al bajar
 * y se separan al subir. Este script solo añade la profundidad: la tarjeta tapada se encoge y se oscurece
 * un poco (--p de 0 a 1). Con prefers-reduced-motion no se ejecuta; el apilado sigue funcionando.
 */
export function initStacks() {
  const stacks = [...document.querySelectorAll<HTMLElement>('[data-stack]')];
  if (!stacks.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = stacks.map((s) => [...s.querySelectorAll<HTMLElement>('.stack__card')]);
  let ticking = false;

  const update = () => {
    ticking = false;
    for (const list of cards) {
      for (let i = 0; i < list.length - 1; i++) {
        const card = list[i]!;
        const next = list[i + 1]!;
        const a = card.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (a.bottom - b.top) / a.height));
        card.style.setProperty('--p', p.toFixed(3));
      }
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  const io = new IntersectionObserver((entries) => {
    const anyVisible = entries.some((e) => e.isIntersecting);
    if (anyVisible) addEventListener('scroll', onScroll, { passive: true });
    else removeEventListener('scroll', onScroll);
  });
  stacks.forEach((s) => io.observe(s));
  update();
}

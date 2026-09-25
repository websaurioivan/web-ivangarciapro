/**
 * Analítica · dataLayer para GTM respetando el consentimiento.
 * Si no hay GTM configurado o el usuario no ha aceptado, no se envía nada.
 */
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    __analyticsConsent?: boolean;
  }
}

export type EventName = 'cta_click' | 'affiliate_click' | 'newsletter_signup' | 'prototype_request' | 'video_play';

export function track(event: EventName, params: Record<string, string | undefined> = {}) {
  if (typeof window === 'undefined' || !window.__analyticsConsent || !window.dataLayer) return;
  window.dataLayer.push({ event, ...params });
}

/** Listener delegado: CTAs con data-cta y enlaces de afiliado con data-affiliate. */
export function initClickTracking() {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cta], [data-affiliate]');
    if (!el) return;
    const d = el.dataset;
    if (d.affiliate) {
      track('affiliate_click', {
        partner: d.affiliate,
        source_type: d.sourceType,
        source_slug: d.sourceSlug,
        video_id: d.videoId,
        placement: d.placement,
        campaign: d.campaign,
      });
    } else {
      track('cta_click', {
        cta_id: d.cta,
        placement: d.placement,
        intent: d.intent,
        page_type: document.body.dataset.pageType,
      });
    }
  });
}

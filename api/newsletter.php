<?php
/**
 * POST /api/newsletter.php · alta en la newsletter (MailerLite, grupo «newsletter»).
 * Campos: email, name (opcional), source, placement, lead_magnet, website (honeypot), ts.
 * El doble opt-in se configura en MailerLite.
 */
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    ig_json(405, ['ok' => false, 'message' => 'Método no permitido.']);
}

if (ig_is_bot()) {
    ig_respond(true, 'ok'); // no damos pistas al bot
}

if (!ig_rate_limit('nl', 5, 600)) {
    ig_respond(false, 'Demasiados intentos. Prueba de nuevo en unos minutos.');
}

$email = filter_var(ig_clean('email', 254), FILTER_VALIDATE_EMAIL);
if (!$email) {
    ig_respond(false, 'Ese email no parece válido. Revisa que tenga @ y un dominio.');
}

$ok = ig_mailerlite_subscribe($CONFIG, $email, 'newsletter', [
    'name' => ig_clean('name', 80),
    'source' => ig_clean('source', 160),
    'placement' => ig_clean('placement', 60),
    'lead_magnet' => ig_clean('lead_magnet', 80),
]);

ig_respond($ok, $ok ? 'ok' : 'No se ha podido completar la suscripción. Inténtalo más tarde.');

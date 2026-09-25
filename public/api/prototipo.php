<?php
/**
 * POST /api/prototipo.php · solicitud de prototipo gratis (o lista de espera si el cupo semanal está lleno).
 * 1. Valida y filtra spam (honeypot, tiempo mínimo, límite por IP).
 * 2. Cupo semanal REAL (semana ISO, lunes a domingo) guardado fuera de public_html: /home/<usuario>/ig-data/.
 * 3. Alta en MailerLite (grupo «prototipo» o «prototipo_espera») con todos los campos.
 * 4. Email a Iván con la solicitud.
 * Respuesta JSON: { ok, waitlist, message }
 */
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

const PROTO_TYPES = ['corporativa' => 'Web corporativa', 'marca-personal' => 'Marca personal', 'landing' => 'Landing page'];

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    ig_json(405, ['ok' => false, 'message' => 'Método no permitido.']);
}

$fail = fn(string $msg) => ig_respond(false, $msg, '/diseno-web', 'prototipo');

if (ig_is_bot()) {
    ig_respond(true, 'ok', '/diseno-web', 'prototipo', ['waitlist' => false]);
}
if (!ig_rate_limit('proto', 3, 3600)) {
    $fail('Has enviado varias solicitudes seguidas. Escríbeme a info@ivangarcia.pro y lo vemos.');
}

// ── Validación ───────────────────────────────────────────
$name = ig_clean('name', 100);
$email = filter_var(ig_clean('email', 254), FILTER_VALIDATE_EMAIL);
$phone = ig_clean('phone', 25);
$phoneDigits = preg_replace('/\D/', '', $phone);
$business = ig_clean('business', 120);
$web = ig_clean('website_url', 200);
$type = ig_clean('type', 30);
$goal = ig_clean('goal', 600);
$privacy = ($_POST['privacy'] ?? '') === '1';
$wantsWaitlist = ig_clean('mode', 20) === 'espera';

if (mb_strlen($name) < 2) $fail('Escribe tu nombre.');
if (!$email) $fail('Revisa el email: debe tener @ y un dominio.');
if (strlen($phoneDigits) < 9 || strlen($phoneDigits) > 15) $fail('Revisa el teléfono: entre 9 y 15 cifras, con prefijo si no estás en España.');
if (mb_strlen($business) < 2) $fail('Cuéntame a qué se dedica tu negocio.');
if (!isset(PROTO_TYPES[$type])) $fail('Elige qué tipo de web necesitas.');
if (mb_strlen($goal) < 5) $fail('Escribe en una frase qué quieres conseguir.');
if (!$privacy) $fail('Necesito que aceptes la política de privacidad.');

// ── Cupo semanal (con bloqueo de archivo para evitar carreras) ──
$total = (int) ($CONFIG['prototypes_per_week'] ?? 10);
$week = date('o-\WW');
$dir = dirname(__DIR__, 2) . '/ig-data';
if (!is_dir($dir)) @mkdir($dir, 0700, true);
$store = $dir . '/prototipos-' . $week . '.json';

$fh = fopen($store, 'c+');
if (!$fh) $fail('No se ha podido registrar la solicitud. Escríbeme a info@ivangarcia.pro.');
flock($fh, LOCK_EX);
$list = json_decode((string) stream_get_contents($fh), true) ?: [];
$emailHash = hash('sha256', strtolower($email));
$already = in_array($emailHash, array_column($list, 'h'), true);
$waitlist = $wantsWaitlist || (!$already && count($list) >= $total);
if (!$waitlist && !$already) {
    $list[] = ['h' => $emailHash, 't' => time()];
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($list));
}
flock($fh, LOCK_UN);
fclose($fh);

// ── MailerLite ───────────────────────────────────────────
$fields = [
    'name' => $name,
    'phone' => $phone,
    'company' => $business,
    'website' => $web,
    'web_type' => PROTO_TYPES[$type],
    'goal' => $goal,
    'source' => $waitlist ? 'lista_espera' : 'prototipo',
];
$mlOk = ig_mailerlite_subscribe($CONFIG, $email, $waitlist ? 'prototipo_espera' : 'prototipo', $fields);

// ── Aviso a Iván ─────────────────────────────────────────
$to = $CONFIG['notify_email'] ?? 'info@ivangarcia.pro';
$subject = ($waitlist ? '[Lista de espera] ' : '[Prototipo] ') . PROTO_TYPES[$type] . ' · ' . $business;
$body = implode("\n", [
    $waitlist ? 'Nueva solicitud en LISTA DE ESPERA (cupo lleno).' : 'Nueva solicitud de PROTOTIPO (entrega en 24 h laborables).',
    '',
    "Nombre: $name",
    "Email: $email",
    "Teléfono / WhatsApp: $phone",
    'WhatsApp directo: https://wa.me/' . $phoneDigits,
    "Negocio: $business",
    'Web actual: ' . ($web ?: '—'),
    'Tipo: ' . PROTO_TYPES[$type],
    "Objetivo: $goal",
    '',
    "Semana $week · solicitudes: " . count($list) . " de $total",
    'MailerLite: ' . ($mlOk ? 'OK' : 'ERROR (revisar token/grupo)'),
]);
$headers = [
    'From: ivangarcia.pro <no-reply@ivangarcia.pro>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];
$mailOk = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if (!$mlOk && !$mailOk) {
    $fail('No se ha podido enviar. Inténtalo de nuevo en unos minutos o escríbeme a info@ivangarcia.pro.');
}

ig_respond(true, 'ok', '/diseno-web', 'prototipo', ['waitlist' => $waitlist]);

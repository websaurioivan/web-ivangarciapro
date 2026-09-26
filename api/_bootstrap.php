<?php
/**
 * Utilidades comunes de los endpoints. La configuración (claves) vive FUERA de public_html:
 *   /home/<usuario>/ig-config.php  (plantilla en server/ig-config.example.php)
 */
declare(strict_types=1);

if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === '_bootstrap.php') {
    http_response_code(404);
    exit;
}

header_remove('X-Powered-By');

$configPath = dirname(__DIR__, 2) . '/ig-config.php';
$CONFIG = is_file($configPath) ? require $configPath : [];

function ig_json(int $status, array $body): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function ig_wants_json(): bool
{
    return str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
}

/** Respuesta sin JS: redirige a la página de origen con un parámetro de estado. */
function ig_respond(bool $ok, string $message, string $fallbackPath = '/', string $anchor = 'newsletter', array $extra = []): never
{
    if (ig_wants_json()) {
        ig_json($ok ? 200 : 400, ['ok' => $ok, 'message' => $message] + $extra);
    }
    $ref = parse_url($_SERVER['HTTP_REFERER'] ?? '', PHP_URL_PATH) ?: $fallbackPath;
    header('Location: ' . $ref . '?form=' . ($ok ? 'ok' : 'error') . '#' . $anchor, true, 303);
    exit;
}

/** Límite simple por IP: $max peticiones cada $window segundos. */
function ig_rate_limit(string $bucket, int $max, int $window): bool
{
    $dir = sys_get_temp_dir() . '/ig-rate';
    if (!is_dir($dir)) @mkdir($dir, 0700, true);
    $file = $dir . '/' . $bucket . '-' . hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'x');
    $now = time();
    $hits = is_file($file) ? array_filter(explode(',', (string) file_get_contents($file)), fn($t) => (int) $t > $now - $window) : [];
    if (count($hits) >= $max) return false;
    $hits[] = (string) $now;
    file_put_contents($file, implode(',', $hits), LOCK_EX);
    return true;
}

/** Honeypot + tiempo mínimo de relleno (2 s). */
function ig_is_bot(): bool
{
    if (!empty($_POST['website'])) return true;
    $ts = (int) ($_POST['ts'] ?? 0);
    return $ts > 0 && (microtime(true) * 1000 - $ts) < 2000;
}

function ig_clean(string $key, int $max = 200): string
{
    return mb_substr(trim(strip_tags((string) ($_POST[$key] ?? ''))), 0, $max);
}

/** Alta en MailerLite (API v2 connect.mailerlite.com). */
function ig_mailerlite_subscribe(array $config, string $email, string $groupKey, array $fields = []): bool
{
    $token = $config['mailerlite_token'] ?? '';
    $group = $config['mailerlite_groups'][$groupKey] ?? '';
    if (!$token) return false;
    $payload = ['email' => $email, 'fields' => (object) $fields];
    if ($group) $payload['groups'] = [$group];
    $ch = curl_init('https://connect.mailerlite.com/api/subscribers');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer ' . $token,
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
    ]);
    curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $code >= 200 && $code < 300;
}

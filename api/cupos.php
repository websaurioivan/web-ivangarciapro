<?php
/**
 * GET /api/cupos.php · prototipos restantes esta semana (lunes a domingo, semana ISO).
 * El contador lo incrementa prototipo.php (siguiente fase) en un archivo fuera de public_html.
 * Respuesta: { "restantes": 7, "total": 10, "semana": "2026-W39" }
 */
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

$total = (int) ($CONFIG['prototypes_per_week'] ?? 10);
$week = date('o-\WW');
$store = dirname(__DIR__, 2) . '/ig-data/prototipos-' . $week . '.json';
$used = is_file($store) ? count((array) json_decode((string) file_get_contents($store), true)) : 0;

header('Cache-Control: public, max-age=60');
ig_json(200, ['restantes' => max(0, $total - $used), 'total' => $total, 'semana' => $week]);

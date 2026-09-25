<?php
/**
 * Plantilla de configuración de los endpoints /api/*.php
 * Copia este archivo a /home/<usuario>/ig-config.php en Hostinger (FUERA de public_html)
 * y rellena los valores. Nunca lo subas al repositorio con claves reales.
 */
return [
    'mailerlite_token' => 'PEGA_AQUI_TU_API_TOKEN_DE_MAILERLITE',
    'mailerlite_groups' => [
        'newsletter' => 'ID_DEL_GRUPO_NEWSLETTER',
        'prototipo' => 'ID_DEL_GRUPO_PROTOTIPO',
        'prototipo_espera' => 'ID_DEL_GRUPO_LISTA_DE_ESPERA',
    ],
    'notify_email' => 'info@ivangarcia.pro',
    'prototypes_per_week' => 10,
];

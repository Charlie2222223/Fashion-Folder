<?php

return [
    'paths' => ['api/*', 'login', 'logout', '/sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'], // フロントエンドのURLを指定
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // 認証情報を含める場合はtrueに設定
];
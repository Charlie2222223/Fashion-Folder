# Fashion-Folder

このプロジェクトは、**Next.js** をフロントエンド、**Laravel** をバックエンドに使用したウェブアプリケーションです。開発は **Docker** を使用してコンテナ化されています。

---

## 使用技術一覧

<p style="display: inline">
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-TailwindCSS-000000.svg?logo=tailwindcss&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/-Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white">
  <img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=for-the-badge">
  <img src="https://img.shields.io/badge/-MySQL-4479A1.svg?logo=mysql&style=for-the-badge&logoColor=white">
</p>

---

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)
5. [トラブルシューティング](#トラブルシューティング)

---

## プロジェクトについて

このプロジェクトは、ファッション管理システムとして、登録した服やコーディネートを管理・表示するウェブアプリケーションです。

---

## 環境

| 言語・フレームワーク    | バージョン |
| --------------------- | ---------- |
| Laravel                | 9.52.16    |
| PHP                    | 8.0.2      |
| MySQL                  | 8.0        |
| Node.js                | 18.20.4    |
| Next.js                | 14.2.5     |
| React                  | 18.2.0     |
| Tailwind CSS           | 3.4.10     |

その他のパッケージのバージョンについては、`composer.json` や `package.json` を参照してください。

---

## ディレクトリ構成

```bash
├── .git
├── public
│   └── img
│
├── server
│   ├── app
│   ├── bootstrap
│   ├── config
│   ├── database
│   ├── lang
│   ├── public
│   ├── routes
│   ├── storage
│   └── tests
│
├── src
│   ├── components
│   │   ├── auth
│   │   ├── closet
│   │   ├── home
│   │   └── userAuth
│   ├── pages
│   │   ├── dashboard
│   │   └── userModal
│   ├── styles
│   └── types
│       └── closet
│
└── uml

```

---

## 環境構築

## 環境変数の設定

.env.example ファイルを .env にコピーし、必要な設定を行います。

```bash
# バックエンド
cd Server
cp .env.example .env

# フロントエンド
cp .env.example .env
```

.env ファイルの中身を以下に従って設定してください。

# 環境変数

以下は、このプロジェクトで使用される環境変数です。`APP_KEY` や `DB_PASSWORD` などの機密情報を必ず設定してください。

```bash
# アプリケーション設定
APP_NAME=Laravel
APP_ENV=local
APP_KEY=your-app-key-here
APP_DEBUG=true
APP_URL=http://localhost

# ログ設定
LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

# データベース設定
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_db
DB_USERNAME=root
DB_PASSWORD=your-db-password-here

# キャッシュとキュー
BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=database
SESSION_LIFETIME=120

# Memcached 設定
MEMCACHED_HOST=127.0.0.1

# Redis 設定
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

# メール設定
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-email-password-here
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"

# AWS 設定 (オプション)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

# Pusher 設定
PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

# Google OAuth 設定
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback

# フロントエンド URL
FRONTEND_URL=http://localhost:3000

# Sanctum 設定
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000,127.0.0.1,127.0.0.1:8000

# API キー
OPENAI_API_KEY=your-openai-api-key-here
PEXELS_API_KEY=your-pexels-api-key-here
GOOGLE_API_KEY=your-google-api-key-here

```

## コンテナのビルドと起動

Docker が動作していることを確認し、以下のコマンドで開発環境をセットアップします。

```bash
docker-compose up --build
```



## アプリケーションにアクセス

・フロントエンド: http://localhost:3000

・バックエンド API: http://localhost:8000

## コンテナの停止

コンテナを停止するには、以下のコマンドを実行します。

```bash
docker-compose down
```

## トラブルシューティング

.env: no such file or directory

.env ファイルがない場合は、環境変数の一覧を参考に作成してください。

docker daemon is not running

Docker Desktop が起動していない場合、まず Docker を起動してください。

Ports are not available: address already in use

ポートが既に使用されている可能性があります。他のコンテナやプロセスでそのポートが使われていないか確認してください。

Module not found

依存関係が正しくインストールされていない可能性があります。以下のコマンドを実行して Docker イメージを更新してください。

```bash

make build

```
<p align="right">(<a href="#top">トップへ</a>)</p>
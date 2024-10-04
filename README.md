# Fashion-Folder

このプロジェクトは、**Next.js** をフロントエンドに、**Laravel** をバックエンドに使用したフルスタックのウェブアプリケーションです。開発およびデプロイ環境は **Docker** を使用してコンテナ化されています。

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

このプロジェクトは、ファッション管理システムとして、登録した服やコーディネートを管理・表示するウェブアプリケーションです。**Next.js** を使用してフロントエンドを開発し、**Laravel** を使用して API ベースのバックエンドを構築しています。**Docker** を使用して環境をコンテナ化し、簡単に開発環境を構築・デプロイできるようになっています。

---

## 環境

| 言語・フレームワーク    | バージョン |
| --------------------- | ---------- |
| Laravel                | 10.x       |
| PHP                    | 8.1.x      |
| MySQL                  | 8.0        |
| Node.js                | 16.17.0    |
| Next.js                | 13.4.6     |
| React                  | 18.2.0     |
| Tailwind CSS           | 3.x        |

その他のパッケージのバージョンについては、`composer.json` や `package.json` を参照してください。

---

## ディレクトリ構成

```bash
❯ tree -a -I "node_modules|.next|.git|.pytest_cache|static" -L 2
.
├── .devcontainer
│   └── devcontainer.json
├── backend
│   ├── app
│   ├── config
│   ├── database
│   ├── public
│   └── routes
├── frontend
│   ├── components
│   ├── pages
│   ├── styles
│   └── public
├── docker-compose.yml
└── README.md
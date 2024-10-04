Fashion-Folder

このプロジェクトは、Next.js をフロントエンドに、Laravel をバックエンドに使用したフルスタックのウェブアプリケーションです。開発およびデプロイ環境は Docker を使用してコンテナ化されています。

前提条件

以下のソフトウェアがインストールされていることを確認してください：

	•	Docker と Docker Compose
	•	Node.js、Yarn（オプション、フロントエンドパッケージ管理のため）

開発環境のセットアップ

リポジトリのクローン

まず、プロジェクトをクローンします：

```bash
git clone https://github.com/yourusername/fashion-folder.git
cd fashion-folder
```

環境変数の設定

.env.example ファイルを .env にコピーし、それぞれの値を設定します。

```bash
# バックエンド
cp .env.example .env

# フロントエンド
cd frontend
cp .env.local.example .env.local
```

.env ファイルの各値を必要に応じて更新してください。

Docker コンテナのビルドと起動

Docker が動作していることを確認し、次のコマンドで開発環境をセットアップします：

```bash
docker-compose up --build
```
このコマンドは、Laravel バックエンドと Next.js フロントエンド用のコンテナをビルドして起動します。

アプリケーションにアクセス

	•	フロントエンド: http://localhost:3000
	•	バックエンド API: http://localhost:8000

コンテナの停止

コンテナを停止するには、次のコマンドを実行します：

```bash
docker-compose down
```
Docker サービス

	•	フロントエンド: Next.js (ポート 3000)
	•	バックエンド: Laravel (ポート 8000)
	•	データベース: MySQL (ポート 3306)

API ドキュメント

バックエンド API は /api にあります。Postman などのツールを使用して、さまざまなエンドポイントをテストできます。

使用技術

	•	Next.js - Reactベースのフレームワーク
	•	Laravel - バックエンドAPIの管理
	•	Tailwind CSS - スタイリングに使用
	•	Axios - API呼び出しに使用
    
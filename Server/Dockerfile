# ベースイメージの指定
FROM php:8.2-fpm

# 必要なパッケージのインストール
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 作業ディレクトリの設定
WORKDIR /var/www

# Laravelアプリケーションのコピー
COPY . .

# Composerで依存パッケージをインストール
RUN composer install

# パーミッションの設定
RUN chown -R www-data:www-data /var/www

# エントリーポイントスクリプトのコピー
COPY docker-entrypoint.sh /usr/local/bin/

# 実行権限を付与
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# コンテナ起動時にエントリーポイントスクリプトを実行
ENTRYPOINT ["docker-entrypoint.sh"]

# Laravelアプリケーションを起動
CMD php artisan serve --host=0.0.0.0 --port=8000
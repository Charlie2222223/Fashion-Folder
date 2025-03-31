#!/bin/bash

# MySQLが起動するまで待機
until mysqladmin ping -h"$DB_HOST" --silent; do
    echo "Waiting for MySQL..."
    sleep 2
done

echo "MySQL is up and running"

# public/storage シンボリックリンクの作成
if [ -L /var/www/public/storage ]; then
    rm /var/www/public/storage
fi
php artisan storage:link

# マイグレーションとシーディングを実行
php artisan migrate --force
php artisan db:seed --force

# キャッシュのクリア
php artisan config:clear
php artisan cache:clear
php artisan route:clear

exec "$@"
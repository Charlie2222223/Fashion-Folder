#!/bin/bash

# 必要なコマンドを自動実行
php artisan storage:link || true
php artisan migrate --force

# 既存のコマンドを実行（CMDの部分）
exec "$@"

# MySQLが起動するのを待つ
until nc -z -v -w30 mysql 3306; do
  echo 'Waiting for MySQL...'
  sleep 1
done

echo "MySQL is up and running"
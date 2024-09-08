# Dockerfile for backend

FROM php:8.2-fpm

# Install necessary dependencies including mysql-client and composer
RUN apt-get update && apt-get install -y \
    default-mysql-client \
    curl \
    unzip \
    && docker-php-ext-install pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www

# Copy application files
COPY . .

# Install composer dependencies
RUN composer install

# Set permissions for www-data
RUN chown -R www-data:www-data /var/www

# Start the PHP server
CMD php artisan serve --host=0.0.0.0 --port=8000
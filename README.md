# Тестовое задание для TD Media

К сожалению, не получилось реализовать запуск контейнера в одну строку, даже хуже: придётся установить зависимости обоих проектов ручками используя Composer и NPM для Laravel и React соответственно. Очень жаль.

## Необходимые инструменты
[Docker](https://www.docker.com/get-started)

[PHP v7.3.27](https://windows.php.net/download#php-7.3)

[Node.js](https://nodejs.org/en/)

[Composer](https://getcomposer.org/download/)

## Как запустить
```cd backend && composer install``` для установки зависимостей laravel

```cd ../frontend && npm install``` для установки зависимостей React

```docker-compose up -d --build``` чтобы поднять контейнер с ИС

```docker-compose exec backend php artisan migrate:fresh``` для того, чтобы создать таблицы ИС

```docker-compose exec backend php artisan db:seed``` для того, чтобы наполнить БД тестовыми данными

```docker-compose exec backend php artisan passport:install``` для того, чтобы создать ключи шифрования, необходимые для токенов, используемых при авторизации

**В случае, если Вы создали ключи шифрования, однако приложение всё ещё выдаёт ошибку - просто подождите** 
 
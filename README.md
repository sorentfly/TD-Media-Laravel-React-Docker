# Тестовое задание для TD Media

## Как запустить
```docker-compose up -d --build``` чтобы поднять контейнер с ИС

```docker-compose exec backend php artisan migrate:fresh``` для того, чтобы создать таблицы ИС

```docker-compose exec backend php artisan db:seed``` для того, чтобы наполнить БД тестовыми данными

```docker-compose exec backend php artisan passport:install``` для того, чтобы создать ключи шифрования, необходимые для токенов, используемых при авторизации

**В случае, если Вы создали ключи шифрования, однако приложение всё ещё выдаёт ошибку - просто подождите** 
 
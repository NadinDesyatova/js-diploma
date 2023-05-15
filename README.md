# Дипломное задание по курсу «JavaScript-программирование для начинающих»

## Создание «информационной системы для предварительного бронирования билетов»

## API сервиса:

#### Базовый URL АПИ: *https://jscp-diplom.netoserver.ru/*

#### Ответы API

* Ответы API приходят в формате JSON. Чтобы распарсить ответ, используется функция JSON.parse().

#### Запросы к API

* При отправке запросов используются следующие параметры:

1. Адрес (URL) - *https://jscp-diplom.netoserver.ru/*
2. Метод (Method) - `POST`
3. HTTP заголовок (HttpRequest). Название заголовка: `Content-Type`. Значение заголовка: `application/x-www-form-urlencoded`.


## Изначально предоставляются следующие компоненты системы:

* Верстка;
* Backend.

## Результат

* Разработан сайт бронирования билетов онлайн.

## Сущности

* Кинозал. Помещение, в котором демонстрируются фильмы. Режим работы определяется расписанием на день. Зал - прямоугольный, состоит из `N * M` различных мест.
* Зрительское место. Место в кинозале. Зрительские места могут быть VIP и обычные.
* Фильм. Информация о фильме заполняется администратором. Фильм связан с сеансом в кинозале.
* Сеанс. Сеанс — это временной промежуток, в котором в кинозале будет показываться фильм. На сеанс могут быть забронированы билеты.
* Билет. QR-код c уникальным кодом бронирования, в котором обязательно указаны место, ряд, сеанс. Билет действителен строго на свой сеанс. Для генерации QR-кода используется файл `./js/QRCreator.js`.

## Роли пользователей системы

* Гость — неавторизованный посетитель сайта.

## Этапы разработки
1. Для написания кода используется редактор кода [Sublime][1]
2. Исходная верстка адаптирована под планшетные и мобильные устройства, и теперь корректно отображается на устройствах с шириной экрана 320px и более.
3. Выполнена разработка взаимодействия с Backend - - файл `./js/createRequest.js`.
4. Программирование гостевой части:
* просмотр расписания - файл `./js/index.js`;
* просмотр информации о фильмах - файл `./js/index.js`;
* выбор места в кинозале - файл `./js/hall.js`;
* бронирование билета - файлы `./js/payment.js` и `./js/ticket.js`;
5. Проект опубликован в Git-репозитории на [GitHub][2] и на GithubPage. Ссылка на проект: *https://nadindesyatova.github.io/js-diploma/*

[1]: https://www.sublimetext.com/
[2]: https://github.com/

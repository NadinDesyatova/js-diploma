# Дипломное задание по курсу «JavaScript-программирование для начинающих»

## Создание «информационной системы для предварительного бронирования билетов»

## API сервиса:

#### Базовый URL АПИ: *http://f0769682.xsph.ru/*

#### Ответы API

* Ответы API приходят в формате JSON. Чтобы распарсить ответ используйте функцию `JSON.parse()`.

#### Запросы к API

* При отправке запросов используйте следующие параметры:

1. Адрес (URL) - *http://f0769682.xsph.ru/*
2. Метод (Method) - `POST`
3. HTTP заголовок (HttpRequest). Название заголовка: `Content-Type`. Значение заголовка: `application/x-www-form-urlencoded`.


## Студенту предоставляются следующие компоненты системы:

* Верстка;
* Backend.

## Задача

* Разработать сайт бронирования билетов онлайн.

## Сущности

* Кинозал. Помещение, в котором демонстрируются фильмы. Режим работы определяется расписанием на день. Зал - прямоугольный, состоит из `N * M` различных мест.
* Зрительское место. Место в кинозале. Зрительские места могут быть VIP и обычные.
* Фильм. Информация о фильме заполняется администратором. Фильм связан с сеансом в кинозале.
* Сеанс. Сеанс — это временной промежуток, в котором в кинозале будет показываться фильм. На сеанс могут быть забронированы билеты.
* Билет. QR-код c уникальным кодом бронирования, в котором обязательно указаны место, ряд, сеанс. Билет действителен строго на свой сеанс. Для генерации QR-кода можно использовать `QRCreator.js`.

## Роли пользователей системы

* Гость — неавторизованный посетитель сайта.

## Возможности гостя

* просмотр расписания;
* просмотр информации о фильмах;
* выбор места в кинозале;
* бронирование билета.

## Этапы разработки

1. Адаптируйте исходную верстку под планшетные и мобильные устройства. Ваша верстка должна корректно отображаться на устройствах с шириной экрана 320px и более. Для быстрой адаптации рекомендуем вам воспользоваться системой сеток `BootStrap`.
2. Разработка API для взаимодействия с Backend.
3. Программирование гостевой части.

## Что должно получиться в итоге

* Git-репозиторий, содержащий в себе необходимые файлы проекта, и файл Readme, в котором должна быть ссылка на ваш проект, опубликованный на githubPage, а также описание стэка технологий, используемых вами в процессе работы над проектом.


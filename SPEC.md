# SPEC --- Техническая спецификация

## 1. Рекомендуемый стек

-   Web: Next.js + TypeScript.
-   UI: CSS Modules или единый выбранный подход к стилям, дизайн-токены.
-   Backend: серверные маршруты Next.js для MVP или отдельный API позже.
-   База: Neon (Serverless PostgreSQL); ORM с миграциями (Prisma или Drizzle).
-   Валидация: Zod или аналог.
-   Локализация: библиотека i18n с маршрутами `/ru` и `/en`.
-   Mobile: Expo + React Native + TypeScript.
-   Telegram: Telegram Mini App.
-   Тесты: unit/integration и Playwright для основных web-сценариев.

SQLite-файл на временном хостинге не подходит как единственное
постоянное хранилище заказов.

## 2. Архитектура

``` text
Next.js website ───────┐
Telegram Mini App ─────┼── HTTPS API ── Neon (PostgreSQL)
Expo mobile app ───────┘       │
                               ├── Payment adapter (позже)
                               └── Admin tools (позже)
```

Все каналы используют общий backend как источник истины для цен,
наличия, заказов и статусов оплаты. Секреты никогда не помещаются в
браузер, Mini App или мобильное приложение.

## 3. Маршруты

-   `/[locale]` --- главная.
-   `/[locale]/catalog`, `/[locale]/category/[slug]`.
-   `/[locale]/product/[slug]`.
-   `/[locale]/search?q=...`.
-   `/[locale]/favorites`, `/[locale]/cart`, `/[locale]/checkout`.
-   `/[locale]/order/[publicToken]` --- безопасный просмотр результата
    заказа.
-   `/[locale]/about`, `/[locale]/delivery-returns`, `/[locale]/faq`,
    `/[locale]/privacy`, `/[locale]/terms`.

## 4. Компоненты

`SiteHeader`, `MobileNavigation`, `SiteFooter`, `LanguageSwitcher`,
`ProductCard`, `ProductGrid`, `BentoSection`, `FilterPanel`, `Search`,
`QuantityStepper`, `Toast`, `Skeleton`.

## 5. Дизайн-токены

``` css
:root {
  --color-canvas: #F7F4EF;
  --color-surface: #FFFFFF;
  --color-ink: #171614;
  --color-muted: #77716B;
  --color-rose: #E8C7C7;
  --color-sage: #B7C2B0;
  --color-lilac: #D9D0E2;
  --color-border: #E7E1DA;
  --radius-card: 20px;
  --radius-control: 12px;
  --content-max: 1440px;
}
```

Desktop: 12-колоночная сетка; tablet: упрощённая композиция; mobile:
одна колонка или компактная сетка товаров. Serif использовать как
акцент, sans-serif --- для интерфейса.

## 6. Модели данных

-   **Product:** `id`, `slug`, `nameRu`, `nameEn`, `descriptionRu`,
    `descriptionEn`, `categoryId`, `status`, timestamps.
-   **ProductVariant:** `id`, `productId`, `sku`, `shadeNameRu`,
    `shadeNameEn`, `priceMinor`, `currency`, `stockQuantity`,
    `imageUrl`, `isActive`.
-   **Category:** `id`, `slug`, `nameRu`, `nameEn`, описания RU/EN,
    `sortOrder`.
-   **Order:** `id`, `orderNumber`, `status`, `paymentStatus`,
    контактные данные, адрес/метод доставки, валюта, суммы в минимальных
    денежных единицах, locale, timestamp.
-   **OrderItem:** `orderId`, `variantId`, `skuSnapshot`,
    `nameSnapshot`, `quantity`, `unitPriceMinor`, `lineTotalMinor`.
-   **PaymentAttempt (позже):** `id`, `orderId`, `provider`,
    `providerReference`, `status`, `amountMinor`, `currency`, timestamp.

Снимок названия и цены в заказе нужен, чтобы исторический заказ не
изменился после редактирования товара. Не хранить карточные данные, CVC
и другие секреты оплаты.

## 7. API на уровне MVP

-   `GET /api/products?locale=ru&category=...&sort=...&page=...`
-   `GET /api/products/:slug?locale=ru`
-   `GET /api/categories?locale=ru`
-   `POST /api/orders`
-   `GET /api/orders/:publicToken`
-   Позже: `POST /api/payments/session`,
    `POST /api/payments/webhook/:provider`.

Backend валидирует данные, заново рассчитывает сумму и проверяет
наличие. Клиент не может назначить цену или статус «оплачено». Защитить
создание заказа от повторных запросов и гонок остатков.

## 8. Платёжная архитектура

**Сначала demo:** чёткая надпись, что деньги не списываются.\
**Локальная касса/провайдер:** сначала уточнить точный сервис, страну,
валюту, API, sandbox и фискальные требования.\
**Stripe:** заранее проверить доступность для страны и юридического лица
продавца. Секретный ключ хранить только на сервере. Статус оплаты
подтверждать проверенным webhook, а не возвращением пользователя на
success-страницу. Реальные платежи включать только после юридической и
технической проверки.

## 9. Telegram Mini App

Использовать общий API. Проверять `initData` на backend по официальному
алгоритму Telegram. Учитывать viewport и safe areas. Не хранить секреты
в клиентском коде. На первом этапе достаточно каталога, товара, корзины
и demo checkout.

## 10. Expo приложение

Expo + React Native + TypeScript. Основные экраны: главная, каталог,
поиск, товар, избранное, корзина, checkout и, если нужно,
профиль/заказы. UI будет платформенным, но API и бизнес-правила общие.
Токены с доступом к личным данным хранить в secure storage, а не в
обычном AsyncStorage.

## 11. Безопасность

HTTPS; серверные секреты в environment variables; валидация входных
данных; rate limiting для чувствительных маршрутов; безопасные
cookies/CSRF-защита там, где применимо; ограниченный доступ к заказам;
защищённая админка; минимизация персональных данных; отсутствие
платёжных секретов в логах и Git.

## 12. SEO и производительность

Оптимизировать изображения, лениво загружать изображения ниже первого
экрана, задавать уникальные метаданные RU/EN, читабельные URL,
sitemap/robots и hreflang при необходимости. Добавлять structured data
только при достоверных данных.

## 13. Проверки

Unit: суммы, форматирование цены, локализация. Integration: каталог,
заказ, недостаток товара и повторный запрос. E2E: путь от главной до
demo order. Проверить mobile/tablet/desktop, клавиатурную доступность,
сборку и отсутствие секретов в клиентском коде.

## 14. Environment variables

``` env
DATABASE_URL=
APP_BASE_URL=
PAYMENT_MODE=demo
LOCAL_PAYMENT_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
TELEGRAM_BOT_TOKEN=
```

`NEXT_PUBLIC_*` доступно клиенту; секреты никогда не должны иметь такой
префикс. Не все переменные нужны в MVP.

## 15. Definition of Done

Функция завершена, когда сценарий, загрузка, ошибки и пустые состояния
работают; тексты переведены; данные валидируются; нужные тесты проходят;
секреты защищены; документация обновлена; production build успешен.

# Cosmetics Shop — Web Application

Интернет-магазин декоративной косметики в эстетике premium beauty editorial.

## Технологический стек (Web)

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 + Дизайн-токены
- **Code Quality**: ESLint 9 + Prettier
- **Database (Фаза 2)**: Neon Serverless PostgreSQL + Prisma/Drizzle

## Структура проекта

```text
cosmetics_shop_project_docs/
├── PRD.md              # Требования к продукту
├── SPEC.md             # Техническая спецификация
├── TASKS.md            # Детальный трекер задач
├── TASKGUIDE.md        # Пошаговое руководство
└── web/                # Next.js веб-приложение
    ├── src/
    │   └── app/        # App Router маршруты и страницы
    ├── public/         # Статические ресурсы и изображения
    ├── .env.example    # Пример переменных окружения
    └── package.json    # Зависимости и скрипты
```

## Запуск проекта

1. Перейдите в директорию веб-приложения:
   ```bash
   cd web
   ```

2. Установите зависимости (если еще не установлены):
   ```bash
   npm install
   ```

3. Запустите сервер разработки:
   ```bash
   npm run dev
   ```
   Сайт откроется по адресу `http://localhost:3000`.

## Скрипты проверки качества

- `npm run lint` — запуск ESLint для проверки ошибок.
- `npm run format:check` — проверка форматирования через Prettier.
- `npm run format` — автоматическое форматирование кода.
- `npm run build` — сборка production-билда Next.js.

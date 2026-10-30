# Élixir Beauté — Mobile App (Expo & React Native)

Нативное мобильное приложение для интернет-магазина селективной косметики **Élixir Beauté** под iOS и Android на базе **Expo Router**.

## Архитектура
- **Фреймворк:** React Native + Expo (v52, New Architecture enabled)
- **Роутинг:** Expo Router (File-based navigation)
- **Стейт-менеджмент:** React Context + AsyncStorage (персистентная корзина)
- **Иконки:** `lucide-react-native`
- **Бэкенд:** Единый REST API Next.js (`https://marketc.vercel.app/api`)

## Структура папки `mobile/`:
```
mobile/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx    # Нижний таб-бар с бейджем корзины
│   │   ├── index.tsx      # Главный экран (Hero + Бестселлеры)
│   │   ├── catalog.tsx    # Каталог с поиском и категориями
│   │   ├── favorites.tsx  # Избранное
│   │   ├── cart.tsx       # Корзина с пересчетом количества
│   │   └── profile.tsx    # Профиль и клиентский сервис
│   ├── product/
│   │   └── [slug].tsx     # Экран товара с палитрой оттенков
│   ├── checkout.tsx       # Оформление заказа через общий API
│   └── _layout.tsx        # Главный стэк-навигатор
├── constants/
│   └── theme.ts           # Цвета бренда Femi и конфиг API
├── context/
│   └── CartContext.tsx    # Корзина с кэшем на устройстве
├── types/
│   └── index.ts           # Типы данных
├── app.json
└── package.json
```

## Как запустить на телефоне:

1. Установи Expo CLI на компьютер (если ещё нет):
   ```bash
   npm install -g expo-cli
   ```
2. Перейди в папку `mobile` и установи зависимости:
   ```bash
   cd mobile
   npm install
   ```
3. Запусти Expo:
   ```bash
   npx expo start
   ```
4. Установи на свой смартфон бесплатное приложение **Expo Go** (из App Store для iPhone или Google Play для Android).
5. Отсканируй камерой смартфона появившийся в терминале QR-код — приложение сразу откроется на твоём телефоне!

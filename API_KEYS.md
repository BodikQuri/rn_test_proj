# API Keys

## TMDB API Key

Щоб використовувати функціонал пошуку фільмів, потрібно отримати безкоштовний API ключ від The Movie Database (TMDB):

1. Зареєструйтеся на https://www.themoviedb.org/signup
2. Підтвердьте email
3. Перейдіть в налаштування API: https://www.themoviedb.org/settings/api
4. Заповніть форму запиту API ключа (оберіть "Developer")
5. Скопіюйте "API Key (v3 auth)"
6. Вставте ключ в файл `/consts/tmdb.ts`:

```typescript
export const TMDB_API_KEY = "ваш_ключ_тут";
```

Документація API: https://developers.themoviedb.org/3

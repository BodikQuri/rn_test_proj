export const uk = {
  // Navigation
  nav: {
    movies: "Фільми",
    favorites: "Вподобане",
    todos: "Завдання",
  },

  // Movies Screen
  movies: {
    title: "Фільми",
    searchPlaceholder: "Пошук фільмів...",
    noDescription: "Опис відсутній",
  },

  // Favorites Screen
  favorites: {
    title: "Вподобане",
    count: (count: number) => {
      if (count === 1) return "1 фільм";
      if (count < 5) return `${count} фільми`;
      return `${count} фільмів`;
    },
    emptyTitle: "Тут будуть ваші улюблені фільми",
    emptySubtitle: "Додайте фільми до вподобаного, щоб переглянути їх пізніше",
  },

  // Movie Details Screen
  movieDetails: {
    back: "Назад",
    loadError: "Не вдалося завантажити фільм",
    overview: "Опис",
    genres: "Жанри",
    runtime: "Тривалість",
    hours: "г",
    minutes: "хв",
    budget: "Бюджет",
    revenue: "Касові збори",
    finances: "Фінанси",
    status: "Статус",
    released: "Випущено",
  },

  // Todos Screen
  todos: {
    title: "Мої завдання",
    subtitle: (count: number) => {
      if (count === 0) return "Немає завдань";
      if (count === 1) return "1 завдання";
      if (count < 5) return `${count} завдання`;
      return `${count} завдань`;
    },
    addButton: "Додати завдання",
    emptyTitle: "Немає завдань",
    emptySubtitle: "Створіть своє перше завдання",
    deleteAll: "Видалити всі",
    deleteConfirm: "Видалити задачу?",
    deleteConfirmMessage: "Ви впевнені, що хочете видалити цю задачу?",
    confirmDeleteAll: "Видалити всі завдання?",
    confirmDeleteAllMessage: "Ця дія незворотна",
    cancel: "Скасувати",
    delete: "Видалити",
    completed: "Виконано",
  },

  // Create Todo Screen
  createTodo: {
    newTitle: "Нова задача",
    editTitle: "Редагувати задачу",
    titleLabel: "Назва",
    titlePlaceholder: "Введіть назву задачі...",
    descriptionLabel: "Опис",
    descriptionPlaceholder: "Введіть опис задачі...",
    colorLabel: "Колір фону",
    selectColor: "Оберіть колір",
    create: "Створити",
    save: "Зберегти",
    cancel: "Скасувати",
    emptyError: "Будь ласка, введіть текст задачі",
  },

  // Color Picker Screen
  colorPicker: {
    title: "Оберіть колір",
    red: "Червоний",
    green: "Зелений",
    blue: "Синій",
    hex: "HEX",
    rgb: "RGB",
    confirm: "Підтвердити",
    cancel: "Скасувати",
  },

  // Common
  common: {
    loading: "Завантаження...",
    error: "Помилка",
    retry: "Спробувати знову",
    ok: "OK",
    yes: "Так",
    no: "Ні",
    back: "Назад",
    cancel: "Скасувати",
    delete: "Видалити",
  },

  // Toast messages
  toast: {
    apiError: "Виникла помилка при завантаженні даних",
  },
};

export type TranslationKeys = typeof uk;

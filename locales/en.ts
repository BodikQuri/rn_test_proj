export const en = {
  // Navigation
  nav: {
    movies: "Movies",
    favorites: "Favorites",
    todos: "Tasks",
  },

  // Movies Screen
  movies: {
    title: "Movies",
    searchPlaceholder: "Search movies...",
    noDescription: "No description available",
  },

  // Favorites Screen
  favorites: {
    title: "Favorites",
    count: (count: number) => {
      return count === 1 ? "1 movie" : `${count} movies`;
    },
    emptyTitle: "Your favorite movies will appear here",
    emptySubtitle: "Add movies to favorites to see them later",
  },

  // Movie Details Screen
  movieDetails: {
    back: "Back",
    loadError: "Failed to load movie",
    overview: "Overview",
    genres: "Genres",
    runtime: "Runtime",
    hours: "h",
    minutes: "min",
    budget: "Budget",
    revenue: "Box Office",
    finances: "Finances",
    status: "Status",
    released: "Released",
  },

  // Todos Screen
  todos: {
    title: "My Tasks",
    subtitle: (count: number) => {
      if (count === 0) return "No tasks";
      return count === 1 ? "1 task" : `${count} tasks`;
    },
    addButton: "Add Task",
    emptyTitle: "No tasks",
    emptySubtitle: "Create your first task",
    deleteAll: "Delete All",
    deleteConfirm: "Delete task?",
    deleteConfirmMessage: "Are you sure you want to delete this task?",
    confirmDeleteAll: "Delete all tasks?",
    confirmDeleteAllMessage: "This action cannot be undone",
    cancel: "Cancel",
    delete: "Delete",
    completed: "Completed",
  },

  // Create Todo Screen
  createTodo: {
    newTitle: "New Task",
    editTitle: "Edit Task",
    titleLabel: "Title",
    titlePlaceholder: "Enter task title...",
    descriptionLabel: "Description",
    descriptionPlaceholder: "Enter task description...",
    colorLabel: "Background Color",
    selectColor: "Select color",
    create: "Create",
    save: "Save",
    cancel: "Cancel",
    emptyError: "Please enter task text",
  },

  // Color Picker Screen
  colorPicker: {
    title: "Select Color",
    red: "Red",
    green: "Green",
    blue: "Blue",
    hex: "HEX",
    rgb: "RGB",
    confirm: "Confirm",
    cancel: "Cancel",
  },

  // Common
  common: {
    loading: "Loading...",
    error: "Error",
    retry: "Retry",
    ok: "OK",
    yes: "Yes",
    no: "No",
    back: "Back",
    cancel: "Cancel",
    delete: "Delete",
  },

  // Toast messages
  toast: {
    apiError: "An error occurred while loading data",
  },
};

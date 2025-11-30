import { TMDB_API_KEY, TMDB_BASE_URL } from "@/consts/tmdb";
import { Movie, MovieDetails } from "@/types/movie";
import axios from "axios";
import Toast from "react-native-toast-message";

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "uk-UA",
  },
});

// Add error interceptor
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.status_message || 
                        error.message || 
                        "Виникла помилка при завантаженні даних";
    
    Toast.show({
      type: "error",
      text1: "Помилка",
      text2: errorMessage,
      position: "top",
      visibilityTime: 3000,
    });
    
    return Promise.reject(error);
  }
);

export const moviesApi = {
  // Отримати популярні фільми
  getPopular: async (page: number = 1): Promise<Movie[]> => {
    const response = await tmdbApi.get("/movie/popular", {
      params: { page },
    });
    return response.data.results;
  },

  // Пошук фільмів
  searchMovies: async (query: string, page: number = 1): Promise<Movie[]> => {
    const response = await tmdbApi.get("/search/movie", {
      params: { query, page },
    });
    return response.data.results;
  },

  // Отримати деталі фільму
  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  },

  // Отримати схожі фільми
  getSimilarMovies: async (movieId: number): Promise<Movie[]> => {
    const response = await tmdbApi.get(`/movie/${movieId}/similar`);
    return response.data.results;
  },

  // Отримати рекомендовані фільми
  getRecommendations: async (movieId: number): Promise<Movie[]> => {
    const response = await tmdbApi.get(`/movie/${movieId}/recommendations`);
    return response.data.results;
  },
};

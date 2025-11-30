import { Movie } from "@/types/movie";
import { storage, StorageKeys } from "@/utils/storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  getCachedMovie: (movieId: number) => Promise<Movie | null>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await storage.getString(StorageKeys.FAVORITES);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  const saveFavorites = async (newFavorites: Movie[]) => {
    try {
      await storage.set(StorageKeys.FAVORITES, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const addFavorite = (movie: Movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    saveFavorites(newFavorites);

    // Cache movie data
    storage.set(`${StorageKeys.MOVIE_CACHE}${movie.id}`, JSON.stringify(movie));
  };

  const removeFavorite = (movieId: number) => {
    const newFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const getCachedMovie = async (movieId: number): Promise<Movie | null> => {
    try {
      const cached = await storage.getString(
        `${StorageKeys.MOVIE_CACHE}${movieId}`
      );
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (error) {
      console.error("Error loading cached movie:", error);
    }
    return null;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        getCachedMovie,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

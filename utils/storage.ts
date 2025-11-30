import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  getString: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  },

  set: async (key: string, value: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
    }
  },

  delete: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error deleting ${key}:`, error);
    }
  },
};

export const StorageKeys = {
  FAVORITES: "favorites",
  MOVIE_CACHE: "movie_cache_",
} as const;


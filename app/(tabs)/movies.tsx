import MovieCard from "@/components/MovieCard";
import { StyledText } from "@/components/StyleText";
import { COLORS } from "@/consts/ui";
import { useTranslation } from "@/locales";
import { moviesApi } from "@/services/tmdb";
import { Movie } from "@/types/movie";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MoviesScreen() {
  const t = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    setLoading(true);
    try {
      const data = await moviesApi.getPopular();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      fetchPopularMovies();
      return;
    }

    setLoading(true);
    try {
      const data = await moviesApi.searchMovies(query);
      setMovies(data);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length >= 2) {
      searchMovies(text);
    } else if (text.length === 0) {
      fetchPopularMovies();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <StyledText style={styles.headerTitle}>{t.movies.title}</StyledText>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.primary_text + "60"}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={t.movies.searchPlaceholder}
            placeholderTextColor={COLORS.primary_text + "60"}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.primary_text + "60"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary_background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary_background,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary_text,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary_background,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.primary_text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 16,
  },
});

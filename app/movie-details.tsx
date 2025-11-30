import { StyledButton } from "@/components/StyledButton";
import { StyledText } from "@/components/StyleText";
import { TMDB_IMAGE_BASE } from "@/consts/tmdb";
import { COLORS } from "@/consts/ui";
import { useFavorites } from "@/context/FavoritesContext";
import { useTranslation } from "@/locales";
import { moviesApi } from "@/services/tmdb";
import { MovieDetails } from "@/types/movie";
import { storage, StorageKeys } from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function MovieDetailsScreen() {
  const params = useLocalSearchParams();
  const movieId = params.id as string;
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const t = useTranslation();

  const favorite = movie ? isFavorite(movie.id) : false;

  const fetchMovieDetails = async () => {
    setLoading(true);
    try {
      // Try to load from cache first
      const cacheKey = `${StorageKeys.MOVIE_CACHE}${movieId}_details`;
      const cached = await storage.getString(cacheKey);

      if (cached) {
        const cachedMovie = JSON.parse(cached);
        setMovie(cachedMovie);
        setLoading(false);

        // Fetch fresh data in background
        const data = await moviesApi.getMovieDetails(Number(movieId));
        setMovie(data);
        await storage.set(cacheKey, JSON.stringify(data));
      } else {
        const data = await moviesApi.getMovieDetails(Number(movieId));
        setMovie(data);
        await storage.set(cacheKey, JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <StatusBar barStyle="light-content" />
        <StyledText style={styles.errorText}>
          {t.movieDetails.loadError}
        </StyledText>
        <StyledButton title={t.common.back} onPress={handleBack} />
      </View>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE}${movie.backdrop_path}`
    : movie.poster_path
      ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image";

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        {/* Backdrop Image */}
        <View style={styles.backdropContainer}>
          <Image
            source={{ uri: backdropUrl }}
            style={styles.backdrop}
            resizeMode="cover"
          />
          <View style={styles.backdropOverlay} />
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => {
              if (movie) {
                if (favorite) {
                  removeFavorite(movie.id);
                } else {
                  addFavorite({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    backdrop_path: movie.backdrop_path,
                    overview: movie.overview,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count,
                    genre_ids: movie.genres?.map((g) => g.id) || [],
                    popularity: movie.popularity,
                    original_language: movie.original_language,
                  });
                }
              }
            }}
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={28}
              color={favorite ? "#FF6B6B" : "#FFFFFF"}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Poster and Title Section */}
          <View style={styles.headerSection}>
            <Image
              source={{ uri: posterUrl }}
              style={styles.poster}
              resizeMode="cover"
            />
            <View style={styles.headerInfo}>
              <StyledText style={styles.title}>{movie.title}</StyledText>
              {movie.tagline && (
                <StyledText style={styles.tagline}>
                  &ldquo;{movie.tagline}&rdquo;
                </StyledText>
              )}
              <View style={styles.metaRow}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={20} color="#FFD700" />
                  <StyledText style={styles.rating}>
                    {movie.vote_average.toFixed(1)}
                  </StyledText>
                  <StyledText style={styles.voteCount}>
                    ({movie.vote_count})
                  </StyledText>
                </View>
              </View>
              {movie.release_date && (
                <StyledText style={styles.releaseDate}>
                  {new Date(movie.release_date).toLocaleDateString("uk-UA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </StyledText>
              )}
            </View>
          </View>

          {/* Genres */}
          {movie.genres && movie.genres.length > 0 && (
            <View style={styles.genresContainer}>
              {movie.genres.map((genre) => (
                <View key={genre.id} style={styles.genreChip}>
                  <StyledText style={styles.genreText}>{genre.name}</StyledText>
                </View>
              ))}
            </View>
          )}

          {/* Runtime and Status */}
          <View style={styles.infoRow}>
            {movie.runtime > 0 && (
              <View style={styles.infoItem}>
                <Ionicons
                  name="time-outline"
                  size={18}
                  color={COLORS.primary_text}
                />
                <StyledText style={styles.infoText}>
                  {Math.floor(movie.runtime / 60)}
                  {t.movieDetails.hours} {movie.runtime % 60}
                  {t.movieDetails.minutes}
                </StyledText>
              </View>
            )}
            {movie.status && (
              <View style={styles.infoItem}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color={COLORS.primary_text}
                />
                <StyledText style={styles.infoText}>
                  {movie.status === "Released"
                    ? t.movieDetails.released
                    : movie.status}
                </StyledText>
              </View>
            )}
          </View>

          {/* Overview */}
          {movie.overview && (
            <View style={styles.section}>
              <StyledText style={styles.sectionTitle}>
                {t.movieDetails.overview}
              </StyledText>
              <StyledText style={styles.overview}>{movie.overview}</StyledText>
            </View>
          )}

          {/* Budget and Revenue */}
          {(movie.budget > 0 || movie.revenue > 0) && (
            <View style={styles.section}>
              <StyledText style={styles.sectionTitle}>
                {t.movieDetails.finances}
              </StyledText>
              {movie.budget > 0 && (
                <View style={styles.financeRow}>
                  <StyledText style={styles.financeLabel}>
                    {t.movieDetails.budget}:
                  </StyledText>
                  <StyledText style={styles.financeValue}>
                    ${movie.budget.toLocaleString()}
                  </StyledText>
                </View>
              )}
              {movie.revenue > 0 && (
                <View style={styles.financeRow}>
                  <StyledText style={styles.financeLabel}>
                    {t.movieDetails.revenue}:
                  </StyledText>
                  <StyledText style={styles.financeValue}>
                    ${movie.revenue.toLocaleString()}
                  </StyledText>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary_background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary_background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary_background,
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.primary_text,
    marginBottom: 20,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  backdropContainer: {
    width: "100%",
    height: 250,
    position: "relative",
  },
  backdrop: {
    width: "100%",
    height: "100%",
  },
  backdropOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 20,
  },
  headerSection: {
    flexDirection: "row",
    marginTop: -60,
    marginBottom: 20,
    gap: 16,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: COLORS.secondary_background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerInfo: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary_text,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    fontStyle: "italic",
    color: COLORS.primary_text + "90",
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary_text,
  },
  voteCount: {
    fontSize: 14,
    color: COLORS.primary_text + "80",
  },
  releaseDate: {
    fontSize: 14,
    color: COLORS.primary_text + "90",
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  genreChip: {
    backgroundColor: COLORS.primary + "20",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primary + "40",
  },
  genreText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
  },
  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.primary_text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary_text,
    marginBottom: 12,
  },
  overview: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.primary_text + "E0",
  },
  financeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  financeLabel: {
    fontSize: 15,
    color: COLORS.primary_text + "C0",
  },
  financeValue: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.primary_text,
  },
});

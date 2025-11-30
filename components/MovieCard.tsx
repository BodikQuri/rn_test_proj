import { StyledText } from "@/components/StyleText";
import { TMDB_IMAGE_BASE } from "@/consts/tmdb";
import { COLORS } from "@/consts/ui";
import { useFavorites } from "@/context/FavoritesContext";
import { useTranslation } from "@/locales";
import { Movie } from "@/types/movie";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);
  const t = useTranslation();

  const handlePress = () => {
    router.push(`/movie-details?id=${movie.id}` as any);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image
        source={{
          uri: movie.poster_path
            ? `${TMDB_IMAGE_BASE}${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image",
        }}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.movieInfo}>
        <View style={styles.titleRow}>
          <StyledText style={styles.movieTitle} numberOfLines={2}>
            {movie.title}
          </StyledText>
          <TouchableOpacity
            onPress={handleFavoritePress}
            style={styles.favoriteButton}
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={24}
              color={favorite ? "#FF6B6B" : COLORS.primary_text}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.movieMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <StyledText style={styles.rating}>
              {movie.vote_average.toFixed(1)}
            </StyledText>
          </View>
          <StyledText style={styles.releaseDate}>
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </StyledText>
        </View>
        <StyledText style={styles.overview} numberOfLines={3}>
          {movie.overview || t.movies.noDescription}
        </StyledText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary_background,
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  poster: {
    width: 100,
    height: 150,
  },
  movieInfo: {
    flex: 1,
    padding: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  movieTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary_text,
  },
  favoriteButton: {
    padding: 4,
    marginLeft: 8,
  },
  movieMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary_text,
  },
  releaseDate: {
    fontSize: 14,
    color: COLORS.primary_text + "80",
  },
  overview: {
    fontSize: 13,
    color: COLORS.primary_text + "90",
    lineHeight: 18,
  },
});

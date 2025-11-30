import MovieCard from "@/components/MovieCard";
import { StyledText } from "@/components/StyleText";
import { COLORS } from "@/consts/ui";
import { useFavorites } from "@/context/FavoritesContext";
import { useTranslation } from "@/locales";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StatusBar, StyleSheet, View } from "react-native";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const t = useTranslation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <StyledText style={styles.headerTitle}>{t.favorites.title}</StyledText>
        {favorites.length > 0 && (
          <StyledText style={styles.subtitle}>
            {t.favorites.count(favorites.length)}
          </StyledText>
        )}
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="heart-outline"
            size={80}
            color={COLORS.primary_text + "30"}
          />
          <StyledText style={styles.emptyText}>
            {t.favorites.emptyTitle}
          </StyledText>
          <StyledText style={styles.emptySubtext}>
            {t.favorites.emptySubtitle}
          </StyledText>
        </View>
      ) : (
        <FlatList
          data={favorites}
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary_background,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary_text,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.primary_text + "80",
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primary_text,
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.primary_text + "60",
    marginTop: 8,
    textAlign: "center",
  },
  listContent: {
    padding: 16,
  },
});

import { StyledText } from "@/components/StyleText";
import { COLORS } from "@/consts/ui";
import { StyleSheet, View } from "react-native";

interface HeaderProps {
  completedCount?: number;
  totalCount?: number;
}

const Header = ({ completedCount = 0, totalCount = 0 }: HeaderProps) => {
  const currentDate = new Date().toLocaleString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <View style={styles.container}>
      <View style={styles.mainHeader}>
        <StyledText
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: COLORS.primary_text,
          }}
        >
          Todo app
        </StyledText>
        <StyledText>{currentDate}</StyledText>
      </View>
      <StyledText>
        Completed {completedCount}/{totalCount}
      </StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop: 80,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary_background,
  },
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "flex-end",
    marginBottom: 25,
  },
});

export default Header;

import { COLORS } from "@/consts/ui";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

interface StyledCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  style?: ViewStyle;
}

export const StyledCheckbox = ({
  checked,
  onToggle,
  style,
}: StyledCheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && (
          <View style={styles.checkmark}>
            <Ionicons name="checkmark" size={16} color={COLORS.primary_text} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.primary_text,
    backgroundColor: "transparent",
  },
  checked: {
    backgroundColor: COLORS.primary_text,
  },
  checkmark: {
    backgroundColor: COLORS.primary,
    flex: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});

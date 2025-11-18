import { COLORS } from "@/consts/ui";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { StyledText } from "./StyleText";

interface StyledButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
}

export const StyledButton = ({
  title,
  variant = "primary",
  style,
  ...props
}: StyledButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" ? styles.primary : styles.secondary,
        style,
      ]}
      {...props}
    >
      <StyledText
        style={[
          styles.text,
          variant === "primary" ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {title}
      </StyledText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.primary_text,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: COLORS.primary_text,
  },
});

import { COLORS } from "@/consts/ui";
import { StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";

interface StyledInputProps extends TextInputProps {
  style?: TextStyle;
}

export const StyledInput = ({ style, ...props }: StyledInputProps) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={COLORS.primary_text + "80"}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary_text,
    backgroundColor: COLORS.primary_background,
    fontSize: 16,
    color: COLORS.primary,
  },
});

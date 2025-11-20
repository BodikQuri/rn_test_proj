import { StyledButton } from "@/components/StyledButton";
import { StyledInput } from "@/components/StyledInput";
import { StyledText } from "@/components/StyleText";
import { COLORS } from "@/consts/ui";
import Slider from "@react-native-community/slider";
import { router } from "expo-router";
import { useEffect, useReducer, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useColorPicker } from "./color-context";

type ColorAction =
  | { type: "SET_RED"; payload: number }
  | { type: "SET_GREEN"; payload: number }
  | { type: "SET_BLUE"; payload: number }
  | { type: "SET_FROM_HEX"; payload: { r: number; g: number; b: number } };

type ColorState = {
  red: number;
  green: number;
  blue: number;
};

const colorReducer = (state: ColorState, action: ColorAction): ColorState => {
  switch (action.type) {
    case "SET_RED":
      return { ...state, red: action.payload };
    case "SET_GREEN":
      return { ...state, green: action.payload };
    case "SET_BLUE":
      return { ...state, blue: action.payload };
    case "SET_FROM_HEX":
      return {
        red: action.payload.r,
        green: action.payload.g,
        blue: action.payload.b,
      };
    default:
      return state;
  }
};

export default function ColorPicker() {
  const [color, setColorReducer] = useReducer(colorReducer, {
    red: 255,
    green: 255,
    blue: 255,
  });
  const [hexInput, setHexInput] = useState("#FFFFFF");
  const [errorMessage, setErrorMessage] = useState("");

  // Оновлюємо hex при зміні RGB
  useEffect(() => {
    const hex = `#${color.red.toString(16).padStart(2, "0")}${color.green
      .toString(16)
      .padStart(
        2,
        "0"
      )}${color.blue.toString(16).padStart(2, "0")}`.toUpperCase();
    setHexInput(hex);
    setErrorMessage(""); // Очищаємо помилку при зміні
  }, [color.red, color.green, color.blue]);

  // Оновлюємо RGB при зміні hex
  const handleHexChange = (value: string) => {
    setHexInput(value);

    // Перевіряємо формат hex
    const hexRegex = /^#?([A-Fa-f0-9]{6})$/;
    const match = value.match(hexRegex);

    if (match) {
      const hex = match[1];
      setColorReducer({
        type: "SET_FROM_HEX",
        payload: {
          r: parseInt(hex.substring(0, 2), 16),
          g: parseInt(hex.substring(2, 4), 16),
          b: parseInt(hex.substring(4, 6), 16),
        },
      });
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const { onColorPick, setOnColorPick } = useColorPicker();

  const handleApply = (color: string) => {
    // Перевіряємо чи не білий колір
    if (color.toUpperCase() === "#FFFFFF") {
      setErrorMessage("Білий колір заборонено. Оберіть інший колір.");
      return;
    }

    onColorPick?.(color); // передаємо колір назад
    setOnColorPick(null); // очищаємо callback
    router.back();
  };

  const currentColor = `rgb(${color.red}, ${color.green}, ${color.blue})`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <StyledText style={styles.headerTitle}>Вибір кольору</StyledText>
        </View>

        <View style={styles.form}>
          {/* Превʼю кольору */}
          <View style={styles.previewContainer}>
            <View
              style={[styles.colorPreview, { backgroundColor: currentColor }]}
            />
            <View style={styles.colorInfo}>
              <StyledText style={styles.colorText}>
                RGB({color.red}, {color.green}, {color.blue})
              </StyledText>
              <StyledText style={styles.colorText}>{hexInput}</StyledText>
            </View>
          </View>

          {/* HEX Input */}
          <View style={styles.fieldContainer}>
            <StyledText style={styles.label}>HEX колір</StyledText>
            <StyledInput
              placeholder="#FFFFFF"
              value={hexInput}
              onChangeText={handleHexChange}
              style={styles.input}
              maxLength={7}
              autoCapitalize="characters"
            />
            {errorMessage ? (
              <StyledText style={styles.errorText}>{errorMessage}</StyledText>
            ) : null}
          </View>

          {/* RGB Sliders */}
          <View style={styles.slidersContainer}>
            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <StyledText style={styles.sliderLabel}>Red</StyledText>
                <StyledText style={styles.sliderValue}>{color.red}</StyledText>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={255}
                step={1}
                value={color.red}
                onValueChange={(value) =>
                  setColorReducer({
                    type: "SET_RED",
                    payload: Math.round(value),
                  })
                }
                onSlidingComplete={(value) =>
                  setColorReducer({
                    type: "SET_RED",
                    payload: Math.round(value),
                  })
                }
                minimumTrackTintColor="#FF0000"
                maximumTrackTintColor={COLORS.primary_text + "30"}
                thumbTintColor="#FF0000"
              />
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <StyledText style={styles.sliderLabel}>Green</StyledText>
                <StyledText style={styles.sliderValue}>
                  {color.green}
                </StyledText>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={255}
                step={1}
                value={color.green}
                onValueChange={(value) =>
                  setColorReducer({
                    type: "SET_GREEN",
                    payload: Math.round(value),
                  })
                }
                onSlidingComplete={(value) =>
                  setColorReducer({
                    type: "SET_GREEN",
                    payload: Math.round(value),
                  })
                }
                minimumTrackTintColor="#00FF00"
                maximumTrackTintColor={COLORS.primary_text + "30"}
                thumbTintColor="#00FF00"
              />
            </View>

            <View style={styles.sliderContainer}>
              <View style={styles.sliderHeader}>
                <StyledText style={styles.sliderLabel}>Blue</StyledText>
                <StyledText style={styles.sliderValue}>{color.blue}</StyledText>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={255}
                step={1}
                value={color.blue}
                onValueChange={(value) =>
                  setColorReducer({
                    type: "SET_BLUE",
                    payload: Math.round(value),
                  })
                }
                onSlidingComplete={(value) =>
                  setColorReducer({
                    type: "SET_BLUE",
                    payload: Math.round(value),
                  })
                }
                minimumTrackTintColor="#0000FF"
                maximumTrackTintColor={COLORS.primary_text + "30"}
                thumbTintColor="#0000FF"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <StyledButton
          title="Скасувати"
          variant="secondary"
          onPress={handleCancel}
          style={styles.button}
        />
        <StyledButton
          title="Застосувати"
          onPress={() => handleApply(hexInput)}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary_background,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary_background,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary_text,
  },
  form: {
    padding: 20,
  },
  previewContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  colorPreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: COLORS.primary_text + "20",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  colorInfo: {
    alignItems: "center",
    gap: 4,
  },
  colorText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary_text,
  },
  fieldContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: COLORS.primary_text,
  },
  input: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    color: "#FF0000",
    marginTop: 8,
    fontWeight: "600",
  },
  slidersContainer: {
    gap: 24,
  },
  sliderContainer: {
    gap: 8,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary_text,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary_text,
    minWidth: 40,
    textAlign: "right",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    padding: 20,
    backgroundColor: COLORS.secondary_background,
    borderTopWidth: 1,
    borderTopColor: COLORS.primary_text + "20",
  },
  button: {
    flex: 1,
  },
});

import { StyledCheckbox } from "@/components/StyledCheckbox";
import { COLORS } from "@/consts/ui";
import { Todo } from "@/types/todo";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface TodoItemProps {
  item: Todo;
  onToggle?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

// Функція для розрахунку контрастного кольору тексту
const getContrastColor = (backgroundColor?: string): string => {
  if (!backgroundColor) return COLORS.primary_text;

  // Видаляємо # з hex
  const hex = backgroundColor.replace("#", "");

  // Конвертуємо hex в RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Розраховуємо яскравість (за формулою luminance)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Якщо фон світлий - темний текст, якщо темний - світлий
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

const ToDoItem = ({
  item,
  onToggle,
  onEdit,
  onDelete,
  isDeleting,
}: TodoItemProps) => {
  const opacity = useSharedValue(item.completed ? 0.5 : 1);
  const scale = useSharedValue(1);
  const height = useSharedValue(90);
  const translateX = useSharedValue(0);

  // Розраховуємо контрастний колір
  const textColor = getContrastColor(item.backgroundColor);

  useEffect(() => {
    opacity.value = withTiming(item.completed ? 0.5 : 1, { duration: 300 });
    scale.value = withTiming(item.completed ? 0.98 : 1, { duration: 300 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.completed]);

  useEffect(() => {
    if (isDeleting) {
      opacity.value = withTiming(0, { duration: 300 });
      scale.value = withTiming(0.8, { duration: 300 });
      height.value = withTiming(0, { duration: 300 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleting]);

  const panGesture = Gesture.Pan()
    .minDistance(5)
    .onUpdate((event) => {
      if (event.translationX > 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd((event) => {
      translateX.value = withTiming(0);
      if (event.translationX > 100 && onToggle) {
        onToggle(item.id);
      }
    })
    .runOnJS(true);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { translateX: translateX.value }],
    height: height.value,
    marginBottom: height.value !== 0 ? 12 : withTiming(0, { duration: 300 }),
    overflow: "hidden",
  }));

  const textStyle = useAnimatedStyle(() => ({
    textDecorationLine: item.completed ? "line-through" : "none",
    opacity: opacity.value,
    color: textColor,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          item.backgroundColor && { backgroundColor: item.backgroundColor },
        ]}
        layout={LinearTransition.duration(300)}
      >
        <StyledCheckbox
          checked={item.completed}
          onToggle={() => onToggle?.(item.id)}
        />
        <Animated.Text style={[styles.title, textStyle]}>
          {item.title}
        </Animated.Text>
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => onEdit?.(item.id)}
            style={styles.iconButton}
          >
            <Ionicons name="pencil" size={20} color={COLORS.primary_text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete?.(item.id)}
            style={styles.iconButton}
          >
            <Ionicons name="trash" size={20} color={COLORS.primary_text} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondary_background,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.primary_text,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: COLORS.primary_background,
  },
});

export default ToDoItem;

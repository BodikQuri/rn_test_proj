import { StyledButton } from "@/components/StyledButton";
import { StyledInput } from "@/components/StyledInput";
import { StyledText } from "@/components/StyleText";
import { COLORS } from "@/consts/ui";
import { Todo } from "@/types/todo";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useColorPicker } from "./color-context";
import { useTodoContext } from "./todo-context";

export default function CreateTodo() {
  const params = useLocalSearchParams();
  const todoId = params.todoId as string | undefined;
  const { addTodo, updateTodo, todos } = useTodoContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#E8E8E8");

  // Завантажуємо дані todo якщо редагуємо
  useEffect(() => {
    if (todoId) {
      const todoToEdit = todos.find((t) => t.id === todoId);
      if (todoToEdit) {
        setTitle(todoToEdit.title);
        setDescription(todoToEdit.description || "");
        setBackgroundColor(todoToEdit.backgroundColor || "#E8E8E8");
      }
    }
  }, [todoId, todos]);

  // Отримуємо колір з color-picker
  useEffect(() => {
    if (params.selectedColor) {
      setBackgroundColor(params.selectedColor as string);
    }
  }, [params.selectedColor]);

  const handleCreate = () => {
    if (title.trim() === "") return;

    if (todoId) {
      // Режим редагування
      updateTodo(todoId, {
        title: title.trim(),
        description: description.trim(),
        backgroundColor,
      });
    } else {
      // Режим створення
      const todo: Todo = {
        title: title.trim(),
        description: description.trim(),
        id: Date.now().toString(),
        completed: false,
        backgroundColor,
      };
      addTodo(todo);
    }

    router.back();
  };

  const { setOnColorPick } = useColorPicker();

  const handleColorPicker = () => {
    // задаємо callback - обгортаємо у функцію щоб React не думав що це updater
    setOnColorPick(() => (selectedColor: string) => {
      setBackgroundColor(selectedColor); // отримаємо обране значення
    });

    router.push("/color-picker");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <StyledText style={styles.headerTitle}>
            {todoId ? "Редагувати задачу" : "Нова задача"}
          </StyledText>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldContainer}>
            <StyledText style={styles.label}>Назва</StyledText>
            <StyledInput
              placeholder="Введіть назву задачі..."
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
          </View>

          <View style={styles.fieldContainer}>
            <StyledText style={styles.label}>Опис</StyledText>
            <StyledInput
              placeholder="Введіть опис задачі..."
              value={description}
              onChangeText={setDescription}
              style={StyleSheet.flatten([styles.input, styles.textArea])}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.fieldContainer}>
            <StyledText style={styles.label}>Колір фону</StyledText>
            <TouchableOpacity
              style={styles.colorPickerButton}
              onPress={handleColorPicker}
            >
              <View
                style={[
                  styles.colorPreview,
                  { backgroundColor: backgroundColor },
                ]}
              />
              <StyledText style={styles.colorText}>
                {backgroundColor}
              </StyledText>
            </TouchableOpacity>
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
          title={todoId ? "Зберегти" : "Створити"}
          onPress={handleCreate}
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
  fieldContainer: {
    marginBottom: 24,
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
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingTop: 12,
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
  colorPickerButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: COLORS.secondary_background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary_text + "20",
    gap: 12,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary_text + "20",
  },
  colorText: {
    fontSize: 16,
    color: COLORS.primary_text,
    fontWeight: "600",
  },
});

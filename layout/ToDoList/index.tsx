import { COLORS } from "@/consts/ui";
import { Todo } from "@/types/todo";
import { FlatList, StyleSheet, Text, View, ViewStyle } from "react-native";
import ToDoItem from "../ToDoItem";

type TodoListProps = {
  todos: Todo[];
  style?: ViewStyle;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  deletingTodos?: Set<string>;
};

type ListItem = Todo | { type: "separator" };

const TodoList = ({
  todos,
  style,
  onToggle,
  onDelete,
  onEdit,
  deletingTodos,
}: TodoListProps) => {
  // Розділяємо todos на активні та виконані
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  // Створюємо масив з роздільником
  const dataWithSeparator: ListItem[] = [
    ...activeTodos,
    ...(completedTodos.length > 0 ? [{ type: "separator" as const }] : []),
    ...completedTodos,
  ];

  const renderItem = ({ item }: { item: ListItem }) => {
    if ("type" in item && item.type === "separator") {
      return (
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Виконано</Text>
          <View style={styles.separatorLine} />
        </View>
      );
    }

    const todo = item as Todo;
    return (
      <ToDoItem
        item={todo}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
        isDeleting={deletingTodos?.has(todo.id) || false}
      />
    );
  };

  const getItemKey = (item: ListItem, index: number) => {
    if ("type" in item && item.type === "separator") {
      return "separator";
    }
    return (item as Todo).id.toString();
  };

  return (
    <View style={style}>
      <FlatList
        style={{ flex: 1, paddingTop: 12 }}
        data={dataWithSeparator}
        keyExtractor={getItemKey}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 16,
    gap: 12,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.primary_text + "30",
  },
  separatorText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary_text + "60",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default TodoList;

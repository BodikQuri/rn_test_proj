import { Todo } from "@/types/todo";
import { FlatList, View, ViewStyle } from "react-native";
import ToDoItem from "../ToDoItem";

type TodoListProps = {
  todos: Todo[];
  style?: ViewStyle;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  deletingTodos?: Set<string>;
};

const TodoList = ({
  todos,
  style,
  onToggle,
  onDelete,
  onEdit,
  deletingTodos,
}: TodoListProps) => {
  return (
    <View style={style}>
      <FlatList
        style={{ flex: 1, paddingTop: 12 }}
        data={todos}
        keyExtractor={(todo) => todo.id.toString()}
        renderItem={({ item }) => (
          <ToDoItem
            item={item}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            isDeleting={deletingTodos?.has(item.id) || false}
          />
        )}
      ></FlatList>
    </View>
  );
};

export default TodoList;

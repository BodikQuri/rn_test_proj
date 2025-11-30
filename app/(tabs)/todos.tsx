import { StyledButton } from "@/components/StyledButton";
import { StyledText } from "@/components/StyleText";
import { COLORS } from "@/consts/ui";
import Header from "@/layout/Header";
import TodoList from "@/layout/ToDoList";
import { useTranslation } from "@/locales";
import { Todo } from "@/types/todo";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { useTodoContext } from "../todo-context";

export default function Index() {
  const params = useLocalSearchParams();
  const { todos, setTodos } = useTodoContext();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const [deletingTodos, setDeletingTodos] = useState<Set<string>>(new Set());
  const t = useTranslation();

  const handleCreateTodo = () => {
    router.push("/create-todo");
  };

  const newTodoCreated = (
    newTodoTitle: string,
    timestamp: string,
    newTodoDescription: string | null
  ) => {
    if (newTodoTitle && timestamp) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: newTodoTitle as string,
        description: (newTodoDescription as string) || "",
        completed: false,
      };
      setTodos((prev) => [...prev, newTodo]);
    }
  };

  useEffect(() => {
    console.log("Params changed:", params);
    if (params.newTodoTitle && params.timestamp) {
      newTodoCreated(
        params.newTodoTitle as string,
        params.timestamp as string,
        (params.newTodoDescription as string) || null
      );
    }
  }, [params]);

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const confirmDelete = (id: string) => {
    setTodoToDelete(id);
    setDeleteModalVisible(true);
  };

  const deleteTodo = () => {
    if (todoToDelete) {
      setDeletingTodos((prev) => new Set(prev).add(todoToDelete));
      setDeleteModalVisible(false);

      setTimeout(() => {
        setTodos(todos.filter((todo) => todo.id !== todoToDelete));
        setDeletingTodos((prev) => {
          const next = new Set(prev);
          next.delete(todoToDelete);
          return next;
        });
        setTodoToDelete(null);
      }, 300);
    } else {
      setDeleteModalVisible(false);
    }
  };

  const cancelDelete = () => {
    setTodoToDelete(null);
    setDeleteModalVisible(false);
  };

  const editTodo = (id: string) => {
    router.push({
      pathname: "/create-todo",
      params: { todoId: id },
    });
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Header
        completedCount={todos.filter((todo) => todo.completed).length}
        totalCount={todos.length}
      />
      <TodoList
        todos={sortedTodos}
        style={styles.todoList}
        onToggle={toggleTodo}
        onDelete={confirmDelete}
        onEdit={editTodo}
        deletingTodos={deletingTodos}
      />
      <TouchableOpacity style={styles.fab} onPress={handleCreateTodo}>
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <StyledText style={styles.modalTitle}>
              {t.todos.deleteConfirm}
            </StyledText>
            <StyledText style={styles.modalText}>
              {t.todos.deleteConfirmMessage}
            </StyledText>
            <View style={styles.modalButtons}>
              <StyledButton
                title={t.common.cancel}
                variant="secondary"
                onPress={cancelDelete}
                style={styles.modalButton}
              />
              <StyledButton
                title={t.common.delete}
                onPress={deleteTodo}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary_background,
  },
  todoList: {
    flex: 1,
    backgroundColor: COLORS.primary_background,
  },
  fab: {
    position: "absolute",
    right: 30,
    bottom: 50,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.secondary_background,
    borderRadius: 16,
    padding: 24,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: COLORS.primary_text,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 24,
    color: COLORS.primary_text,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-end",
  },
  modalButton: {
    paddingHorizontal: 20,
  },
});

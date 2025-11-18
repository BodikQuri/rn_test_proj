import { Todo } from "@/types/todo";
import React, { createContext, ReactNode, useContext, useState } from "react";

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, updatedTodo: Partial<Todo>) => void;
  removeTodo: (todo: Todo) => void;
};

const items: Todo[] = [
  { id: "1", title: "First todo", completed: false },
  { id: "2", title: "Second todo", completed: true },
  { id: "3", title: "Third todo", completed: true },

  { id: "4", title: "Fourth todo", completed: false },
];

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(items);

  const addTodo = (todo: Todo) => setTodos((prev) => [...prev, todo]);

  const updateTodo = (id: string, updatedTodo: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  const removeTodo = (todo: Todo) =>
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, addTodo, updateTodo, removeTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("useTodoContext must be used within TodoProvider");
  return context;
};

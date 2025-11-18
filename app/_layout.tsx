import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TodoProvider } from "./todo-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TodoProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </TodoProvider>
    </GestureHandlerRootView>
  );
}

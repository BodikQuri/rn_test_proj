import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ColorPickerProvider } from "./color-context";
import { TodoProvider } from "./todo-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TodoProvider>
        <ColorPickerProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </ColorPickerProvider>
      </TodoProvider>
    </GestureHandlerRootView>
  );
}

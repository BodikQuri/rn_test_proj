import { FavoritesProvider } from "@/context/FavoritesContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { ColorPickerProvider } from "./color-context";
import { TodoProvider } from "./todo-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavoritesProvider>
        <TodoProvider>
          <ColorPickerProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
            <Toast topOffset={insets.top} />
          </ColorPickerProvider>
        </TodoProvider>
      </FavoritesProvider>
    </GestureHandlerRootView>
  );
}

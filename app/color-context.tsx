import { createContext, ReactNode, useContext, useState } from "react";

type ColorCallbackType = ((color: string) => void) | null;

interface ColorPickerContextType {
  onColorPick: ColorCallbackType;
  setOnColorPick: (cb: ColorCallbackType) => void;
}

const ColorPickerContext = createContext<ColorPickerContextType>({
  onColorPick: null,
  setOnColorPick: () => {},
});

export const useColorPicker = () => useContext(ColorPickerContext);

export const ColorPickerProvider = ({ children }: { children: ReactNode }) => {
  const [onColorPick, setOnColorPick] = useState<ColorCallbackType>(null);

  return (
    <ColorPickerContext.Provider value={{ onColorPick, setOnColorPick }}>
      {children}
    </ColorPickerContext.Provider>
  );
};

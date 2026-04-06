import { ThemeTypes, type ThemeType } from "@/constants";
import { useStore } from "@/store";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useColorScheme } from "react-native";
import { colors, ThemeColors, ThemeName } from "./tokens/colors";

export interface ThemeContextProps {
  theme: ThemeColors;
  themeName: ThemeName;
  themePreference: ThemeType;
  changeTheme: (theme: ThemeType) => Promise<void>;
  toggleTheme: () => void;
  withOpacity: (color: string, opacity: number) => string;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: colors.light,
  themeName: "light",
  themePreference: ThemeTypes.SYSTEM,
  changeTheme: () => Promise.resolve(),
  toggleTheme: () => {},
  withOpacity: () => "",
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const themePreference = useStore((state) => state.preferences.theme);
  const setTheme = useStore((state) => state.preferences.setTheme);

  // Resolve actual theme based on preference and system color scheme
  const resolvedTheme: ThemeName = useMemo(() => {
    if (themePreference === ThemeTypes.SYSTEM) {
      return colorScheme === "dark" ? "dark" : "light";
    }
    return themePreference === ThemeTypes.DARK ? "dark" : "light";
  }, [themePreference, colorScheme]);

  const theme = colors[resolvedTheme];

  const changeTheme = useCallback(
    async (newTheme: ThemeType) => {
      return setTheme(newTheme);
    },
    [setTheme],
  );

  const toggleTheme = useCallback(() => {
    const newTheme =
      resolvedTheme === "dark" ? ThemeTypes.LIGHT : ThemeTypes.DARK;
    changeTheme(newTheme);
  }, [resolvedTheme, changeTheme]);

  const withOpacity = useCallback((color: string, opacity: number) => {
    const opacityHex = Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0");
    return color + opacityHex;
  }, []);

  const value = useMemo(
    () => ({
      theme,
      themeName: resolvedTheme,
      themePreference,
      changeTheme,
      toggleTheme,
      withOpacity,
    }),
    [
      theme,
      resolvedTheme,
      themePreference,
      changeTheme,
      toggleTheme,
      withOpacity,
    ],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

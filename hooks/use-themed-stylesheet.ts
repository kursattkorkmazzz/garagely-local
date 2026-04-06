import { DependencyList, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "../theme/theme-context";
import { ThemeColors } from "../theme/tokens/colors";

export function useThemedStylesheet<T extends StyleSheet.NamedStyles<T>>(
  styles: (theme: ThemeColors) => T,
  deps: DependencyList = [],
): T {
  const { theme } = useTheme();
  return useMemo(
    () => StyleSheet.create(styles(theme)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme, ...deps],
  );
}

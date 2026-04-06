import { useTheme } from "@/theme/theme-context";
import { ThemeColors } from "@/theme/tokens/colors";
import { typography, Typography } from "@/theme/tokens/typography";
import { useMemo } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

type ColorVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "destructive"
  | "muted"
  | "red"
  | "orange"
  | "cyan"
  | "green"
  | "purple";

type AppTextProps = TextProps & {
  variant?: Typography;
  color?: ColorVariant;
};

function getColorFromVariant(theme: ThemeColors, color: ColorVariant): string {
  switch (color) {
    case "primary":
      return theme.primary;
    case "secondary":
      return theme.secondaryForeground;
    case "accent":
      return theme.accent;
    case "destructive":
      return theme.destructive;
    case "muted":
      return theme.mutedForeground;
    case "red":
      return theme.color.red;
    case "orange":
      return theme.color.orange;
    case "cyan":
      return theme.color.cyan;
    case "green":
      return theme.color.green;
    case "purple":
      return theme.color.purple;
    default:
      return theme.foreground;
  }
}

export function AppText({
  variant = "bodyLarge",
  color = "default",
  style,
  ...rest
}: AppTextProps) {
  const { theme } = useTheme();

  const textStyle = useMemo(() => {
    return StyleSheet.create({
      base: {
        color: getColorFromVariant(theme, color),
        fontSize: typography[variant].fontSize,
        fontWeight: typography[variant].fontWeight as TextStyle["fontWeight"],
      },
    });
  }, [theme, color, variant]);

  return <Text {...rest} style={[textStyle.base, style]} />;
}

import { View, StyleSheet } from "react-native";
import { AppIcon, type IconName } from "../../app-icon";
import { useTheme, radius } from "@/theme";

type ListItemIconProps = {
  /** Icon name from Lucide */
  icon: IconName;
  /** Icon color (defaults to theme.primary) */
  color?: string;
  /** Icon size (defaults to 20) */
  size?: number;
};

export function ListItemIcon({ icon, color, size = 20 }: ListItemIconProps) {
  const { theme, withOpacity } = useTheme();
  const iconColor = color ?? theme.primary;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: withOpacity(iconColor, 0.12) },
      ]}
    >
      <AppIcon icon={icon} size={size} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
});

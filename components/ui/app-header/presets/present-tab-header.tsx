import { useTheme } from "@/theme/theme-context";
import { spacing } from "@/theme/tokens/spacing";
import { StyleSheet, View } from "react-native";
import { AppIcon, type IconName } from "../../app-icon";
import { AppText } from "../../app-text";
import { AppHeader } from "../app-header";

type TabHeaderOptions = {
  /** Page title */
  title: string;
  /** Icon displayed to the left of the title */
  icon?: IconName;
  /** Icon color (defaults to theme.primary) */
  iconColor?: string;
};

/**
 * Creates a tab header component for tab screens.
 * Use with Stack.Screen options.header or directly in screen
 *
 * @example
 * // As a component
 * const GarageHeader = presentTabHeader({ title: "Garage", icon: "Car" });
 * <GarageHeader />
 *
 * @example
 * // In Stack.Screen
 * <Stack.Screen
 *   name="garage"
 *   options={{ header: presentTabHeader({ title: "Garage", icon: "Car" }) }}
 * />
 */
export function presentTabHeader(options: TabHeaderOptions) {
  const { title, icon, iconColor } = options;

  return function TabHeader() {
    const { theme } = useTheme();
    const color = iconColor ?? theme.primary;

    return (
      <AppHeader
        LeftSlot={
          <View style={styles.titleContainer}>
            {icon && <AppIcon icon={icon} size={24} color={color} />}
            <AppText variant="heading2">{title}</AppText>
          </View>
        }
      />
    );
  };
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
});

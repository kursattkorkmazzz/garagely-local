import { View, StyleSheet } from "react-native";
import { AppIcon } from "../../app-icon";
import { AppText } from "../../app-text";
import { useTheme, spacing } from "@/theme";

type ListItemValueChevronProps = {
  /** Value text displayed before chevron */
  value: string;
  /** Chevron color (defaults to theme.mutedForeground) */
  chevronColor?: string;
  /** Value text color (defaults to theme.mutedForeground) */
  valueColor?: string;
};

export function ListItemValueChevron({
  value,
  chevronColor,
  valueColor,
}: ListItemValueChevronProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <AppText
        variant="bodyMedium"
        style={{ color: valueColor ?? theme.mutedForeground }}
      >
        {value}
      </AppText>
      <AppIcon
        icon="ChevronRight"
        size={20}
        color={chevronColor ?? theme.mutedForeground}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
});

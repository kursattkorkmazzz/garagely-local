import { View, StyleSheet } from "react-native";
import { AppText } from "../app-text";
import { useTheme, spacing } from "@/theme";

type AppListGroupProps = {
  /** Section label (displayed uppercase) */
  label: string;
  /** Section description */
  description?: string;
};

export function AppListGroup({ label, description }: AppListGroupProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <AppText
        variant="caption"
        style={[styles.label, { color: theme.foreground }]}
      >
        {label}
      </AppText>
      {description && (
        <AppText variant="bodySmall" color="muted" style={styles.description}>
          {description}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  label: {
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  description: {
    marginTop: spacing.xs / 2,
  },
});

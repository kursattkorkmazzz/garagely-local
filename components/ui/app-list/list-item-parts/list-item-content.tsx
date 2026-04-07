import { spacing } from "@/theme/tokens/spacing";
import { StyleSheet, View } from "react-native";
import { AppText } from "../../app-text";

type ListItemContentProps = {
  /** Main title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
};

export function ListItemContent({ title, subtitle }: ListItemContentProps) {
  return (
    <View style={styles.container}>
      <AppText variant="bodyMedium" numberOfLines={1}>
        {title}
      </AppText>
      {subtitle && (
        <AppText variant="bodySmall" color="muted" numberOfLines={1}>
          {subtitle}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs / 2,
  },
});

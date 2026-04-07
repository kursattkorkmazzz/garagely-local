import { spacing } from "@/theme/tokens/spacing";
import { StyleSheet, View } from "react-native";
import { AppText } from "../../app-text";

type HeaderTitleProps = {
  /** Main title text */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Text alignment */
  align?: "left" | "center";
};

export function HeaderTitle({
  title,
  subtitle,
  align = "center",
}: HeaderTitleProps) {
  return (
    <View style={[styles.container, align === "center" && styles.centered]}>
      <AppText variant="heading3" numberOfLines={1}>
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
  centered: {
    alignItems: "center",
  },
});

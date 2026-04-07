import { useTheme } from "@/theme/theme-context";
import { radius } from "@/theme/tokens/radius";
import { spacing } from "@/theme/tokens/spacing";
import { ReactNode } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";

type AppListItemProps = {
  /** Left slot content (icon, avatar, checkbox, etc.) */
  LeftSlot?: ReactNode;
  /** Middle slot content (title, subtitle, etc.) */
  MiddleSlot?: ReactNode;
  /** Right slot content (chevron, switch, badge, etc.) */
  RightSlot?: ReactNode;
  /** Press handler - makes item clickable */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Custom container style */
  style?: ViewStyle;
};

export function AppListItem({
  LeftSlot,
  MiddleSlot,
  RightSlot,
  onPress,
  disabled,
  style,
}: AppListItemProps) {
  const { theme, withOpacity } = useTheme();

  const isClickable = !!onPress && !disabled;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          opacity: disabled ? 0.5 : 1,
        },
        pressed &&
          isClickable && {
            backgroundColor: withOpacity(theme.muted, 0.1),
          },
        style,
      ]}
    >
      {LeftSlot && <View style={styles.leftSlot}>{LeftSlot}</View>}
      {MiddleSlot && <View style={styles.middleSlot}>{MiddleSlot}</View>}
      {RightSlot && <View style={styles.rightSlot}>{RightSlot}</View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.sm,
    minHeight: 64,
  },
  leftSlot: {
    marginRight: spacing.md,
  },
  middleSlot: {
    flex: 1,
  },
  rightSlot: {
    marginLeft: spacing.sm,
  },
});

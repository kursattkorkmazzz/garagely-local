import { useTheme } from "@/theme/theme-context";
import { spacing } from "@/theme/tokens/spacing";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AppHeaderProps = {
  /** Content for the left side (avatar, back button, etc.) */
  LeftSlot?: React.ReactNode;
  /** Content for the center (vehicle selector, title, etc.) */
  CenterSlot?: React.ReactNode;
  /** Content for the right side (notification, search, actions, etc.) */
  RightSlot?: React.ReactNode;
  /** Content for the bottom row (title row, search bar, tabs, etc.) */
  BottomSlot?: React.ReactNode;
  /** Whether to include safe area padding at the top */
  includeSafeArea?: boolean;
  /** Custom background color */
  backgroundColor?: string;
  /** Additional container styles */
  style?: ViewStyle;
};

export function AppHeader({
  LeftSlot,
  CenterSlot,
  RightSlot,
  BottomSlot,
  includeSafeArea = true,
  backgroundColor,
  style,
}: AppHeaderProps) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        headerStyles.container,
        {
          backgroundColor: backgroundColor ?? theme.background,
          paddingTop: includeSafeArea
            ? insets.top + headerStyles.container.paddingTop
            : headerStyles.container.paddingTop,
        },
        style,
      ]}
    >
      <View style={headerStyles.topRow}>
        {LeftSlot && <View style={headerStyles.leftSlot}>{LeftSlot}</View>}
        {CenterSlot && (
          <View style={headerStyles.centerSlot}>{CenterSlot}</View>
        )}
        {RightSlot && <View style={headerStyles.rightSlot}>{RightSlot}</View>}
      </View>
      {BottomSlot && <View style={headerStyles.bottomRow}>{BottomSlot}</View>}
    </View>
  );
}

export const headerStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
  },
  leftSlot: {
    flexShrink: 0,
  },
  centerSlot: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  rightSlot: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  bottomRow: {
    marginTop: spacing.md,
  },
});

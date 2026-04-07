import { StyleSheet, View } from "react-native";

import { AppButton } from "../../app-button";
import { AppIcon, type IconName } from "../../app-icon";

import { useTheme } from "@/theme/theme-context";
import { radius } from "@/theme/tokens/radius";
type HeaderIconButtonProps = {
  /** Icon to display */
  icon: IconName;
  /** Press handler */
  onPress?: () => void;
  /** Show notification badge */
  showBadge?: boolean;
  /** Badge color */
  badgeColor?: string;
  /** Disabled state */
  disabled?: boolean;
};

export function HeaderIconButton({
  icon,
  onPress,
  showBadge = false,
  badgeColor,
  disabled = false,
}: HeaderIconButtonProps) {
  const { theme } = useTheme();

  return (
    <AppButton
      variant="ghost"
      size="icon"
      onPress={onPress}
      disabled={disabled}
      style={[styles.button]}
    >
      <AppIcon icon={icon} size={20} color={theme.primary} />
      {showBadge && (
        <View
          style={[
            styles.badge,
            { backgroundColor: badgeColor ?? theme.destructive },
          ]}
        />
      )}
    </AppButton>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

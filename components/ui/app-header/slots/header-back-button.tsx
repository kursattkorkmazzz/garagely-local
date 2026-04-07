import { useTheme } from "@/theme/theme-context";
import { radius } from "@/theme/tokens/radius";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { AppButton } from "../../app-button";
import { AppIcon } from "../../app-icon";

type HeaderBackButtonProps = {
  /** Custom press handler. Defaults to router.back(). */
  onPress?: () => void;
  /** Icon to display. Defaults to "ChevronLeft". */
  icon?: "ChevronLeft" | "X" | "ArrowLeft";
};

export function HeaderBackButton({
  onPress,
  icon = "ChevronLeft",
}: HeaderBackButtonProps) {
  const router = useRouter();
  const { theme } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <AppButton
      variant="ghost"
      size="icon"
      onPress={handlePress}
      style={styles.button}
    >
      <AppIcon icon={icon} size={20} color={theme.foreground} />
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
  },
});

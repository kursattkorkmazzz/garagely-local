import { AppSpinner } from "@/components/ui/app-spinner";
import { useTheme } from "@/theme/theme-context";
import { View } from "react-native";

export function AppLaunchingComponent() {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.background,
      }}
    >
      <AppSpinner size="lg" />
    </View>
  );
}

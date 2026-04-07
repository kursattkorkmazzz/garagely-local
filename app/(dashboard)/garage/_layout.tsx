import { useTheme } from "@/theme/theme-context";
import { Stack } from "expo-router";

export default function GarageLayout() {
  const { theme } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Garage" }} />
    </Stack>
  );
}

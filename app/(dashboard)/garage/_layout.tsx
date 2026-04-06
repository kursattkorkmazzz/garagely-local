import { Stack } from "expo-router";
import { useTheme } from "@/theme";

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
      <Stack.Screen name="index" />
      <Stack.Screen
        name="vehicle/add"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen name="vehicle/[id]" />
    </Stack>
  );
}

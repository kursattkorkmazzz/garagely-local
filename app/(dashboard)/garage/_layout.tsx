import { AppButton } from "@/components/ui/app-button";
import { presentStackHeader } from "@/components/ui/app-header";
import { AppIcon } from "@/components/ui/app-icon";
import { useI18n } from "@/hooks";
import { useTheme } from "@/theme/theme-context";
import { spacing } from "@/theme/tokens/spacing";
import { Stack, useRouter } from "expo-router";

export default function GarageLayout() {
  const { theme } = useTheme();
  const { t: tGarage } = useI18n("garage");
  const { t: tVehicle } = useI18n("vehicle");
  const router = useRouter();

  const addVehicleActionHandler = () => {
    router.push("/(dashboard)/garage/vehicles/create");
  };

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background,
          paddingHorizontal: spacing.md,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Garage" }} />
      <Stack.Screen
        name="vehicles/index"
        options={{
          title: "Vehicles",
          headerShown: true,
          header: presentStackHeader({
            title: tGarage("vehicles.items.vehicles.label"),
            description: tGarage("vehicles.items.vehicles.description"),
            rightActions: (
              <AppButton
                variant="ghost"
                size="icon"
                onPress={addVehicleActionHandler}
              >
                <AppIcon icon="Plus" color={theme.primary} />
              </AppButton>
            ),
          }),
        }}
      />
      <Stack.Screen
        name="vehicles/create"
        options={{
          title: tVehicle("addVehicle"),
          headerShown: true,
          presentation: "fullScreenModal",
          header: presentStackHeader({
            title: tVehicle("addVehicle"),
          }),
        }}
      />
    </Stack>
  );
}

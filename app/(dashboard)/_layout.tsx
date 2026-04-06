import { useI18n } from "@/hooks/use-i18n";
import { AppIcon } from "@/shared";
import { useTheme } from "@/theme";
import { Tabs } from "expo-router";

export default function DashboardLayout() {
  const { theme } = useTheme();
  const { t } = useI18n("garage");
  const { t: tSettings } = useI18n("settings");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.bottomBar.background,
          borderTopColor: theme.bottomBar.border,
        },
        tabBarActiveTintColor: theme.bottomBar.primary,
        tabBarInactiveTintColor: theme.bottomBar.foreground,
      }}
    >
      <Tabs.Screen
        name="garage"
        options={{
          title: t("label"),
          tabBarIcon: ({ color, size }) => (
            <AppIcon icon="Car" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: tSettings("label"),
          tabBarIcon: ({ color, size }) => (
            <AppIcon icon="Settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

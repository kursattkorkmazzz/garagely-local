import { AppIcon } from "@/components/ui/app-icon";
import { useI18n } from "@/hooks";
import { useTheme } from "@/theme/theme-context";
import { Tabs } from "expo-router";

export default function DashboardLayout() {
  const { theme } = useTheme();
  const { t: tGarage } = useI18n("garage");
  const { t: tSettings } = useI18n("settings");
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: theme.background,
        },
        tabBarStyle: {
          backgroundColor: theme.background,
          // iOS shadow kaldırma
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
          // Border kaldırma (üst çizgi)
          borderTopWidth: 0,
          // Android elevation kaldırma
          elevation: 0,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.muted,
      }}
    >
      <Tabs.Screen
        name="garage"
        options={{
          title: tGarage("label"),
          tabBarIcon: (props) => (
            <AppIcon icon="Car" size={props.size} color={props.color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: tSettings("label"),
          tabBarIcon: (props) => (
            <AppIcon icon="Settings" size={props.size} color={props.color} />
          ),
        }}
      />
    </Tabs>
  );
}

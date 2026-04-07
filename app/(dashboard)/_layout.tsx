import { AppIcon } from "@/components/ui/app-icon";
import { useTheme } from "@/theme/theme-context";
import { Tabs } from "expo-router";

export default function DashboardLayout() {
  const { theme } = useTheme();

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
      }}
    >
      <Tabs.Screen
        name="garage/index"
        options={{
          title: "Garage",
          tabBarIcon: (props) => (
            <AppIcon icon="Car" size={props.size} color={props.color} />
          ),
        }}
      />
    </Tabs>
  );
}

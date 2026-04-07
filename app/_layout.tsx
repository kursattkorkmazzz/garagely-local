import { AppLaunchingComponent } from "@/components/app-start/app-launching-component";
import { initI18n } from "@/i18n";
import { useStore } from "@/store/store";
import { ThemeProvider, useTheme } from "@/theme/theme-context";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function RootLayoutNav() {
  const { theme, themeName } = useTheme();
  const isInitialized = useStore((state) => state.preferences.isInitialized);
  const initializePreferences = useStore(
    (state) => state.preferences.initialize,
  );

  useEffect(() => {
    initializePreferences();
  }, [initializePreferences]);

  if (!isInitialized) {
    return <AppLaunchingComponent />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Slot />
      <StatusBar backgroundColor={theme.foreground} />
    </SafeAreaView>
  );
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    async function init() {
      //await initDatabase();
      await initI18n();
      setIsReady(true);
    }
    init();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SafeAreaProvider>
          <RootLayoutNav />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

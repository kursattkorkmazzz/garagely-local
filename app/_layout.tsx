import { initDatabase } from "@/db";
import { initI18n } from "@/i18n";
import { AppSpinner } from "@/shared";
import { useStore } from "@/store";
import { ThemeProvider, useTheme } from "@/theme";
import { Slot, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RootLayoutNav() {
  const { themeName, theme } = useTheme();
  const router = useRouter();
  const initializePreferences = useStore(
    (state) => state.preferences.initialize,
  );
  const isInitialized = useStore((state) => state.preferences.isInitialized);

  useEffect(() => {
    initializePreferences();
  }, [initializePreferences]);

  useEffect(() => {
    if (isInitialized) {
      router.replace("/(dashboard)/garage");
    }
  }, [isInitialized, router]);

  if (!isInitialized) {
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <Slot />
      <StatusBar style={themeName === "dark" ? "light" : "dark"} />
    </View>
  );
}

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      await initDatabase();
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

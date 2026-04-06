import { VehicleRepository, type Vehicle } from "@/features/vehicle";
import { useI18n } from "@/hooks/use-i18n";
import {
  AppButton,
  AppIcon,
  AppListItem,
  AppText,
  ListItemChevron,
  ListItemContent,
} from "@/shared";
import { spacing, useTheme } from "@/theme";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GarageScreen() {
  const { theme } = useTheme();
  const { t } = useI18n("garage");
  const { t: tVehicle } = useI18n("vehicle");
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadVehicles();
    }, []),
  );

  async function loadVehicles() {
    try {
      const data = await VehicleRepository.getAll();
      setVehicles(data);
    } catch (error) {
      console.error("Failed to load vehicles:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddVehicle = () => {
    router.push("/(dashboard)/garage/vehicle/add");
  };

  const handleVehiclePress = (vehicle: Vehicle) => {
    router.push(`/(dashboard)/garage/vehicle/${vehicle.id}`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <AppText variant="heading2">{t("label")}</AppText>
          <AppText variant="bodyMedium" color="muted">
            {t("hero.description")}
          </AppText>
        </View>
        <AppButton size="icon" variant="secondary" onPress={handleAddVehicle}>
          <AppIcon icon="Plus" color={theme.foreground} size={24} />
        </AppButton>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {vehicles.length === 0 && !loading ? (
          <View style={styles.emptyState}>
            <View
              style={[
                styles.emptyIconContainer,
                { backgroundColor: theme.secondary },
              ]}
            >
              <AppIcon icon="Car" size={48} color={theme.mutedForeground} />
            </View>
            <AppText variant="heading4" style={styles.emptyTitle}>
              {t("emptyState.title")}
            </AppText>
            <AppText
              variant="bodyMedium"
              color="muted"
              style={styles.emptyDescription}
            >
              {t("emptyState.description")}
            </AppText>
            <AppButton onPress={handleAddVehicle}>
              <View style={styles.buttonContent}>
                <AppIcon
                  icon="Plus"
                  size={20}
                  color={theme.primaryForeground}
                />
                <AppText
                  variant="buttonMedium"
                  style={{ color: theme.primaryForeground }}
                >
                  {tVehicle("addVehicle")}
                </AppText>
              </View>
            </AppButton>
          </View>
        ) : (
          vehicles.map((vehicle) => (
            <AppListItem
              key={vehicle.id}
              onPress={() => handleVehiclePress(vehicle)}
              LeftSlot={
                <View
                  style={[
                    styles.vehicleIcon,
                    { backgroundColor: theme.secondary },
                  ]}
                >
                  <AppIcon icon="Car" size={24} color={theme.primary} />
                </View>
              }
              MiddleSlot={
                <ListItemContent
                  title={`${vehicle.brand} ${vehicle.model}`}
                  subtitle={`${vehicle.year} - ${vehicle.plate}`}
                />
              }
              RightSlot={<ListItemChevron />}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingTop: 0,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl * 2,
  },
  emptyIconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  emptyDescription: {
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  vehicleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

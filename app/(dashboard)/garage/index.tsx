import { GarageHero } from "@/components/garage/list/garage-hero";
import { IconName } from "@/components/ui/app-icon";
import {
  AppListItem,
  ListItemChevron,
  ListItemContent,
  ListItemIcon,
} from "@/components/ui/app-list";
import { AppList, ListSection } from "@/components/ui/app-list/app-list";
import { useI18n } from "@/hooks";
import { spacing } from "@/theme/tokens/spacing";
import { router } from "expo-router";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
type GarageListItem = {
  id: string;
  icon: IconName;
  iconColor: string;
  title: string;
  subtitle: string;
};

export default function Garage() {
  const { t: tGarage } = useI18n("garage");

  const VEHICLES_SECTION: ListSection<GarageListItem>[] = useMemo(
    () => [
      {
        key: "vehicles",
        label: tGarage("vehicles.label"),
        description: tGarage("vehicles.description"),
        data: [
          {
            id: "vehicles",
            icon: "Car",
            iconColor: "#3B82F6",
            title: tGarage("vehicles.items.vehicles.label"),
            subtitle: tGarage("vehicles.items.vehicles.description"),
          },
        ],
      },
    ],
    [tGarage],
  );

  const handleItemPress = (itemId: string) => {
    router.push(`./garage/${itemId}`); // Navigate to the corresponding screen based on item ID
  };

  return (
    <AppList
      contentContainerStyle={styles.listContent}
      sections={VEHICLES_SECTION}
      renderItem={(item) => (
        <AppListItem
          LeftSlot={<ListItemIcon icon={item.icon} color={item.iconColor} />}
          MiddleSlot={
            <ListItemContent title={item.title} subtitle={item.subtitle} />
          }
          RightSlot={<ListItemChevron />}
          onPress={() => handleItemPress(item.id)}
        />
      )}
      ListHeaderComponent={<GarageHero />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flex: 1,
    paddingTop: spacing.md,
  },
});

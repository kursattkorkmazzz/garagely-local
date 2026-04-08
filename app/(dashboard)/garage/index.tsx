import { GarageListHero } from "@/components/garage/list/garage-list-hero";
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
import { StyleSheet } from "react-native";
type GarageListItem = {
  id: string;
  icon: IconName;
  iconColor: string;
  title: string;
  subtitle: string;
};

export default function GarageList() {
  const { t: tGarage } = useI18n("garage");

  const VEHICLES_SECTION: ListSection<GarageListItem> = {
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
  };

  const handleItemPress = (itemId: string) => {
    // TODO: Navigate to respective screens
    console.log("Navigate to:", itemId);
  };

  return (
    <AppList
      contentContainerStyle={styles.listContent}
      sections={[VEHICLES_SECTION]}
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
      ListHeaderComponent={<GarageListHero />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
});

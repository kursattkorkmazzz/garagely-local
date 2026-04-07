import {
  CurrencyActionSheet,
  DistanceActionSheet,
  LanguageActionSheet,
  ThemeActionSheet,
  TimezoneActionSheet,
  VolumeActionSheet,
} from "@/components/settings/action-sheets";
import { ActionSheetRef } from "@/components/ui/app-action-sheet";
import { IconName } from "@/components/ui/app-icon";
import {
  AppListItem,
  ListItemChevron,
  ListItemContent,
  ListItemIcon,
  ListItemValueChevron,
} from "@/components/ui/app-list";
import { AppList, ListSection } from "@/components/ui/app-list/app-list";
import { AppView } from "@/components/ui/app-view";
import { useI18n } from "@/hooks";
import { useStore } from "@/store/store";
import { spacing } from "@/theme/tokens/spacing";
import { TimeUtils } from "@/utils";
import { Image } from "expo-image";
import React from "react";
type SettingsItem = {
  id: string;
  icon: IconName;
  iconColor: string;
  title: string;
  value?: string;
};

export default function SettingsPage() {
  const language = useStore((state) => state.preferences.language);
  const theme = useStore((state) => state.preferences.theme);
  const currency = useStore((state) => state.preferences.currency);
  const volume = useStore((state) => state.preferences.volume);
  const distance = useStore((state) => state.preferences.distance);
  const timezone = useStore((state) => state.preferences.timezone);

  const { t: tSettings } = useI18n("settings");
  const { t: tLang } = useI18n("language");
  const { t: tTheme } = useI18n("theme");
  const { t: tCurrency } = useI18n("currency");
  const { t: tVolume } = useI18n("volume");
  const { t: tDistance } = useI18n("distance");

  // Action Sheet Refs
  const languageActionSheetRef = React.useRef<ActionSheetRef>(null);
  const themeActionSheetRef = React.useRef<ActionSheetRef>(null);
  const currencyActionSheetRef = React.useRef<ActionSheetRef>(null);
  const volumeActionSheetRef = React.useRef<ActionSheetRef>(null);
  const distanceActionSheetRef = React.useRef<ActionSheetRef>(null);
  const timezoneActionSheetRef = React.useRef<ActionSheetRef>(null);

  const settingsItems: ListSection<SettingsItem>[] = [
    {
      key: "preferenes",
      label: tSettings("sections.preferences"),
      description: tSettings("sections.preferencesDescription"),
      data: [
        {
          id: "theme",
          icon: "Palette",
          iconColor: "#8B5CF6",
          title: tSettings("preferencesMenu.theme"),
          value: tTheme(theme),
        },
        {
          id: "language",
          icon: "Languages",
          iconColor: "#4F46E5",
          title: tSettings("preferencesMenu.language"),
          value: tLang(language),
        },
        {
          id: "currency",
          icon: "CircleDollarSign",
          iconColor: "#10B981",
          title: tSettings("preferencesMenu.currency"),
          value: tCurrency(`${currency}.long`),
        },
        {
          id: "distance",
          icon: "Ruler",
          iconColor: "#F59E0B",
          title: tSettings("preferencesMenu.distanceUnit"),
          value: tDistance(`${distance}.long`),
        },
        {
          id: "volume",
          icon: "Droplets",
          iconColor: "#3B82F6",
          title: tSettings("preferencesMenu.volumeUnit"),
          value: tVolume(`${volume}.long`),
        },
        {
          id: "timezone",
          icon: "Clock",
          iconColor: "#EC4899",
          title: tSettings("preferencesMenu.timezone"),
          value: TimeUtils.getTimezoneLabelFromTimezone(timezone),
        },
      ],
    },
  ];

  const handleItemPress = (id: string) => {
    switch (id) {
      case "theme":
        themeActionSheetRef.current?.show();
        break;
      case "language":
        languageActionSheetRef.current?.show();
        break;
      case "currency":
        currencyActionSheetRef.current?.show();
        break;
      case "distance":
        distanceActionSheetRef.current?.show();
        break;
      case "volume":
        volumeActionSheetRef.current?.show();
        break;
      case "timezone":
        timezoneActionSheetRef.current?.show();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppView style={{ flex: 1, padding: spacing.md }}>
        <AppList
          sections={settingsItems}
          ListHeaderComponent={
            <AppView align="center" style={{ paddingVertical: spacing.lg }}>
              <Image
                source={require("@/assets/images/icon.png")}
                style={{ width: 130, height: 130 }}
              />
            </AppView>
          }
          renderItem={(item) => (
            <AppListItem
              LeftSlot={
                <ListItemIcon icon={item.icon} color={item.iconColor} />
              }
              MiddleSlot={<ListItemContent title={item.title} />}
              RightSlot={
                item.value ? (
                  <ListItemValueChevron
                    value={item.value.replaceAll("_", " ")}
                  />
                ) : (
                  <ListItemChevron />
                )
              }
              onPress={() => handleItemPress(item.id)}
            />
          )}
        />
      </AppView>
      <ThemeActionSheet ref={themeActionSheetRef} />
      <LanguageActionSheet ref={languageActionSheetRef} />
      <CurrencyActionSheet ref={currencyActionSheetRef} />
      <DistanceActionSheet ref={distanceActionSheetRef} />
      <VolumeActionSheet ref={volumeActionSheetRef} />
      <TimezoneActionSheet ref={timezoneActionSheetRef} />
    </>
  );
}

import { Languages, type Language } from "@/constants/language";
import { StorageKeys } from "@/constants/storage-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en_common from "./locales/en/common.json";
import en_currency from "./locales/en/currency.json";
import en_distance from "./locales/en/distance.json";
import en_garage from "./locales/en/garage.json";
import en_language from "./locales/en/language.json";
import en_settings from "./locales/en/settings.json";
import en_theme from "./locales/en/theme.json";
import en_vehicle from "./locales/en/vehicle.json";
import en_volume from "./locales/en/volume.json";

import tr_common from "./locales/tr/common.json";
import tr_currency from "./locales/tr/currency.json";
import tr_distance from "./locales/tr/distance.json";
import tr_garage from "./locales/tr/garage.json";
import tr_language from "./locales/tr/language.json";
import tr_settings from "./locales/tr/settings.json";
import tr_theme from "./locales/tr/theme.json";
import tr_vehicle from "./locales/tr/vehicle.json";
import tr_volume from "./locales/tr/volume.json";

const resources = {
  [Languages.EN]: {
    common: en_common,
    garage: en_garage,
    vehicle: en_vehicle,
    settings: en_settings,
    theme: en_theme,
    language: en_language,
    currency: en_currency,
    distance: en_distance,
    volume: en_volume,
  },
  [Languages.TR]: {
    common: tr_common,
    garage: tr_garage,
    vehicle: tr_vehicle,
    settings: tr_settings,
    theme: tr_theme,
    language: tr_language,
    currency: tr_currency,
    distance: tr_distance,
    volume: tr_volume,
  },
};

function getDeviceLanguage(): Language {
  const deviceLocale = Localization.getLocales()[0]?.languageCode;
  if (deviceLocale === Languages.TR) {
    return Languages.TR;
  }
  return Languages.EN;
}

export async function initI18n(): Promise<void> {
  let language: Language;

  try {
    const stored = await AsyncStorage.getItem(StorageKeys.LANGUAGE);
    if (stored === Languages.EN || stored === Languages.TR) {
      language = stored;
    } else {
      language = getDeviceLanguage();
    }
  } catch {
    language = Languages.EN;
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: Languages.EN,
    defaultNS: "common",
    ns: [
      "common",
      "garage",
      "vehicle",
      "settings",
      "theme",
      "language",
      "currency",
      "distance",
      "volume",
    ],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export async function changeLanguage(language: Language): Promise<void> {
  await i18n.changeLanguage(language);
}

export function getCurrentLanguage(): Language {
  const lang = i18n.language;
  if (lang === Languages.TR) {
    return Languages.TR;
  }
  return Languages.EN;
}

export default i18n;

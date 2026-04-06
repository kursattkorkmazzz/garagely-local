import {
  Currencies,
  DistanceUnits,
  Languages,
  StorageKeys,
  ThemeTypes,
  VolumeUnits,
  type Currency,
  type DistanceUnit,
  type Language,
  type ThemeType,
  type VolumeUnit,
} from "@/constants";
import { changeLanguage as i18nChangeLanguage } from "@/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserPreferencesSlice {
  // State
  theme: ThemeType;
  language: Language;
  currency: Currency;
  distance: DistanceUnit;
  volume: VolumeUnit;
  isInitialized: boolean;

  // Actions
  initialize: () => Promise<void>;
  setTheme: (theme: ThemeType) => Promise<void>;
  setLanguage: (language: Language) => Promise<void>;
  setCurrency: (currency: Currency) => Promise<void>;
  setVolume: (volume: VolumeUnit) => Promise<void>;
  setDistance: (distance: DistanceUnit) => Promise<void>;
}

type SetPreferencesState = (partial: Partial<UserPreferencesSlice>) => void;

export const createUserPreferencesSlice = (
  set: SetPreferencesState,
): UserPreferencesSlice => ({
  // Initial state
  theme: ThemeTypes.SYSTEM,
  language: Languages.EN,
  currency: Currencies.USD,
  distance: DistanceUnits.KM,
  volume: VolumeUnits.LITER,
  isInitialized: false,

  // Load all preferences from AsyncStorage
  initialize: async () => {
    try {
      const [theme, language, currency, distance, volume] = await Promise.all([
        AsyncStorage.getItem(StorageKeys.THEME),
        AsyncStorage.getItem(StorageKeys.LANGUAGE),
        AsyncStorage.getItem(StorageKeys.CURRENCY),
        AsyncStorage.getItem(StorageKeys.DISTANCE_UNIT),
        AsyncStorage.getItem(StorageKeys.VOLUME_UNIT),
      ]);

      const resolvedLanguage = (language as Language) ?? Languages.EN;
      await i18nChangeLanguage(resolvedLanguage);

      set({
        theme: (theme as ThemeType) ?? ThemeTypes.SYSTEM,
        language: resolvedLanguage,
        currency: (currency as Currency) ?? Currencies.USD,
        distance: (distance as DistanceUnit) ?? DistanceUnits.KM,
        volume: (volume as VolumeUnit) ?? VolumeUnits.LITER,
        isInitialized: true,
      });
    } catch {
      set({ isInitialized: true });
    }
  },

  setTheme: async (theme) => {
    set({ theme });
    await AsyncStorage.setItem(StorageKeys.THEME, theme);
  },

  setLanguage: async (language) => {
    set({ language });
    await i18nChangeLanguage(language);
    await AsyncStorage.setItem(StorageKeys.LANGUAGE, language);
  },

  setCurrency: async (currency) => {
    set({ currency });
    await AsyncStorage.setItem(StorageKeys.CURRENCY, currency);
  },

  setDistance: async (distance) => {
    set({ distance });
    await AsyncStorage.setItem(StorageKeys.DISTANCE_UNIT, distance);
  },

  setVolume: async (volume) => {
    set({ volume });
    await AsyncStorage.setItem(StorageKeys.VOLUME_UNIT, volume);
  },
});

import {
  Currencies,
  DistanceUnits,
  Languages,
  ThemeTypes,
  Timezone,
  Timezones,
  VolumeUnits,
  type Currency,
  type DistanceUnit,
  type Language,
  type ThemeType,
  type VolumeUnit,
} from "@/constants";
import { UserPreferencesService } from "@/features/user-preferences";
import { changeLanguage as i18nChangeLanguage } from "@/i18n";

export interface UserPreferencesSlice {
  // State
  theme: ThemeType;
  language: Language;
  currency: Currency;
  distance: DistanceUnit;
  volume: VolumeUnit;
  timezone: Timezone;
  isInitialized: boolean;

  // Actions
  initialize: () => Promise<void>;
  setTheme: (theme: ThemeType) => Promise<void>;
  setLanguage: (language: Language) => Promise<void>;
  setCurrency: (currency: Currency) => Promise<void>;
  setVolume: (volume: VolumeUnit) => Promise<void>;
  setDistance: (distance: DistanceUnit) => Promise<void>;
  setTimezone: (timezone: Timezone) => Promise<void>;
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
  timezone: Timezones["Europe/Istanbul"],
  isInitialized: false,

  // Load all preferences from AsyncStorage
  initialize: async () => {
    try {
      const { theme, language, currency, distance, volume, timezone } =
        await UserPreferencesService.getUserPreferences();
      const resolvedLanguage = (language as Language) ?? Languages.EN;
      await i18nChangeLanguage(resolvedLanguage);

      set({
        theme: (theme as ThemeType) ?? ThemeTypes.SYSTEM,
        language: resolvedLanguage,
        currency: (currency as Currency) ?? Currencies.TRY,
        distance: (distance as DistanceUnit) ?? DistanceUnits.KM,
        volume: (volume as VolumeUnit) ?? VolumeUnits.LITER,
        timezone: (timezone as Timezone) ?? Timezones["Europe/Istanbul"],

        isInitialized: true,
      });
    } catch {
      set({ isInitialized: true });
    }
  },

  setTheme: async (theme) => {
    set({ theme });
    UserPreferencesService.upsertTheme(theme);
  },

  setLanguage: async (language) => {
    set({ language });
    await i18nChangeLanguage(language);
    UserPreferencesService.upsertLanguage(language);
  },

  setCurrency: async (currency) => {
    set({ currency });
    UserPreferencesService.upsertCurrency(currency);
  },

  setDistance: async (distance) => {
    set({ distance });
    UserPreferencesService.upsertDistanceUnit(distance);
  },

  setVolume: async (volume) => {
    set({ volume });
    UserPreferencesService.upsertVolumeUnit(volume);
  },

  setTimezone: async (timezone) => {
    set({ timezone });
    UserPreferencesService.upsertTimezone(timezone);
  },
});

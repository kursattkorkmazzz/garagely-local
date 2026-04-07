import {
  Currency,
  DistanceUnit,
  Language,
  StorageKeys,
  ThemeType,
  Timezone,
  VolumeUnit,
} from "@/constants";
import { UserPreferencesEntity } from "@/features/user-preferences/entity/user-preferences.entity";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class UserPreferencesRepository {
  static async getUserPreferences(): Promise<UserPreferencesEntity> {
    const theme = (await AsyncStorage.getItem(StorageKeys.THEME)) as ThemeType;
    const language = (await AsyncStorage.getItem(
      StorageKeys.LANGUAGE,
    )) as Language;
    const currency = (await AsyncStorage.getItem(
      StorageKeys.CURRENCY,
    )) as Currency;
    const distance = (await AsyncStorage.getItem(
      StorageKeys.DISTANCE_UNIT,
    )) as DistanceUnit;
    const volume = (await AsyncStorage.getItem(
      StorageKeys.VOLUME_UNIT,
    )) as VolumeUnit;
    const timezone = (await AsyncStorage.getItem(
      StorageKeys.TIMEZONE,
    )) as Timezone;

    return {
      currency,
      distance,
      language,
      theme,
      timezone,
      volume,
    };
  }

  static async upsertTheme(theme: ThemeType) {
    await this.upsertField(StorageKeys.THEME, theme);
  }

  static async upsertLanguage(language: Language) {
    await this.upsertField(StorageKeys.LANGUAGE, language);
  }

  static async upsertCurrency(currency: Currency) {
    await this.upsertField(StorageKeys.CURRENCY, currency);
  }

  static async upsertDistanceUnit(distance: DistanceUnit) {
    await this.upsertField(StorageKeys.DISTANCE_UNIT, distance);
  }

  static async upsertVolumeUnit(volume: VolumeUnit) {
    await this.upsertField(StorageKeys.VOLUME_UNIT, volume);
  }

  static async upsertTimezone(timezone: Timezone) {
    await this.upsertField(StorageKeys.TIMEZONE, timezone);
  }

  private static async upsertField(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  }
}

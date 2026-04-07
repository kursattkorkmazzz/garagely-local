import {
  Currency,
  DistanceUnit,
  Language,
  ThemeType,
  Timezone,
  VolumeUnit,
} from "@/constants";
import { UserPreferencesEntity } from "@/features/user-preferences/entity/user-preferences.entity";
import { UserPreferencesRepository } from "@/features/user-preferences/repository/user-preferences.repository";

export class UserPreferencesService {
  static async getUserPreferences(): Promise<UserPreferencesEntity> {
    return UserPreferencesRepository.getUserPreferences();
  }

  static async upsertTheme(theme: ThemeType): Promise<void> {
    await UserPreferencesRepository.upsertTheme(theme);
  }

  static async upsertLanguage(language: Language): Promise<void> {
    await UserPreferencesRepository.upsertLanguage(language);
  }

  static async upsertCurrency(currency: Currency): Promise<void> {
    await UserPreferencesRepository.upsertCurrency(currency);
  }

  static async upsertDistanceUnit(distance: DistanceUnit): Promise<void> {
    await UserPreferencesRepository.upsertDistanceUnit(distance);
  }

  static async upsertVolumeUnit(volume: VolumeUnit): Promise<void> {
    await UserPreferencesRepository.upsertVolumeUnit(volume);
  }

  static async upsertTimezone(timezone: Timezone): Promise<void> {
    await UserPreferencesRepository.upsertTimezone(timezone);
  }
}

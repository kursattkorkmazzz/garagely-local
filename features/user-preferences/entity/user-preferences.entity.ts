import {
  Currencies,
  DistanceUnits,
  Languages,
  ThemeTypes,
  Timezones,
  VolumeUnits,
} from "@/constants";
import * as z from "zod";

export const UserPreferencesValidator = z.object({
  theme: z.enum(Object.values(ThemeTypes)),
  language: z.enum(Object.values(Languages)),
  currency: z.enum(Object.values(Currencies)),
  distance: z.enum(Object.values(DistanceUnits)),
  volume: z.enum(Object.values(VolumeUnits)),
  timezone: z.enum(Object.values(Timezones)),
});

export type UserPreferencesEntity = z.infer<typeof UserPreferencesValidator>;

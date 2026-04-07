import * as yup from "yup";

import {
  Currencies,
  Currency,
  DistanceUnit,
  DistanceUnits,
  Language,
  Languages,
  ThemeType,
  ThemeTypes,
  VolumeUnit,
  VolumeUnits,
} from "@/constants";

export const UserPreferencesValidator = yup.object().shape({
  theme: yup.mixed<ThemeType>().oneOf(Object.values(ThemeTypes)),
  language: yup.mixed<Language>().oneOf(Object.values(Languages)),
  currency: yup.mixed<Currency>().oneOf(Object.values(Currencies)),
  distance: yup.mixed<DistanceUnit>().oneOf(Object.values(DistanceUnits)),
  volume: yup.mixed<VolumeUnit>().oneOf(Object.values(VolumeUnits)),
  timezone: yup.string(),
});

export type UserPreferencesEntity = yup.InferType<
  typeof UserPreferencesValidator
>;

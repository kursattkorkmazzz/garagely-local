import { UserPreferencesValidator } from "@/features/user-preferences/entity/user-preferences.entity";
import * as yup from "yup";

export const UpsertUserPreferencesDtoValidator =
  UserPreferencesValidator.partial();

export type UpsertUserPreferencesDto = yup.InferType<
  typeof UpsertUserPreferencesDtoValidator
>;

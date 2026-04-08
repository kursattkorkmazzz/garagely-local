import { UserPreferencesValidator } from "@/features/user-preferences/entity/user-preferences.entity";
import * as z from "zod";

export const UpsertUserPreferencesDtoValidator =
  UserPreferencesValidator.partial();

export type UpsertUserPreferencesDto = z.infer<
  typeof UpsertUserPreferencesDtoValidator
>;

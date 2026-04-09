import { Timezone } from "@/constants";

export type DateEntity = {
  id: string;
  date: Date;
  timezone: Timezone;
  created_at: Date;
  updated_at: Date | null;
};

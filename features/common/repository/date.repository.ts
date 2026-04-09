import { Timezone } from "@/constants";

export type DateRecord = {
  id: string;
  date: Date;
  timezone: Timezone;
  created_at: Date;
  updated_at: Date | null;
};

export type CreateDateParams = {
  date: Date;
  timezone: Timezone;
};

export abstract class DateRepository {
  abstract save(params: CreateDateParams): Promise<DateRecord>;
  abstract findById(id: string): Promise<DateRecord | null>;
  abstract delete(id: string): Promise<void>;
}

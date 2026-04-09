import { Timezones } from "@/constants";
import { BaseSchema } from "@/db/helpers/base.schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const DateSchema = sqliteTable("dates", {
  ...BaseSchema,
  date: integer({ mode: "timestamp_ms" }).notNull(),
  timezone: text({
    enum: Object.values(Timezones) as [string, ...string[]],
  }).notNull(),
});

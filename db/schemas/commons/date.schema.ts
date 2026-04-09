import { BaseSchema } from "@/db/helpers/base.schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const DateSchema = sqliteTable("dates", {
  ...BaseSchema,
  date: integer({ mode: "timestamp_ms" }).notNull(),
  // Timezone is stored as text - validation happens at application layer
  timezone: text().notNull(),
});

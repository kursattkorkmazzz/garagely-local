import { BaseSchema } from "@/db/helpers/base.schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Inline enum to avoid complex imports in drizzle-kit
const VolumeUnitsEnum = ["l", "gal"] as const;

export const VolumeSchema = sqliteTable("volumes", {
  ...BaseSchema,
  amount: integer().notNull(),
  unit: text({
    enum: VolumeUnitsEnum,
  }).notNull(),
});

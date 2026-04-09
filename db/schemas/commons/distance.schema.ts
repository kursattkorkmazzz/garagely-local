import { BaseSchema } from "@/db/helpers/base.schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Inline enum to avoid complex imports in drizzle-kit
const DistanceUnitsEnum = ["km", "mi"] as const;

export const DistanceSchema = sqliteTable("distances", {
  ...BaseSchema,
  amount: integer().notNull(),
  unit: text({
    enum: DistanceUnitsEnum,
  }).notNull(),
});

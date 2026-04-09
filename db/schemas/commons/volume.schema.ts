import { VolumeUnits } from "@/constants";
import { BaseSchema } from "@/db/helpers/base.schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const VolumeSchema = sqliteTable("volumes", {
  ...BaseSchema,
  amount: integer().notNull(),
  unit: text({
    enum: Object.values(VolumeUnits) as [string, ...string[]],
  }).notNull(),
});

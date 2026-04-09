import { DistanceUnits } from "@/constants";
import { BaseSchema } from "@/db/helpers/base.schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const DistanceSchema = sqliteTable("distances", {
  ...BaseSchema,
  amount: integer().notNull(),
  unit: text({
    enum: Object.values(DistanceUnits) as [string, ...string[]],
  }).notNull(),
});

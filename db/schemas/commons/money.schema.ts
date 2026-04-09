import { Currencies } from "@/constants";
import { BaseSchema } from "@/db/helpers/base.schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const MoneySchema = sqliteTable("money", {
  ...BaseSchema,
  amount: integer().notNull(),
  currency: text({
    enum: Object.values(Currencies) as [string, ...string[]],
  }).notNull(),
});

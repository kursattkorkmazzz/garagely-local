import { BaseSchema } from "@/db/helpers/base.schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Inline enum to avoid complex imports in drizzle-kit
const CurrenciesEnum = ["USD", "EUR", "TRY", "GBP"] as const;

export const MoneySchema = sqliteTable("money", {
  ...BaseSchema,
  amount: integer().notNull(),
  currency: text({
    enum: CurrenciesEnum,
  }).notNull(),
});

import { integer, text } from "drizzle-orm/sqlite-core";
import uuid from "react-native-uuid";

// columns.helpers.ts
export const BaseSchema = {
  id: text().primaryKey().generatedAlwaysAs(uuid.v4()),
  updated_at: integer({ mode: "timestamp_ms" }),
  created_at: integer({ mode: "timestamp_ms" })
    .notNull()
    .$default(() => new Date()),
};

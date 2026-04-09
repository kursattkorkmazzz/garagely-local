import { integer, text } from "drizzle-orm/sqlite-core";

// UUID generation function - works in both Node (drizzle-kit) and React Native
function generateUUID(): string {
  // Use crypto.randomUUID if available (Node 19+), otherwise fallback
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const BaseSchema = {
  id: text()
    .primaryKey()
    .$default(() => generateUUID()),
  updated_at: integer({ mode: "timestamp_ms" }),
  created_at: integer({ mode: "timestamp_ms" })
    .notNull()
    .$default(() => new Date()),
};

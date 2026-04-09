import { BaseSchema } from "@/db/helpers/base.schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Inline enum to avoid React Native imports in drizzle-kit
const AssetStatusEnum = ["pending", "confirmed"] as const;

const ImageMimeTypeEnum = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
] as const;

export const AssetSchema = sqliteTable("assets", {
  ...BaseSchema,
  mimeType: text({
    enum: ImageMimeTypeEnum,
  }),
  name: text().notNull(),
  path: text().notNull(),
  size: integer(),
  creationTime: integer({ mode: "timestamp_ms" }),
  status: text({
    enum: AssetStatusEnum,
  })
    .notNull()
    .default("pending"),
});

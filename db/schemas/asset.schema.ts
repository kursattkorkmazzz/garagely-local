import { BaseSchema } from "@/db/helpers/base.schema";
import { ImageMimeType } from "@/features/asset/contants/mime-types/image-mime-types";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const AssetSchema = sqliteTable("assets", {
  ...BaseSchema,
  mimeType: text({
    enum: [Object.values(ImageMimeType)].flat(Infinity) as [
      string,
      ...string[],
    ],
  }),
  name: text().notNull(),
  path: text().notNull(),
  size: integer(),
  creationTime: integer({ mode: "timestamp_ms" }),
});

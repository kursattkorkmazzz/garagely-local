import * as z from "zod";
export enum AssetType {
  IMAGE = "image",
  DOCUMENT = "document",
  VIDEO = "video",
  AUDIO = "audio",
}

export const AssetTypeValidator = z.enum(AssetType);

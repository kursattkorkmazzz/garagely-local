import { AssetStatusType } from "@/features/asset/contants/asset-status";
import { ImageMimeType } from "@/features/asset/contants/mime-types";

export type AssetEntity = {
  id: string;
  name: string;
  path: string;
  mimeType: ImageMimeType;
  size: number | null;
  creationTime: Date | null;
  status: AssetStatusType;
  created_at: Date;
  updated_at: Date | null;
};

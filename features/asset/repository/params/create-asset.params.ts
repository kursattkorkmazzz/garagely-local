import { ImageMimeType } from "@/features/asset/contants/mime-types";

export type CreateAssetParams = {
  name: string;
  path: string;
  mimeType: ImageMimeType;
  size: number | null;
  creationTime: Date | null;
};

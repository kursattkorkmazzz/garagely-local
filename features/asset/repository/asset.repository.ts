import { PaginatedResult, PaginationParams } from "@/features/common";
import { ImageMimeType } from "@/features/asset/contants/mime-types/image-mime-types";

export type AssetRecord = {
  id: string;
  name: string;
  path: string;
  mimeType: ImageMimeType;
  size: number | null;
  creationTime: Date | null;
  created_at: Date;
  updated_at: Date | null;
};

export type CreateAssetParams = {
  name: string;
  path: string;
  mimeType: ImageMimeType;
  size: number | null;
  creationTime: Date | null;
};

export abstract class AssetRepository {
  abstract save(params: CreateAssetParams): Promise<AssetRecord>;
  abstract findById(id: string): Promise<AssetRecord | null>;
  abstract findAll(params?: PaginationParams): Promise<PaginatedResult<AssetRecord>>;
  abstract exists(id: string): Promise<boolean>;
  abstract delete(id: string): Promise<void>;
}

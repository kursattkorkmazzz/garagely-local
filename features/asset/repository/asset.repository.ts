import { PaginatedResult, PaginationParams } from "@/features/common";
import { AssetEntity } from "@/features/asset/entity/asset.entity";

import { CreateAssetParams } from "./params";

export abstract class AssetRepository {
  abstract save(params: CreateAssetParams): Promise<AssetEntity>;
  abstract findById(id: string): Promise<AssetEntity | null>;
  abstract findAll(params?: PaginationParams): Promise<PaginatedResult<AssetEntity>>;
  abstract exists(id: string): Promise<boolean>;
  abstract delete(id: string): Promise<void>;
}

import { PENDING_ASSET_CLEANUP_THRESHOLD_HOURS } from "@/features/asset/contants/asset-status";
import { getExtensionFromMimeType } from "@/features/asset/contants/mime-types";
import { AssetEntity } from "@/features/asset/entity/asset.entity";
import { AssetRepository } from "@/features/asset/repository/asset.repository";
import { FileSystemStorageRepository } from "@/features/asset/repository/file-system-storage.repository";
import { SqliteAssetRepository } from "@/features/asset/repository/sqlite-asset.repository";
import { StorageRepository } from "@/features/asset/repository/storage.repository";
import { PaginatedResult, PaginationParams } from "@/features/common";
import {
  CreateAssetDto,
  CreateAssetDtoValidator,
} from "./dto/create-asset.dto";

export class AssetService {
  private static storageRepository: StorageRepository =
    new FileSystemStorageRepository();
  private static assetRepository: AssetRepository = new SqliteAssetRepository();

  static async saveAsset(data: CreateAssetDto): Promise<AssetEntity> {
    const validatedData = CreateAssetDtoValidator.parse(data);

    const extension = getExtensionFromMimeType(validatedData.mimeType);

    const fileResult = await this.storageRepository.saveFile({
      sourceUri: validatedData.sourceUri,
      fileName: validatedData.name,
      extension,
    });

    const assetRecord = await this.assetRepository.save({
      name: validatedData.name,
      path: fileResult.path,
      mimeType: validatedData.mimeType,
      size: fileResult.size,
      creationTime: new Date(),
    });

    return assetRecord;
  }

  static async getAsset(id: string): Promise<AssetEntity | null> {
    return this.assetRepository.findById(id);
  }

  static async getAllAssets(
    params?: PaginationParams,
  ): Promise<PaginatedResult<AssetEntity>> {
    return this.assetRepository.findAll(params);
  }

  static async assetExists(id: string): Promise<boolean> {
    return this.assetRepository.exists(id);
  }

  static async deleteAsset(id: string): Promise<void> {
    const asset = await this.assetRepository.findById(id);
    if (asset) {
      await this.storageRepository.deleteFile(asset.path);
      await this.assetRepository.delete(id);
    }
  }

  static async confirmAsset(id: string): Promise<void> {
    await this.assetRepository.confirm(id);
  }

  static async cleanupPendingAssets(options?: {
    olderThanHours?: number;
  }): Promise<number> {
    const thresholdHours =
      options?.olderThanHours ?? PENDING_ASSET_CLEANUP_THRESHOLD_HOURS;
    const thresholdDate = new Date(
      Date.now() - thresholdHours * 60 * 60 * 1000,
    );

    const deletedCount =
      await this.assetRepository.deletePendingOlderThan(thresholdDate);

    return deletedCount;
  }

  static getAssetUri(path: string): string {
    return this.storageRepository.getFileUri(path);
  }
}

import { getExtensionFromMimeType } from "@/features/asset/contants/mime-types";
import {
  CreateAssetDto,
  CreateAssetDtoValidator,
} from "@/features/asset/dto/create-asset.dto";
import {
  AssetRecord,
  AssetRepository,
} from "@/features/asset/repository/asset.repository";
import { FileSystemStorageRepository } from "@/features/asset/repository/file-system-storage.repository";
import { SqliteAssetRepository } from "@/features/asset/repository/sqlite-asset.repository";
import { StorageRepository } from "@/features/asset/repository/storage.repository";

export class AssetService {
  private static storageRepository: StorageRepository =
    new FileSystemStorageRepository();
  private static assetRepository: AssetRepository = new SqliteAssetRepository();

  static async saveAsset(data: CreateAssetDto): Promise<AssetRecord> {
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

  static async getAsset(id: string): Promise<AssetRecord | null> {
    return this.assetRepository.findById(id);
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

  static getAssetUri(path: string): string {
    return this.storageRepository.getFileUri(path);
  }
}

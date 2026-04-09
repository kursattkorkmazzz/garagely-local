import * as FileSystem from "expo-file-system";
import uuid from "react-native-uuid";

import {
  SaveFileParams,
  SaveFileResult,
  StorageRepository,
} from "./storage.repository";

export class FileSystemStorageRepository extends StorageRepository {
  private static readonly STORAGE_DIR = "storage";

  private getStorageBasePath(): string {
    return `${FileSystem.Paths.document.uri}${FileSystemStorageRepository.STORAGE_DIR}`;
  }

  private async ensureStorageDirectory(): Promise<void> {
    const dir = new FileSystem.Directory(this.getStorageBasePath());
    if (!dir.exists) {
      await dir.create();
    }
  }

  private generateFileName(fileName: string, extension: string): string {
    const id = uuid.v4() as string;
    const timestamp = Date.now();
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9-_]/g, "_");
    return `${id}_${sanitizedName}_${timestamp}.${extension}`;
  }

  async saveFile(params: SaveFileParams): Promise<SaveFileResult> {
    await this.ensureStorageDirectory();

    const generatedFileName = this.generateFileName(
      params.fileName,
      params.extension,
    );
    const destinationPath = `${this.getStorageBasePath()}/${generatedFileName}`;

    const sourceFile = new FileSystem.File(params.sourceUri);
    const destinationFile = new FileSystem.File(destinationPath);

    await sourceFile.copy(destinationFile);

    if (!destinationFile.exists) {
      throw new Error("Failed to save file");
    }

    return {
      path: generatedFileName,
      size: destinationFile.size ?? 0,
    };
  }

  async deleteFile(path: string): Promise<void> {
    const fullPath = `${this.getStorageBasePath()}/${path}`;
    const file = new FileSystem.File(fullPath);
    if (file.exists) {
      await file.delete();
    }
  }

  async fileExists(path: string): Promise<boolean> {
    const fullPath = `${this.getStorageBasePath()}/${path}`;
    const file = new FileSystem.File(fullPath);
    return file.exists;
  }

  getFileUri(path: string): string {
    return `${this.getStorageBasePath()}/${path}`;
  }
}

import { Paths } from "expo-file-system";

import { StorageRepository } from "./interfaces/storage.repository.interface";
export class FileSystemStorageRepository implements StorageRepository {
  private static readonly storageBasePath: string = Paths.document;

  static async saveFile() {
    // Implement file saving logic using Expo's FileSystem API
  }
}

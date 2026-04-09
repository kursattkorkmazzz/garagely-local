export type SaveFileParams = {
  sourceUri: string;
  fileName: string;
  extension: string;
};

export type SaveFileResult = {
  path: string;
  size: number;
};

export abstract class StorageRepository {
  abstract saveFile(params: SaveFileParams): Promise<SaveFileResult>;
  abstract deleteFile(path: string): Promise<void>;
  abstract fileExists(path: string): Promise<boolean>;
  abstract getFileUri(path: string): string;
}

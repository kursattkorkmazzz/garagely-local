import { getDatabase } from "@/db";
import * as FileSystem from "expo-file-system";
import { v4 as uuid } from "uuid";
import type { Asset, CreateAssetPayload } from "../types";

const ASSETS_DIR = `${FileSystem.documentDirectory}assets/`;

async function ensureAssetsDir() {
  const dirInfo = await FileSystem.getInfoAsync(ASSETS_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(ASSETS_DIR, { intermediates: true });
  }
}

function rowToAsset(row: Record<string, unknown>): Asset {
  return {
    id: row.id as string,
    ownerType: row.owner_type as Asset["ownerType"],
    ownerId: row.owner_id as string,
    assetType: row.asset_type as Asset["assetType"],
    filePath: row.file_path as string,
    mimeType: row.mime_type as string,
    width: row.width as number | null,
    height: row.height as number | null,
    createdAt: row.created_at as string,
  };
}

export const AssetRepository = {
  async getById(id: string): Promise<Asset | null> {
    const db = await getDatabase();
    const row = await db.getFirstAsync("SELECT * FROM assets WHERE id = ?", [
      id,
    ]);
    return row ? rowToAsset(row as Record<string, unknown>) : null;
  },

  async getByOwner(ownerType: string, ownerId: string): Promise<Asset[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync(
      "SELECT * FROM assets WHERE owner_type = ? AND owner_id = ? ORDER BY created_at DESC",
      [ownerType, ownerId],
    );
    return rows.map((row) => rowToAsset(row as Record<string, unknown>));
  },

  async create(
    sourceUri: string,
    payload: Omit<CreateAssetPayload, "filePath">,
  ): Promise<Asset> {
    await ensureAssetsDir();

    const db = await getDatabase();
    const id = uuid();
    const now = new Date().toISOString();

    // Get file extension from source URI
    const extension = sourceUri.split(".").pop() || "jpg";
    const destinationPath = `${ASSETS_DIR}${id}.${extension}`;

    // Copy file to app's document directory
    await FileSystem.copyAsync({
      from: sourceUri,
      to: destinationPath,
    });

    await db.runAsync(
      `INSERT INTO assets (
        id, owner_type, owner_id, asset_type, file_path, mime_type, width, height, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        payload.ownerType,
        payload.ownerId,
        payload.assetType,
        destinationPath,
        payload.mimeType,
        payload.width ?? null,
        payload.height ?? null,
        now,
      ],
    );

    return (await this.getById(id))!;
  },

  async delete(id: string): Promise<void> {
    const asset = await this.getById(id);
    if (!asset) return;

    // Delete file from filesystem
    const fileInfo = await FileSystem.getInfoAsync(asset.filePath);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(asset.filePath);
    }

    // Delete from database
    const db = await getDatabase();
    await db.runAsync("DELETE FROM assets WHERE id = ?", [id]);
  },

  async deleteByOwner(ownerType: string, ownerId: string): Promise<void> {
    const assets = await this.getByOwner(ownerType, ownerId);
    for (const asset of assets) {
      await this.delete(asset.id);
    }
  },
};

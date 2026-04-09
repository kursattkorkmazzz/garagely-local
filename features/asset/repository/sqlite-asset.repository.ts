import { getGaragelyDatabase } from "@/db";
import { AssetSchema } from "@/db/schemas/asset.schema";
import { eq } from "drizzle-orm";

import {
  AssetRecord,
  AssetRepository,
  CreateAssetParams,
} from "./asset.repository";

export class SqliteAssetRepository extends AssetRepository {
  async save(params: CreateAssetParams): Promise<AssetRecord> {
    const db = getGaragelyDatabase();

    const result = await db
      .insert(AssetSchema)
      .values({
        name: params.name,
        path: params.path,
        mimeType: params.mimeType,
        size: params.size,
        creationTime: params.creationTime,
      })
      .returning();

    const inserted = result[0];

    return {
      id: inserted.id,
      name: inserted.name,
      path: inserted.path,
      mimeType: inserted.mimeType as AssetRecord["mimeType"],
      size: inserted.size,
      creationTime: inserted.creationTime,
      created_at: inserted.created_at,
      updated_at: inserted.updated_at,
    };
  }

  async findById(id: string): Promise<AssetRecord | null> {
    const db = getGaragelyDatabase();

    const result = await db
      .select()
      .from(AssetSchema)
      .where(eq(AssetSchema.id, id))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const row = result[0];

    return {
      id: row.id,
      name: row.name,
      path: row.path,
      mimeType: row.mimeType as AssetRecord["mimeType"],
      size: row.size,
      creationTime: row.creationTime,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async exists(id: string): Promise<boolean> {
    const db = getGaragelyDatabase();

    const result = await db
      .select({ id: AssetSchema.id })
      .from(AssetSchema)
      .where(eq(AssetSchema.id, id))
      .limit(1);

    return result.length > 0;
  }

  async delete(id: string): Promise<void> {
    const db = getGaragelyDatabase();

    await db.delete(AssetSchema).where(eq(AssetSchema.id, id));
  }
}

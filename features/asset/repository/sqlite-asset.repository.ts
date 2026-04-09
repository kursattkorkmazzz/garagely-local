import { getGaragelyDatabase } from "@/db";
import { AssetSchema } from "@/db/schemas/asset.schema";
import {
  buildPaginatedResult,
  calculateOffset,
  normalizePaginationParams,
  PaginatedResult,
  PaginationParams,
} from "@/features/common";
import { asc, count, desc, eq, like, or, SQL } from "drizzle-orm";

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

    return this.mapToRecord(inserted);
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

    return this.mapToRecord(result[0]);
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<AssetRecord>> {
    const db = getGaragelyDatabase();
    const { page, limit, search, sorting } = normalizePaginationParams(params);
    const offset = calculateOffset(page, limit);

    const whereConditions: SQL[] = [];

    if (search) {
      whereConditions.push(
        or(
          like(AssetSchema.name, `%${search}%`),
          like(AssetSchema.path, `%${search}%`),
        )!,
      );
    }

    const whereClause = whereConditions.length > 0 ? whereConditions[0] : undefined;

    const orderByClause = this.buildOrderByClause(sorting);

    const [totalResult, dataResult] = await Promise.all([
      db
        .select({ count: count() })
        .from(AssetSchema)
        .where(whereClause),
      db
        .select()
        .from(AssetSchema)
        .where(whereClause)
        .orderBy(...orderByClause)
        .limit(limit)
        .offset(offset),
    ]);

    const total = totalResult[0].count;
    const data = dataResult.map((row) => this.mapToRecord(row));

    return buildPaginatedResult(data, total, page, limit);
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

  private mapToRecord(row: typeof AssetSchema.$inferSelect): AssetRecord {
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

  private buildOrderByClause(sorting?: PaginationParams["sorting"]): SQL[] {
    if (!sorting || sorting.length === 0) {
      return [desc(AssetSchema.created_at)];
    }

    const columnMap = {
      id: AssetSchema.id,
      name: AssetSchema.name,
      path: AssetSchema.path,
      mimeType: AssetSchema.mimeType,
      size: AssetSchema.size,
      creationTime: AssetSchema.creationTime,
      created_at: AssetSchema.created_at,
      updated_at: AssetSchema.updated_at,
    } as const;

    type ColumnKey = keyof typeof columnMap;

    return sorting
      .filter((sort): sort is typeof sort & { sortBy: ColumnKey } => sort.sortBy in columnMap)
      .map((sort) => {
        const column = columnMap[sort.sortBy];
        return sort.sortOrder === "asc" ? asc(column) : desc(column);
      });
  }
}

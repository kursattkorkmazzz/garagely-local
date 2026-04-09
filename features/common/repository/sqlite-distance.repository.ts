import { getGaragelyDatabase } from "@/db";
import { DistanceSchema } from "@/db/schemas/commons/distance.schema";
import { eq } from "drizzle-orm";

import {
  CreateDistanceParams,
  DistanceRecord,
  DistanceRepository,
} from "./distance.repository";

export class SqliteDistanceRepository extends DistanceRepository {
  async save(params: CreateDistanceParams): Promise<DistanceRecord> {
    const db = getGaragelyDatabase();

    const result = await db
      .insert(DistanceSchema)
      .values({
        amount: params.amount,
        unit: params.unit,
      })
      .returning();

    const inserted = result[0];

    return {
      id: inserted.id,
      amount: inserted.amount,
      unit: inserted.unit as DistanceRecord["unit"],
      created_at: inserted.created_at,
      updated_at: inserted.updated_at,
    };
  }

  async findById(id: string): Promise<DistanceRecord | null> {
    const db = getGaragelyDatabase();

    const result = await db
      .select()
      .from(DistanceSchema)
      .where(eq(DistanceSchema.id, id))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const row = result[0];

    return {
      id: row.id,
      amount: row.amount,
      unit: row.unit as DistanceRecord["unit"],
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async delete(id: string): Promise<void> {
    const db = getGaragelyDatabase();

    await db.delete(DistanceSchema).where(eq(DistanceSchema.id, id));
  }
}

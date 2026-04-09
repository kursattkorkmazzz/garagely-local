import { getGaragelyDatabase } from "@/db";
import { DistanceSchema } from "@/db/schemas/commons/distance.schema";
import { DistanceEntity } from "@/features/common/entity/distance.entity";
import { eq } from "drizzle-orm";

import { DistanceRepository } from "./distance.repository";
import { CreateDistanceParams } from "./params";

export class SqliteDistanceRepository extends DistanceRepository {
  async save(params: CreateDistanceParams): Promise<DistanceEntity> {
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
      unit: inserted.unit as DistanceEntity["unit"],
      created_at: inserted.created_at,
      updated_at: inserted.updated_at,
    };
  }

  async findById(id: string): Promise<DistanceEntity | null> {
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
      unit: row.unit as DistanceEntity["unit"],
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async delete(id: string): Promise<void> {
    const db = getGaragelyDatabase();

    await db.delete(DistanceSchema).where(eq(DistanceSchema.id, id));
  }
}

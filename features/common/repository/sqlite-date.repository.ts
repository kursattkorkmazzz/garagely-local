import { getGaragelyDatabase } from "@/db";
import { DateSchema } from "@/db/schemas/commons/date.schema";
import { DateEntity } from "@/features/common/entity/date.entity";
import { eq } from "drizzle-orm";

import { DateRepository } from "./date.repository";
import { CreateDateParams } from "./params";

export class SqliteDateRepository extends DateRepository {
  async save(params: CreateDateParams): Promise<DateEntity> {
    const db = getGaragelyDatabase();

    const result = await db
      .insert(DateSchema)
      .values({
        date: params.date,
        timezone: params.timezone,
      })
      .returning();

    const inserted = result[0];

    return {
      id: inserted.id,
      date: inserted.date,
      timezone: inserted.timezone as DateEntity["timezone"],
      created_at: inserted.created_at,
      updated_at: inserted.updated_at,
    };
  }

  async findById(id: string): Promise<DateEntity | null> {
    const db = getGaragelyDatabase();

    const result = await db
      .select()
      .from(DateSchema)
      .where(eq(DateSchema.id, id))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const row = result[0];

    return {
      id: row.id,
      date: row.date,
      timezone: row.timezone as DateEntity["timezone"],
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async delete(id: string): Promise<void> {
    const db = getGaragelyDatabase();

    await db.delete(DateSchema).where(eq(DateSchema.id, id));
  }
}

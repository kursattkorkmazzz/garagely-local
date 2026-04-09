import { getGaragelyDatabase } from "@/db";
import { MoneySchema } from "@/db/schemas/commons/money.schema";
import { eq } from "drizzle-orm";

import {
  CreateMoneyParams,
  MoneyRecord,
  MoneyRepository,
} from "./money.repository";

export class SqliteMoneyRepository extends MoneyRepository {
  async save(params: CreateMoneyParams): Promise<MoneyRecord> {
    const db = getGaragelyDatabase();

    const result = await db
      .insert(MoneySchema)
      .values({
        amount: params.amount,
        currency: params.currency,
      })
      .returning();

    const inserted = result[0];

    return {
      id: inserted.id,
      amount: inserted.amount,
      currency: inserted.currency as MoneyRecord["currency"],
      created_at: inserted.created_at,
      updated_at: inserted.updated_at,
    };
  }

  async findById(id: string): Promise<MoneyRecord | null> {
    const db = getGaragelyDatabase();

    const result = await db
      .select()
      .from(MoneySchema)
      .where(eq(MoneySchema.id, id))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    const row = result[0];

    return {
      id: row.id,
      amount: row.amount,
      currency: row.currency as MoneyRecord["currency"],
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async delete(id: string): Promise<void> {
    const db = getGaragelyDatabase();

    await db.delete(MoneySchema).where(eq(MoneySchema.id, id));
  }
}

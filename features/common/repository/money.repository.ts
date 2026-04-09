import { MoneyEntity } from "@/features/common/entity/money.entity";

import { CreateMoneyParams } from "./params";

export abstract class MoneyRepository {
  abstract save(params: CreateMoneyParams): Promise<MoneyEntity>;
  abstract findById(id: string): Promise<MoneyEntity | null>;
  abstract delete(id: string): Promise<void>;
}

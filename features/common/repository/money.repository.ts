import { Currency } from "@/constants";

export type MoneyRecord = {
  id: string;
  amount: number;
  currency: Currency;
  created_at: Date;
  updated_at: Date | null;
};

export type CreateMoneyParams = {
  amount: number;
  currency: Currency;
};

export abstract class MoneyRepository {
  abstract save(params: CreateMoneyParams): Promise<MoneyRecord>;
  abstract findById(id: string): Promise<MoneyRecord | null>;
  abstract delete(id: string): Promise<void>;
}

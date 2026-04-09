import { Currency } from "@/constants";

export type MoneyEntity = {
  id: string;
  amount: number;
  currency: Currency;
  created_at: Date;
  updated_at: Date | null;
};

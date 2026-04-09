import z from "zod";

export const Currencies = {
  USD: "USD",
  EUR: "EUR",
  TRY: "TRY",
  GBP: "GBP",
} as const;

export type Currency = (typeof Currencies)[keyof typeof Currencies];

export const MoneyDtoValidator = z.object({
  amount: z.int().min(0),
  currency: z.enum(Currencies),
});

export type MoneyDto = z.infer<typeof MoneyDtoValidator>;

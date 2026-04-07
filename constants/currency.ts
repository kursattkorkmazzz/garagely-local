export const Currencies = {
  USD: "USD",
  EUR: "EUR",
  TRY: "TRY",
  GBP: "GBP",
} as const;

export type Currency = (typeof Currencies)[keyof typeof Currencies];

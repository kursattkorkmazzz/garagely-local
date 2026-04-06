export const Currencies = {
  USD: "USD",
  EUR: "EUR",
  TRY: "TRY",
  GBP: "GBP",
} as const;

export type Currency = (typeof Currencies)[keyof typeof Currencies];

export const CurrencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  TRY: "₺",
  GBP: "£",
};

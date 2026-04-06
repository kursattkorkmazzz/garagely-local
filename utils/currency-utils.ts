import { type Currency } from "@/constants";

const CURRENCY_CONFIG: Record<Currency, { locale: string }> = {
  USD: { locale: "en-US" },
  EUR: { locale: "de-DE" },
  TRY: { locale: "tr-TR" },
  GBP: { locale: "en-GB" },
};

export class CurrencyUtils {
  // Cache formatters for performance
  private static formatterCache = new Map<Currency, Intl.NumberFormat>();

  static formatMoney(amount: number, currency: Currency): string {
    return this.getFormatter(currency).format(amount);
  }

  private static getFormatter(currency: Currency): Intl.NumberFormat {
    let formatter = this.formatterCache.get(currency);
    if (!formatter) {
      const config = CURRENCY_CONFIG[currency];
      formatter = new Intl.NumberFormat(config.locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      this.formatterCache.set(currency, formatter);
    }
    return formatter;
  }
}

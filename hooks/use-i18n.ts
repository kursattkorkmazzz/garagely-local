import type { TranslationNamespace } from "@/i18n/types";
import { useTranslation } from "react-i18next";

export function useI18n(
  ns: TranslationNamespace | TranslationNamespace[] = "common",
) {
  const { t, i18n } = useTranslation(ns);
  return {
    t,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
  };
}

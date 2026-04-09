import {
  AppInput,
  AppInputField,
  AppInputLabel,
  AppInputRightAction,
} from "@/components/ui/app-input";
import { AppText } from "@/components/ui/app-text";
import { useI18n } from "@/hooks";
import { useStore } from "@/store/store";
import { spacing } from "@/theme/tokens/spacing";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { useVehicleForm } from "../vehicle-form-context";

export function PurchaseInfoStep() {
  const { t } = useI18n("vehicle");
  const { values, setFieldValue } = useVehicleForm();
  const { currency, distance, timezone } = useStore((state) => state.preferences);

  // Set default currency and distance unit from user preferences on mount
  useEffect(() => {
    if (!values.purchaseCurrency) {
      setFieldValue("purchaseCurrency", currency);
    }
    if (!values.purchaseOdometerUnit) {
      setFieldValue("purchaseOdometerUnit", distance);
    }
    if (!values.purchaseTimezone) {
      setFieldValue("purchaseTimezone", timezone);
    }
  }, []);

  const formatDateForDisplay = (timestamp?: number): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const handleDateChange = (text: string) => {
    // Simple date parsing - expects format like DD/MM/YYYY or MM/DD/YYYY
    // Convert to timestamp
    const parts = text.split(/[\/\-\.]/);
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      if (day && month && year && year > 1900) {
        const date = new Date(year, month - 1, day);
        if (!isNaN(date.getTime())) {
          setFieldValue("purchaseDate", date.getTime());
          return;
        }
      }
    }
    // Keep the text for partial input, clear timestamp for invalid
    if (text === "") {
      setFieldValue("purchaseDate", undefined);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <AppText variant="bodyMedium" color="muted" style={styles.sectionDescription}>
        {t("purchase.title")}
      </AppText>

      {/* Purchase Date */}
      <AppInput
        AppInputLabel={<AppInputLabel>{t("purchase.date")}</AppInputLabel>}
        AppInputField={
          <AppInputField
            placeholder={t("purchase.datePlaceholder")}
            value={formatDateForDisplay(values.purchaseDate)}
            onChangeText={handleDateChange}
            keyboardType="numbers-and-punctuation"
          />
        }
      />

      {/* Purchase Price */}
      <AppInput
        AppInputLabel={<AppInputLabel>{t("purchase.price")}</AppInputLabel>}
        AppInputField={
          <AppInputField
            placeholder={t("purchase.pricePlaceholder")}
            value={values.purchasePrice?.toString() ?? ""}
            onChangeText={(text) => {
              const num = parseFloat(text.replace(/[^0-9.]/g, ""));
              setFieldValue("purchasePrice", isNaN(num) ? undefined : num);
            }}
            keyboardType="decimal-pad"
            InputRightAction={
              <AppInputRightAction>
                <AppText variant="bodyMedium" color="muted">
                  {values.purchaseCurrency ?? currency}
                </AppText>
              </AppInputRightAction>
            }
          />
        }
      />

      {/* Purchase Odometer */}
      <AppInput
        AppInputLabel={<AppInputLabel>{t("purchase.distance")}</AppInputLabel>}
        AppInputField={
          <AppInputField
            placeholder={t("purchase.distancePlaceholder")}
            value={values.purchaseOdometer?.toString() ?? ""}
            onChangeText={(text) => {
              const num = parseInt(text.replace(/[^0-9]/g, ""), 10);
              setFieldValue("purchaseOdometer", isNaN(num) ? undefined : num);
            }}
            keyboardType="number-pad"
            InputRightAction={
              <AppInputRightAction>
                <AppText variant="bodyMedium" color="muted">
                  {values.purchaseOdometerUnit ?? distance}
                </AppText>
              </AppInputRightAction>
            }
          />
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  sectionDescription: {
    paddingLeft: spacing.sm,
    marginBottom: spacing.sm,
  },
});

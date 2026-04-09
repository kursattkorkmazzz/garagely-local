import {
  AppSelect,
  AppSelectContent,
  AppSelectItem,
  AppSelectTrigger,
  AppSelectValue,
} from "@/components/ui/app-select";
import { AppText } from "@/components/ui/app-text";
import { AppView } from "@/components/ui/app-view";
import { BodyTypes, FuelTypes, TransmissionTypes } from "@/features/vehicle";
import { useI18n } from "@/hooks";
import { spacing } from "@/theme/tokens/spacing";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { useVehicleForm } from "../vehicle-form-context";

export function SpecificationsStep() {
  const { t } = useI18n("vehicle");
  const { values, setFieldValue } = useVehicleForm();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Fuel Type */}
      <AppView style={styles.fieldContainer}>
        <AppText variant="bodyMedium" color="muted" style={styles.label}>
          {t("technical.fuelType")}
        </AppText>
        <AppSelect
          value={values.fuelType}
          onValueChange={(value) => setFieldValue("fuelType", value)}
        >
          <AppSelectTrigger>
            <AppSelectValue placeholder={t("technical.selectPlaceholder")} />
          </AppSelectTrigger>
          <AppSelectContent>
            {Object.values(FuelTypes).map((fuelType) => (
              <AppSelectItem key={fuelType} value={fuelType}>
                {t(`fuelTypes.${fuelType}`)}
              </AppSelectItem>
            ))}
          </AppSelectContent>
        </AppSelect>
      </AppView>

      {/* Body Type */}
      <AppView style={styles.fieldContainer}>
        <AppText variant="bodyMedium" color="muted" style={styles.label}>
          {t("technical.bodyType")}
        </AppText>
        <AppSelect
          value={values.bodyType}
          onValueChange={(value) => setFieldValue("bodyType", value)}
        >
          <AppSelectTrigger>
            <AppSelectValue placeholder={t("technical.selectPlaceholder")} />
          </AppSelectTrigger>
          <AppSelectContent>
            {Object.values(BodyTypes).map((bodyType) => (
              <AppSelectItem key={bodyType} value={bodyType}>
                {t(`bodyTypes.${bodyType}`)}
              </AppSelectItem>
            ))}
          </AppSelectContent>
        </AppSelect>
      </AppView>

      {/* Transmission Type */}
      <AppView style={styles.fieldContainer}>
        <AppText variant="bodyMedium" color="muted" style={styles.label}>
          {t("technical.transmissionType")}
        </AppText>
        <AppSelect
          value={values.transmissionType}
          onValueChange={(value) => setFieldValue("transmissionType", value)}
        >
          <AppSelectTrigger>
            <AppSelectValue placeholder={t("technical.selectPlaceholder")} />
          </AppSelectTrigger>
          <AppSelectContent>
            {Object.values(TransmissionTypes).map((transmissionType) => (
              <AppSelectItem key={transmissionType} value={transmissionType}>
                {t(`transmissionTypes.${transmissionType}`)}
              </AppSelectItem>
            ))}
          </AppSelectContent>
        </AppSelect>
      </AppView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },
  fieldContainer: {
    gap: spacing.sm,
  },
  label: {
    paddingLeft: spacing.sm,
  },
});

import { AppButton } from "@/components/ui/app-button";
import { AppText } from "@/components/ui/app-text";
import { useI18n } from "@/hooks";
import { useTheme } from "@/theme/theme-context";
import { spacing } from "@/theme/tokens/spacing";
import React from "react";
import { StyleSheet, View } from "react-native";

import { BasicInfoStep } from "./steps/basic-info-step";
import { PurchaseInfoStep } from "./steps/purchase-info-step";
import { SpecificationsStep } from "./steps/specifications-step";
import { useVehicleForm, useVehicleFormStep } from "./vehicle-form-context";
import { VehicleFormProgress } from "./vehicle-form-progress";

export function VehicleForm() {
  const { theme } = useTheme();
  const { t } = useI18n("vehicle");
  const { currentStep, nextStep, prevStep, isFirstStep, isLastStep } =
    useVehicleFormStep();
  const { handleSubmit, isSubmitting } = useVehicleForm();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep />;
      case 1:
        return <SpecificationsStep />;
      case 2:
        return <PurchaseInfoStep />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      nextStep();
    }
  };

  return (
    <View style={styles.container}>
      <VehicleFormProgress />

      <View style={styles.stepContainer}>{renderStep()}</View>

      <View style={styles.buttonContainer}>
        {!isFirstStep && (
          <AppButton variant="outline" onPress={prevStep} style={styles.button}>
            <AppText>{t("form.back")}</AppText>
          </AppButton>
        )}

        <AppButton
          variant="primary"
          onPress={handleNext}
          disabled={isSubmitting}
          style={[styles.button, isFirstStep && styles.fullWidthButton]}
        >
          <AppText style={{ color: theme.primaryForeground }}>
            {isLastStep ? t("form.save") : t("form.next")}
          </AppText>
        </AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  button: {
    flex: 1,
  },
  fullWidthButton: {
    flex: 1,
  },
});

import { useTheme } from "@/theme/theme-context";
import { radius } from "@/theme/tokens/radius";
import { spacing } from "@/theme/tokens/spacing";
import React from "react";
import { StyleSheet, View } from "react-native";

import { useVehicleFormStep } from "./vehicle-form-context";

export function VehicleFormProgress() {
  const { theme } = useTheme();
  const { currentStep, totalSteps } = useVehicleFormStep();

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.segment,
            {
              backgroundColor:
                index <= currentStep ? theme.primary : theme.muted,
            },
            index === 0 && styles.firstSegment,
            index === totalSteps - 1 && styles.lastSegment,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: radius.sm,
  },
  firstSegment: {
    borderTopLeftRadius: radius.sm,
    borderBottomLeftRadius: radius.sm,
  },
  lastSegment: {
    borderTopRightRadius: radius.sm,
    borderBottomRightRadius: radius.sm,
  },
});

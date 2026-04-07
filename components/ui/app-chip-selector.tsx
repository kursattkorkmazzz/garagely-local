import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { useTheme } from "@/theme/theme-context";
import { radius } from "@/theme/tokens/radius";
import { spacing } from "@/theme/tokens/spacing";
import { AppIcon, type IconName } from "./app-icon";
import { AppText } from "./app-text";

export type ChipOption = {
  value: string;
  label: string;
  icon?: IconName;
};

type AppChipSelectorProps = {
  options: ChipOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  multiSelect?: boolean;
  selectedValues?: string[];
  onSelectedValuesChange?: (values: string[]) => void;
  scrollable?: boolean;
  label?: string;
  required?: boolean;
};

export function AppChipSelector({
  options,
  value,
  onValueChange,
  multiSelect = false,
  selectedValues = [],
  onSelectedValuesChange,
  scrollable = false,
  label,
  required = false,
}: AppChipSelectorProps) {
  const { theme, withOpacity } = useTheme();

  const handlePress = (optionValue: string) => {
    if (multiSelect) {
      const isSelected = selectedValues.includes(optionValue);
      const newValues = isSelected
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onSelectedValuesChange?.(newValues);
    } else {
      onValueChange?.(optionValue);
    }
  };

  const isSelected = (optionValue: string) => {
    if (multiSelect) {
      return selectedValues.includes(optionValue);
    }
    return value === optionValue;
  };

  const renderChips = () => (
    <View style={styles.chipsContainer}>
      {options.map((option) => {
        const selected = isSelected(option.value);
        return (
          <Pressable
            key={option.value}
            onPress={() => handlePress(option.value)}
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor: selected
                  ? theme.primary
                  : withOpacity(theme.muted, 0.3),
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            {option.icon && (
              <AppIcon
                icon={option.icon}
                size={16}
                color={selected ? theme.primaryForeground : theme.foreground}
              />
            )}
            <AppText
              variant="bodySmall"
              style={{
                color: selected ? theme.primaryForeground : theme.foreground,
                fontWeight: selected ? "600" : "400",
              }}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <AppText variant="bodySmall" color="muted">
            {label}
          </AppText>
          {required && (
            <AppText
              variant="bodySmall"
              style={{ color: theme.destructive, marginLeft: 2 }}
            >
              *
            </AppText>
          )}
        </View>
      )}
      {scrollable ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {renderChips()}
        </ScrollView>
      ) : (
        renderChips()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  labelContainer: {
    flexDirection: "row",
    marginBottom: spacing.xs,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  scrollContent: {
    paddingRight: spacing.md,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.xl,
  },
});

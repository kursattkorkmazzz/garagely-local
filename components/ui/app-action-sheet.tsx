import { useI18n } from "@/hooks/use-i18n";
import { radius, spacing, useTheme } from "@/theme";
import React from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "./app-button";
import { AppText } from "./app-text";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_OPTIONS_HEIGHT = SCREEN_HEIGHT * 0.5;

export type ActionSheetOption = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type AppActionSheetProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  options: ActionSheetOption[];
  cancelLabel?: string;
};

export function AppActionSheet({
  visible,
  onClose,
  title,
  message,
  options,
  cancelLabel,
}: AppActionSheetProps) {
  const { theme, withOpacity } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();

  const _cancelLabel = cancelLabel || t("buttons.cancel");

  const handleOptionPress = (option: ActionSheetOption) => {
    onClose();
    // Small delay to allow modal to close before action
    setTimeout(() => {
      option.onPress();
    }, 100);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={[
            styles.overlay,
            { backgroundColor: withOpacity("#000000", 0.5) },
          ]}
        >
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              {/* Options Group */}
              <View
                style={[
                  styles.optionsGroup,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                {/* Header */}
                {(title || message) && (
                  <View
                    style={[styles.header, { borderBottomColor: theme.border }]}
                  >
                    {title && (
                      <AppText
                        variant="bodySmall"
                        color="muted"
                        style={styles.title}
                      >
                        {title}
                      </AppText>
                    )}
                    {message && (
                      <AppText variant="caption" color="muted">
                        {message}
                      </AppText>
                    )}
                  </View>
                )}

                {/* Options */}
                <FlatList
                  data={options}
                  keyExtractor={(item, index) => `${item.label}-${index}`}
                  style={{ maxHeight: MAX_OPTIONS_HEIGHT }}
                  showsVerticalScrollIndicator={true}
                  bounces={false}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{ height: 1, backgroundColor: theme.border }}
                    />
                  )}
                  renderItem={({ item }) => (
                    <AppButton
                      variant="ghost"
                      onPress={() => handleOptionPress(item)}
                      style={styles.option}
                    >
                      <AppText
                        variant="bodyMedium"
                        style={[
                          styles.optionText,
                          item.destructive
                            ? { color: theme.destructive }
                            : { color: theme.foreground },
                        ]}
                      >
                        {item.label}
                      </AppText>
                    </AppButton>
                  )}
                />
              </View>

              {/* Cancel Button */}
              <AppButton
                variant="ghost"
                onPress={onClose}
                style={[
                  styles.cancelButton,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    marginBottom: insets.bottom,
                  },
                ]}
              >
                <AppText
                  variant="bodyMedium"
                  style={[styles.cancelText, { color: theme.primary }]}
                >
                  {_cancelLabel}
                </AppText>
              </AppButton>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheetContainer: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  optionsGroup: {
    borderRadius: radius.xl,
    borderWidth: 1,
    overflow: "hidden",
  },
  header: {
    padding: spacing.md,
    alignItems: "center",
    borderBottomWidth: 1,
  },
  title: {
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  option: {
    borderRadius: 0,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 50,
  },
  optionText: {
    fontWeight: "500",
  },
  cancelButton: {
    borderRadius: radius.xl,
    borderWidth: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: 50,
  },
  cancelText: {
    fontWeight: "600",
  },
});

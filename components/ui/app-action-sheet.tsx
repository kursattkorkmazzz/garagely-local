import { useI18n } from "@/hooks/use-i18n";
import { useTheme } from "@/theme/theme-context";
import { radius } from "@/theme/tokens/radius";
import { spacing } from "@/theme/tokens/spacing";
import React, { useState, useMemo } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "./app-button";
import { AppText } from "./app-text";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_OPTIONS_HEIGHT = SCREEN_HEIGHT * 0.5;
export type ActionSheetRef = {
  show: () => void;
  close: () => void;
};

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
  searchable?: boolean;
  searchPlaceholder?: string;
};

export function AppActionSheet({
  visible,
  onClose,
  title,
  message,
  options,
  cancelLabel,
  searchable = false,
  searchPlaceholder,
}: AppActionSheetProps) {
  const { theme, withOpacity } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  const _cancelLabel = cancelLabel || t("buttons.cancel");

  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) {
      return options;
    }
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchable, searchQuery, options]);

  const handleOptionPress = (option: ActionSheetOption) => {
    handleClose();
    // Small delay to allow modal to close before action
    setTimeout(() => {
      option.onPress();
    }, 100);
  };

  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
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

                {/* Search Input */}
                {searchable && (
                  <View
                    style={[
                      styles.searchContainer,
                      { borderBottomColor: theme.border },
                    ]}
                  >
                    <TextInput
                      placeholder={searchPlaceholder || t("common.search")}
                      placeholderTextColor={theme.muted}
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      style={[
                        styles.searchInput,
                        {
                          color: theme.foreground,
                          backgroundColor: theme.background,
                        },
                      ]}
                      autoCorrect={false}
                      autoCapitalize="none"
                    />
                  </View>
                )}

                {/* Options */}
                <FlatList
                  data={filteredOptions}
                  keyExtractor={(item, index) => `${item.label}-${index}`}
                  style={{ maxHeight: MAX_OPTIONS_HEIGHT }}
                  showsVerticalScrollIndicator={true}
                  bounces={false}
                  getItemLayout={(_, index) => ({
                    length: 50,
                    offset: 50 * index,
                    index,
                  })}
                  initialNumToRender={15}
                  maxToRenderPerBatch={10}
                  windowSize={5}
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
                onPress={handleClose}
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
  searchContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  searchInput: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    fontSize: 16,
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

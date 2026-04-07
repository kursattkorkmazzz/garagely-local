import { useTheme } from "@/theme/theme-context";
import { radius } from "@/theme/tokens/radius";
import { spacing } from "@/theme/tokens/spacing";
import React, { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "./app-button";
import { AppIcon } from "./app-icon";
import { AppText } from "./app-text";

type AppModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
};

export function AppModal({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnBackdrop = true,
}: AppModalProps) {
  const { theme, withOpacity } = useTheme();
  const insets = useSafeAreaInsets();

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.overlay,
          { backgroundColor: withOpacity("#000000", 0.5) },
        ]}
      >
        {/* Backdrop - catches taps outside the modal */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleBackdropPress}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
          pointerEvents="box-none"
        >
          <Pressable
            style={[
              styles.modalContainer,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                marginBottom: insets.bottom + spacing.md,
              },
            ]}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <View
                style={[styles.header, { borderBottomColor: theme.border }]}
              >
                {title && (
                  <AppText variant="heading4" style={styles.title}>
                    {title}
                  </AppText>
                )}
                {showCloseButton && (
                  <AppButton
                    variant="ghost"
                    size="icon"
                    onPress={onClose}
                    style={styles.closeButton}
                  >
                    <AppIcon icon="X" size={20} color={theme.foreground} />
                  </AppButton>
                )}
              </View>
            )}

            {/* Content */}
            <ScrollView
              style={styles.content}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {children}
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

// Modal Footer for action buttons
type AppModalFooterProps = {
  children: ReactNode;
};

export function AppModalFooter({ children }: AppModalFooterProps) {
  return <View style={styles.footer}>{children}</View>;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxWidth: 400,
    borderRadius: radius.xl,
    borderWidth: 1,
    maxHeight: "90%",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  title: {
    flex: 1,
  },
  closeButton: {
    marginLeft: spacing.sm,
    width: 36,
    height: 36,
  },
  content: {
    flexGrow: 0,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  footer: {
    flexDirection: "column",
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
});

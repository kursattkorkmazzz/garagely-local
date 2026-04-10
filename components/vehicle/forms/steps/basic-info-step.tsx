import { AppIcon } from "@/components/ui/app-icon";
import { AppImageUploader } from "@/components/ui/app-image-uploader";
import {
  AppInput,
  AppInputErrorMessage,
  AppInputField,
  AppInputLabel,
} from "@/components/ui/app-input";
import { AppText } from "@/components/ui/app-text";
import { AssetService, CreateAssetDto, ImageMimeType } from "@/features/asset";
import { useI18n } from "@/hooks";
import { useTheme } from "@/theme/theme-context";
import { radius } from "@/theme/tokens/radius";
import { spacing } from "@/theme/tokens/spacing";
import { ImagePickerAsset } from "expo-image-picker";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import { useVehicleForm } from "../vehicle-form-context";

export function BasicInfoStep() {
  const { theme } = useTheme();
  const { t } = useI18n("vehicle");
  const { values, setFieldValue, errors, touched } = useVehicleForm();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageSelected = async (assets: ImagePickerAsset[]) => {
    if (assets.length === 0) return;

    const asset = assets[0];
    setIsUploading(true);
    setUploadProgress(10);

    try {
      setUploadProgress(30);

      const createAssetDto: CreateAssetDto = {
        sourceUri: asset.uri,
        name: asset.fileName ?? "vehicle-cover",
        mimeType: (asset.mimeType as ImageMimeType) ?? "image/jpeg",
      };

      setUploadProgress(50);
      const savedAsset = await AssetService.saveAsset(createAssetDto);
      setUploadProgress(90);

      setFieldValue("coverImageId", savedAsset.id);
      setUploadProgress(100);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t("common:errors.uploadFailed"),
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleImageRemove = async () => {
    if (values.coverImageId) {
      try {
        await AssetService.deleteAsset(values.coverImageId);
      } catch {
        // Ignore cleanup errors
      }
    }
    setFieldValue("coverImageId", undefined);
    setFieldValue("selectedCoverImageUri", undefined);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Cover Image */}
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: theme.secondary, borderColor: theme.border },
        ]}
      >
        <AppImageUploader
          onImageSelected={handleImageSelected}
          selectedUri={
            values.selectedCoverImageUri ? [values.selectedCoverImageUri] : null
          }
          onRemove={handleImageRemove}
          disabled={isUploading}
          uploading={
            isUploading ? { currentUploadStatus: uploadProgress } : undefined
          }
        >
          <View style={styles.imagePlaceholder}>
            <AppIcon icon="Camera" size={32} color={theme.mutedForeground} />
            <AppText
              variant="bodyMedium"
              color="muted"
              style={styles.imageText}
            >
              {t("image.description")}
            </AppText>
          </View>
        </AppImageUploader>
      </View>

      {/* Brand */}
      <AppInput
        AppInputLabel={
          <AppInputLabel required>{t("general.brand")}</AppInputLabel>
        }
        AppInputField={
          <AppInputField
            placeholder={t("general.brandPlaceholder")}
            value={values.brand}
            onChangeText={(text) => setFieldValue("brand", text)}
            autoCapitalize="words"
          />
        }
        AppInputErrorMessage={
          touched.brand && errors.brand ? (
            <AppInputErrorMessage>{errors.brand}</AppInputErrorMessage>
          ) : undefined
        }
      />

      {/* Model */}
      <AppInput
        AppInputLabel={
          <AppInputLabel required>{t("general.model")}</AppInputLabel>
        }
        AppInputField={
          <AppInputField
            placeholder={t("general.modelPlaceholder")}
            value={values.model}
            onChangeText={(text) => setFieldValue("model", text)}
            autoCapitalize="words"
          />
        }
        AppInputErrorMessage={
          touched.model && errors.model ? (
            <AppInputErrorMessage>{errors.model}</AppInputErrorMessage>
          ) : undefined
        }
      />

      {/* Year and Plate in a row */}
      <View style={styles.row}>
        <View style={styles.halfField}>
          <AppInput
            AppInputLabel={
              <AppInputLabel required>{t("identification.year")}</AppInputLabel>
            }
            AppInputField={
              <AppInputField
                placeholder={t("identification.yearPlaceholder")}
                value={values.year?.toString() ?? ""}
                onChangeText={(text) => {
                  const num = parseInt(text, 10);
                  setFieldValue("year", isNaN(num) ? undefined : num);
                }}
                keyboardType="number-pad"
                maxLength={4}
              />
            }
            AppInputErrorMessage={
              touched.year && errors.year ? (
                <AppInputErrorMessage>{errors.year}</AppInputErrorMessage>
              ) : undefined
            }
          />
        </View>

        <View style={styles.halfField}>
          <AppInput
            AppInputLabel={
              <AppInputLabel required>
                {t("identification.plate")}
              </AppInputLabel>
            }
            AppInputField={
              <AppInputField
                placeholder={t("identification.platePlaceholder")}
                value={values.plate}
                onChangeText={(text) =>
                  setFieldValue("plate", text.toUpperCase())
                }
                autoCapitalize="characters"
              />
            }
            AppInputErrorMessage={
              touched.plate && errors.plate ? (
                <AppInputErrorMessage>{errors.plate}</AppInputErrorMessage>
              ) : undefined
            }
          />
        </View>
      </View>

      {/* Color */}
      <AppInput
        AppInputLabel={<AppInputLabel>{t("general.color")}</AppInputLabel>}
        AppInputField={
          <AppInputField
            placeholder={t("general.colorPlaceholder")}
            value={values.color ?? ""}
            onChangeText={(text) => setFieldValue("color", text || undefined)}
            autoCapitalize="words"
          />
        }
      />

      {/* VIN */}
      <AppInput
        AppInputLabel={<AppInputLabel>{t("identification.vin")}</AppInputLabel>}
        AppInputField={
          <AppInputField
            placeholder={t("identification.vinPlaceholder")}
            value={values.vin ?? ""}
            onChangeText={(text) =>
              setFieldValue("vin", text.toUpperCase() || undefined)
            }
            autoCapitalize="characters"
            maxLength={17}
          />
        }
        AppInputErrorMessage={
          touched.vin && errors.vin ? (
            <AppInputErrorMessage>{errors.vin}</AppInputErrorMessage>
          ) : undefined
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
  imageContainer: {
    height: 180,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderStyle: "dashed",
    overflow: "hidden",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  imageText: {
    textAlign: "center",
    paddingHorizontal: spacing.xl,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  halfField: {
    flex: 1,
  },
});

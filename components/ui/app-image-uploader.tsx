import { AppProgressBar } from "@/components/ui/app-progress-bar";
import { useI18n } from "@/hooks";
import { useTheme } from "@/theme/theme-context";
import { radius } from "@/theme/tokens/radius";
import * as ImagePicker from "expo-image-picker";
import type { ReactNode } from "react";
import { useState } from "react";
import { Image, ImageProps, Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { AppActionSheet } from "./app-action-sheet";
import { AppIcon } from "./app-icon";

type AppImageUploaderProps = {
  /**
   * Trigger UI — rendered when no image is selected.
   * Can be an icon, text, or any layout.
   */
  children: ReactNode;
  onImageSelected: (asset: ImagePicker.ImagePickerAsset[]) => void;
  selectedUri?: string[] | null;
  onRemove?: () => void;
  disabled?: boolean;
  imagePickerOptions?: ImagePicker.ImagePickerOptions;
  uploading?: {
    currentUploadStatus: number;
  };
};

// TODO: Refactor the localizaitaon for this component.
export function AppImageUploader({
  children,
  onImageSelected,
  selectedUri,
  onRemove,
  disabled = false,
  imagePickerOptions = {
    mediaTypes: "images",
    allowsEditing: true,
    aspect: [16, 9],
    quality: 1,
    cameraType: ImagePicker.CameraType.back,
    legacy: true,
    selectionLimit: 1,
  },
  uploading,
}: AppImageUploaderProps) {
  const { withOpacity } = useTheme();
  const { t } = useI18n();
  const [sheetVisible, setSheetVisible] = useState(false);
  const currentUploadStatus = Math.max(
    Math.min(uploading?.currentUploadStatus ?? 0, 100),
    0,
  );

  const requestPermission = async (
    type: "camera" | "library",
  ): Promise<boolean> => {
    if (type === "camera") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: t("common:permissions.cameraDenied"),
        });
        return false;
      }
    } else {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: t("common:permissions.libraryDenied"),
        });
        return false;
      }
    }
    return true;
  };

  const pickFromLibrary = async () => {
    const granted = await requestPermission("library");
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      ...imagePickerOptions,
      mediaTypes: ["images"],
    });

    if (!result.canceled && result.assets.length > 0) {
      onImageSelected(result.assets);
    }
  };

  const pickFromCamera = async () => {
    const granted = await requestPermission("camera");
    if (!granted) return;

    const result = await ImagePicker.launchCameraAsync({
      ...imagePickerOptions,
      mediaTypes: "images",
    });

    if (!result.canceled && result.assets.length > 0) {
      onImageSelected(result.assets);
    }
  };

  const sheetOptions = [
    {
      label: t("common:imagePicker.camera"),
      onPress: pickFromCamera,
    },
    {
      label: t("common:imagePicker.library"),
      onPress: pickFromLibrary,
    },
    ...(onRemove && selectedUri
      ? [
          {
            label: t("common:imagePicker.remove"),
            onPress: onRemove,
            destructive: true,
          },
        ]
      : []),
  ];

  if (selectedUri?.length && selectedUri?.length > 0) {
    return (
      <>
        <View style={styles.previewContainer}>
          {selectedUri.length === 1 && (
            <PreviewImage
              source={{ uri: selectedUri[0] }}
              style={styles.previewImage}
            />
          )}
          {selectedUri.length > 1 && (
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {selectedUri.map((uri, index) => (
                <PreviewImage
                  key={index}
                  source={{ uri }}
                  style={{ width: "50%", height: "50%" }}
                />
              ))}
            </View>
          )}
          {uploading && (
            <AppProgressBar value={currentUploadStatus} rounded={false} />
          )}
          {/* Edit overlay button */}
          <Pressable
            style={[
              styles.editOverlay,
              { backgroundColor: withOpacity("#000000", 0.45) },
            ]}
            onPress={() => !disabled && setSheetVisible(true)}
            disabled={disabled}
          >
            <AppIcon icon="Pencil" size={16} color="#ffffff" />
          </Pressable>
        </View>

        <AppActionSheet
          visible={sheetVisible}
          onClose={() => setSheetVisible(false)}
          options={sheetOptions}
        />
      </>
    );
  }

  return (
    <>
      <Pressable
        onPress={() => !disabled && setSheetVisible(true)}
        disabled={disabled}
        style={({ pressed }) => [
          styles.trigger,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        {children}
      </Pressable>

      <AppActionSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        options={sheetOptions}
      />
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flex: 1,
  },
  previewContainer: {
    width: "100%",
    height: "100%",
    borderRadius: radius.xl,
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  editOverlay: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

type PreviewImageProps = ImageProps;

function PreviewImage(props: PreviewImageProps) {
  return (
    <View style={{ flex: 1 }}>
      <Image resizeMode="cover" {...props} />
    </View>
  );
}

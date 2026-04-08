import { useTheme } from "@/theme/theme-context";
import { radius } from "@/theme/tokens/radius";
import { Image, ImageSource } from "expo-image";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

type ListItemImageProps = {
  /** Image source (URL or require) */
  source?: ImageSource;

  /** Image size (defaults to 20) */
  size?: number;

  /** Fallback Color */
  fallbackColor?: string;
};

export function ListItemImage({
  source,
  fallbackColor,
  size = 20,
}: ListItemImageProps) {
  const { theme, withOpacity } = useTheme();
  const [status, setStatus] = useState<
    "loading" | "error" | "success" | "fallback"
  >(source ? "loading" : "fallback");

  const fbColor = fallbackColor || theme.muted;
  const showFallback = status === "error" || status === "fallback";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: withOpacity(fbColor, 0.12) },
      ]}
    >
      {!showFallback && (
        <Image
          source={source}
          style={styles.image}
          contentFit="cover"
          contentPosition={"center"}
          onError={(error) => {
            console.debug("ListItemImage: ", error);
            setStatus("error");
          }}
          onLoad={() => {
            setStatus("success");
          }}
          onLoadStart={() => {
            setStatus("loading");
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

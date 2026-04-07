import { useTheme } from "@/theme/theme-context";
import { radius } from "@/theme/tokens/radius";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { AppText } from "./app-text";

type ProgressVariant = "default" | "success" | "warning" | "destructive";
type ProgressSize = "sm" | "default" | "lg";
type ValuePosition = "inside" | "right" | "top";

type AppProgressBarProps = {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  showValue?: boolean;
  valuePosition?: ValuePosition;
  animated?: boolean;
  indeterminate?: boolean;
  rounded?: boolean;
  striped?: boolean;
};

const SIZE_CONFIG: Record<ProgressSize, { height: number; fontSize: number }> =
  {
    sm: { height: 6, fontSize: 10 },
    default: { height: 10, fontSize: 12 },
    lg: { height: 16, fontSize: 14 },
  };

export function AppProgressBar({
  value,
  max = 100,
  variant = "default",
  size = "default",
  showValue = false,
  valuePosition = "right",
  animated = true,
  indeterminate = false,
  rounded = true,
}: AppProgressBarProps) {
  const { theme } = useTheme();
  const progress = useSharedValue(0);
  const indeterminatePos = useSharedValue(-30);

  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = (clampedValue / max) * 100;

  const sizeConfig = SIZE_CONFIG[size];

  const getVariantColor = () => {
    switch (variant) {
      case "success":
        return theme.color.green;
      case "warning":
        return theme.color.orange;
      case "destructive":
        return theme.color.red;
      default:
        return theme.primary;
    }
  };

  useEffect(() => {
    if (indeterminate) {
      indeterminatePos.value = withRepeat(
        withSequence(
          withTiming(100, {
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(-30, { duration: 0 }),
        ),
        -1,
        false,
      );
    } else {
      progress.value = animated
        ? withTiming(percentage, {
            duration: 300,
            easing: Easing.out(Easing.ease),
          })
        : percentage;
    }
  }, [percentage, indeterminate, animated]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  const indeterminateStyle = useAnimatedStyle(() => ({
    left: `${indeterminatePos.value}%`,
    width: "30%",
  }));

  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: valuePosition === "right" ? "row" : "column",
      alignItems: valuePosition === "right" ? "center" : "flex-start",
      gap: valuePosition === "top" ? 4 : 8,
    },
    trackContainer: {
      flex: valuePosition === "right" ? 1 : undefined,
      width: valuePosition === "right" ? undefined : "100%",
    },
    track: {
      height: sizeConfig.height,
      backgroundColor: theme.muted,
      borderRadius: rounded ? radius.full : 0,
      overflow: "hidden",
    },
    fill: {
      height: "100%",
      backgroundColor: getVariantColor(),
      borderRadius: rounded ? radius.full : 0,
    },
    indeterminateFill: {
      position: "absolute",
      height: "100%",
      backgroundColor: getVariantColor(),
      borderRadius: rounded ? radius.full : 0,
    },
    valueText: {
      fontSize: sizeConfig.fontSize,
      minWidth: 36,
      textAlign: valuePosition === "right" ? "right" : "left",
    },
    valueInside: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  const renderValue = () => {
    if (!showValue || indeterminate) return null;

    const valueText = `${Math.round(percentage)}%`;

    if (valuePosition === "inside" && size === "lg") {
      return (
        <View style={styles.valueInside}>
          <AppText
            variant="caption"
            style={[styles.valueText, { color: theme.primaryForeground }]}
          >
            {valueText}
          </AppText>
        </View>
      );
    }

    return (
      <AppText variant="caption" color="muted" style={styles.valueText}>
        {valueText}
      </AppText>
    );
  };

  return (
    <View style={styles.wrapper}>
      {valuePosition === "top" && renderValue()}
      <View style={styles.trackContainer}>
        <View style={styles.track}>
          {indeterminate ? (
            <Animated.View
              style={[styles.indeterminateFill, indeterminateStyle]}
            />
          ) : (
            <Animated.View style={[styles.fill, fillStyle]}>
              {valuePosition === "inside" && size === "lg" && renderValue()}
            </Animated.View>
          )}
        </View>
      </View>
      {valuePosition === "right" && renderValue()}
    </View>
  );
}

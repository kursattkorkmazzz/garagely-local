import { useTheme } from "@/theme/theme-context";
import { radius } from "@/theme/tokens/radius";
import { useEffect } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type AppSkeletonProps = {
  style?: StyleProp<ViewStyle>;
};

export function AppSkeleton({ style }: AppSkeletonProps) {
  const { theme } = useTheme();
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [shimmer]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [0.4, 1]),
  }));

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { backgroundColor: theme.muted },
        animatedStyle,
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    borderRadius: radius.md,
  },
});

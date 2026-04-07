import { View, StyleSheet } from "react-native";
import { AppText } from "../../app-text";

type HeaderTitleRowProps = {
  /** Main title text */
  title: string;
  /** Optional right action (icon button, etc.) */
  RightAction?: React.ReactNode;
};

export function HeaderTitleRow({ title, RightAction }: HeaderTitleRowProps) {
  return (
    <View style={styles.container}>
      <AppText variant="heading1">{title}</AppText>
      {RightAction}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

import { spacing } from "@/theme/tokens/spacing";
import { ReactNode } from "react";
import { FlatList, FlatListProps, StyleSheet, ViewStyle } from "react-native";

export type AppFlatListProps<T> = Omit<
  FlatListProps<T>,
  "data" | "renderItem" | "keyExtractor"
> & {
  /** List data */
  data: T[];
  /** Render function for each item */
  renderItem: (item: T, index: number) => ReactNode;
  /** Key extractor for items */
  keyExtractor?: (item: T, index: number) => string;
  /** Content container style */
  contentContainerStyle?: ViewStyle | ViewStyle[];
};

export function AppFlatList<T extends { id?: string }>({
  data,
  renderItem,
  keyExtractor,
  contentContainerStyle,
  ...props
}: AppFlatListProps<T>) {
  const defaultKeyExtractor = (item: T, index: number) => {
    return item.id ?? `item-${index}`;
  };

  return (
    <FlatList<T>
      data={data}
      keyExtractor={keyExtractor ?? defaultKeyExtractor}
      renderItem={({ item, index }) => <>{renderItem(item, index)}</>}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xl,
  },
});

import { spacing } from "@/theme/tokens/spacing";
import { ReactNode } from "react";
import {
  SectionList,
  SectionListProps,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { AppListGroup } from "./app-list-group";

export type ListSection<T> = {
  key: string;
  label: string;
  description?: string;
  data: T[];
};

type AppListProps<T> = Omit<
  SectionListProps<T, ListSection<T>>,
  "sections" | "renderItem" | "renderSectionHeader" | "keyExtractor"
> & {
  /** List sections with label, description and data */
  sections: ListSection<T>[];
  /** Render function for each item */
  renderItem: (item: T, index: number, section: ListSection<T>) => ReactNode;
  /** Key extractor for items */
  keyExtractor?: (item: T, index: number) => string;
  /** Content container style */
  contentContainerStyle?: ViewStyle | ViewStyle[];
};

export function AppList<T extends { id?: string }>({
  sections,
  renderItem,
  keyExtractor,
  contentContainerStyle,
  ...props
}: AppListProps<T>) {
  const defaultKeyExtractor = (item: T, index: number) => {
    return item.id ?? `item-${index}`;
  };

  return (
    <SectionList<T, ListSection<T>>
      sections={sections}
      keyExtractor={keyExtractor ?? defaultKeyExtractor}
      renderSectionHeader={({ section }) => (
        <AppListGroup label={section.label} description={section.description} />
      )}
      renderItem={({ item, index, section }) => (
        <>{renderItem(item, index, section)}</>
      )}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacing.xl,
  },
});

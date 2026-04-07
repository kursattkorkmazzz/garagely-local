import {
  ActionSheetOption,
  ActionSheetRef,
  AppActionSheet,
} from "@/components/ui/app-action-sheet";
import { ThemeTypes } from "@/constants";
import { useI18n } from "@/hooks";
import { useStore } from "@/store/store";
import React, { useImperativeHandle, useMemo, useState } from "react";

type ThemeActionSheetProps = {
  ref: React.Ref<ActionSheetRef>;
};

export function ThemeActionSheet(props: ThemeActionSheetProps) {
  const [visible, setVisible] = useState(false);
  const { t: tTheme } = useI18n("theme");
  const { t: tSettings } = useI18n("settings");

  useImperativeHandle(
    props.ref,
    () => ({
      show: () => setVisible(true),
      close: () => setVisible(false),
    }),
    [setVisible],
  );

  const setTheme = useStore((state) => state.preferences.setTheme);

  const themeOptions: ActionSheetOption[] = useMemo(
    () => [
      {
        label: tTheme(ThemeTypes.LIGHT) as string,
        onPress: () => setTheme(ThemeTypes.LIGHT),
      },
      {
        label: tTheme(ThemeTypes.DARK) as string,
        onPress: () => setTheme(ThemeTypes.DARK),
      },
      {
        label: tTheme(ThemeTypes.SYSTEM) as string,
        onPress: () => setTheme(ThemeTypes.SYSTEM),
      },
    ],
    [tTheme, setTheme],
  );

  const onCloseHandler = () => {
    setVisible(false);
  };

  return (
    <AppActionSheet
      options={themeOptions}
      onClose={onCloseHandler}
      visible={visible}
      title={tSettings("actions.selectTheme") as string}
    />
  );
}

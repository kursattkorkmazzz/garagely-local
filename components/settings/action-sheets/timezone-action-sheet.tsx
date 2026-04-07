import {
  ActionSheetOption,
  ActionSheetRef,
  AppActionSheet,
} from "@/components/ui/app-action-sheet";
import { Timezones, Timezone } from "@/constants";
import { useI18n } from "@/hooks";
import { useStore } from "@/store/store";
import { TimeUtils } from "@/utils";
import React, { useImperativeHandle, useMemo, useState } from "react";

type TimezoneActionSheetProps = {
  ref: React.Ref<ActionSheetRef>;
};

export function TimezoneActionSheet(props: TimezoneActionSheetProps) {
  const [visible, setVisible] = useState(false);
  const { t: tSettings } = useI18n("settings");

  useImperativeHandle(
    props.ref,
    () => ({
      show: () => setVisible(true),
      close: () => setVisible(false),
    }),
    [setVisible],
  );

  const setTimezone = useStore((state) => state.preferences.setTimezone);

  const timezoneOptions: ActionSheetOption[] = useMemo(
    () =>
      Object.keys(Timezones).map((tz) => ({
        label: TimeUtils.getTimezoneLabelFromTimezone(tz as Timezone),
        onPress: () => setTimezone(tz as Timezone),
      })),
    [setTimezone],
  );

  const onCloseHandler = () => {
    setVisible(false);
  };

  return (
    <AppActionSheet
      options={timezoneOptions}
      onClose={onCloseHandler}
      visible={visible}
      title={tSettings("actions.selectTimezone") as string}
      searchable={true}
      searchPlaceholder={tSettings("actions.searchTimezone") as string}
    />
  );
}

import {
  ActionSheetOption,
  ActionSheetRef,
  AppActionSheet,
} from "@/components/ui/app-action-sheet";
import { VolumeUnits } from "@/constants";
import { useI18n } from "@/hooks";
import { useStore } from "@/store/store";
import React, { useImperativeHandle, useMemo, useState } from "react";

type VolumeActionSheetProps = {
  ref: React.Ref<ActionSheetRef>;
};

export function VolumeActionSheet(props: VolumeActionSheetProps) {
  const [visible, setVisible] = useState(false);
  const { t: tVolume } = useI18n("volume");
  const { t: tSettings } = useI18n("settings");

  useImperativeHandle(
    props.ref,
    () => ({
      show: () => setVisible(true),
      close: () => setVisible(false),
    }),
    [setVisible],
  );

  const setVolume = useStore((state) => state.preferences.setVolume);

  const volumeOptions: ActionSheetOption[] = useMemo(
    () =>
      Object.values(VolumeUnits).map((volume) => ({
        label: tVolume(`${volume}.long`) as string,
        onPress: () => setVolume(volume),
      })),
    [tVolume, setVolume],
  );

  const onCloseHandler = () => {
    setVisible(false);
  };

  return (
    <AppActionSheet
      options={volumeOptions}
      onClose={onCloseHandler}
      visible={visible}
      title={tSettings("actions.selectVolume") as string}
    />
  );
}

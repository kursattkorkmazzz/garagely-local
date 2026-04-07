import {
  ActionSheetOption,
  ActionSheetRef,
  AppActionSheet,
} from "@/components/ui/app-action-sheet";
import { DistanceUnits } from "@/constants";
import { useI18n } from "@/hooks";
import { useStore } from "@/store/store";
import React, { useImperativeHandle, useMemo, useState } from "react";

type DistanceActionSheetProps = {
  ref: React.Ref<ActionSheetRef>;
};

export function DistanceActionSheet(props: DistanceActionSheetProps) {
  const [visible, setVisible] = useState(false);
  const { t: tDistance } = useI18n("distance");
  const { t: tSettings } = useI18n("settings");

  useImperativeHandle(
    props.ref,
    () => ({
      show: () => setVisible(true),
      close: () => setVisible(false),
    }),
    [setVisible],
  );

  const setDistance = useStore((state) => state.preferences.setDistance);

  const distanceOptions: ActionSheetOption[] = useMemo(
    () =>
      Object.values(DistanceUnits).map((distance) => ({
        label: tDistance(`${distance}.long`) as string,
        onPress: () => setDistance(distance),
      })),
    [tDistance, setDistance],
  );

  const onCloseHandler = () => {
    setVisible(false);
  };

  return (
    <AppActionSheet
      options={distanceOptions}
      onClose={onCloseHandler}
      visible={visible}
      title={tSettings("actions.selectDistance") as string}
    />
  );
}

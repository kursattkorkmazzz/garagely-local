import {
  ActionSheetOption,
  ActionSheetRef,
  AppActionSheet,
} from "@/components/ui/app-action-sheet";
import { Currencies } from "@/constants";
import { useI18n } from "@/hooks";
import { useStore } from "@/store/store";
import React, { useImperativeHandle, useMemo, useState } from "react";

type CurrencyActionSheetProps = {
  ref: React.Ref<ActionSheetRef>;
};

export function CurrencyActionSheet(props: CurrencyActionSheetProps) {
  const [visible, setVisible] = useState(false);
  const { t: tCurrency } = useI18n("currency");
  const { t: tSettings } = useI18n("settings");

  useImperativeHandle(
    props.ref,
    () => ({
      show: () => setVisible(true),
      close: () => setVisible(false),
    }),
    [setVisible],
  );

  const setCurrency = useStore((state) => state.preferences.setCurrency);

  const currencyOptions: ActionSheetOption[] = useMemo(
    () =>
      Object.values(Currencies).map((currency) => ({
        label: tCurrency(`${currency}.long`) as string,
        onPress: () => setCurrency(currency),
      })),
    [tCurrency, setCurrency],
  );

  const onCloseHandler = () => {
    setVisible(false);
  };

  return (
    <AppActionSheet
      options={currencyOptions}
      onClose={onCloseHandler}
      visible={visible}
      title={tSettings("actions.selectCurrency") as string}
    />
  );
}

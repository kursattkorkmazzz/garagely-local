import {
  ActionSheetOption,
  ActionSheetRef,
  AppActionSheet,
} from "@/components/ui/app-action-sheet";
import { Languages } from "@/constants";
import { useI18n } from "@/hooks";
import { useStore } from "@/store/store";
import React, { useImperativeHandle } from "react";

type LanguageActionSheetProps = {
  ref: React.Ref<ActionSheetRef>;
};

export function LanguageActionSheet(props: LanguageActionSheetProps) {
  const [visible, setVisible] = React.useState(false);
  const { t: tLang } = useI18n("language");
  const { t: tSettings } = useI18n("settings");

  useImperativeHandle(
    props.ref,
    () => {
      return {
        show: () => setVisible(true),
        close: () => setVisible(false),
      };
    },
    [setVisible],
  );

  const setLanguage = useStore((state) => state.preferences.setLanguage);

  const languageOptions: ActionSheetOption[] = React.useMemo(
    () => [
      {
        label: tLang(Languages.EN) as string,
        onPress: () => setLanguage(Languages.EN),
      },
      {
        label: tLang(Languages.TR) as string,
        onPress: () => setLanguage(Languages.TR),
      },
    ],
    [tLang, setLanguage],
  );

  const onCloseHandler = () => {
    setVisible(false);
  };

  return (
    <AppActionSheet
      options={languageOptions}
      onClose={onCloseHandler}
      visible={visible}
      title={tSettings("actions.selectLanguage")}
    />
  );
}

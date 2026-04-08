import { AppText } from "@/components/ui/app-text";
import { AppView } from "@/components/ui/app-view";
import { useI18n } from "@/hooks";
import { radius } from "@/theme/tokens/radius";
import { spacing } from "@/theme/tokens/spacing";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";

export function GarageListHero() {
  const { t: tGarage } = useI18n("garage");

  return (
    <AppView>
      <Image
        source={require("@/assets/images/garage-hero.jpg")}
        style={styles.heroImage}
        contentFit="cover"
        contentPosition={"center"}
      />
      <AppText
        variant="bodyMedium"
        color="muted"
        style={styles.heroDescription}
      >
        {tGarage("hero.description")}
      </AppText>
    </AppView>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    width: "100%",
    height: 180,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
  },
  heroDescription: {
    textAlign: "center",
  },
});

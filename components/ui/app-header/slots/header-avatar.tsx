import {
  AppAvatar,
  AppAvatarFallback,
  AppAvatarImage,
} from "@/components/ui/app-avatar";
import { AppButton } from "../../app-button";

type HeaderAvatarProps = {
  /** Avatar image URL */
  avatarUrl?: string | null;
  /** User's full name for fallback */
  fallbackText?: string | null;
  /** Custom press handler */
  onPress?: () => void;
};

export function HeaderAvatar({
  avatarUrl,
  fallbackText,
  onPress,
}: HeaderAvatarProps) {
  return (
    <AppButton variant="ghost" size="icon" onPress={onPress}>
      <AppAvatar size="sm">
        <AppAvatarImage src={avatarUrl ?? ""} alt={fallbackText ?? undefined} />
        <AppAvatarFallback fallbackText={fallbackText} />
      </AppAvatar>
    </AppButton>
  );
}

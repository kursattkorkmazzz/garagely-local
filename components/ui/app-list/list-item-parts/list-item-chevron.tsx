import { AppIcon } from "../../app-icon";
import { useTheme } from "@/theme";

type ListItemChevronProps = {
  /** Chevron color (defaults to theme.mutedForeground) */
  color?: string;
  /** Chevron size (defaults to 20) */
  size?: number;
};

export function ListItemChevron({ color, size = 20 }: ListItemChevronProps) {
  const { theme } = useTheme();

  return (
    <AppIcon
      icon="ChevronRight"
      size={size}
      color={color ?? theme.mutedForeground}
    />
  );
}

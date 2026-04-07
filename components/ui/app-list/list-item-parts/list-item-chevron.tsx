import { useTheme } from "@/theme/theme-context";
import { AppIcon } from "../../app-icon";

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

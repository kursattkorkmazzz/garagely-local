import { AppHeader } from "../app-header";
import { HeaderBackButton } from "../slots/header-back-button";
import { HeaderTitle } from "../slots/header-title";

type StackHeaderOptions = {
  title: string;
  description?: string;
  rightActions?: React.ReactNode;
};

/**
 * Creates a stack screen header with a back button, title/description, and optional right actions.
 * Use with Stack.Screen options.header.
 *
 * @example
 * // Static actions in _layout.tsx
 * <Stack.Screen
 *   name="vehicle/index"
 *   options={{
 *     header: presentStackHeader({
 *       title: "Araçlarım",
 *       description: "Tüm araçlarını yönet",
 *       rightActions: <HeaderIconButton icon="Plus" onPress={handleAdd} />,
 *     }),
 *   }}
 * />
 *
 * @example
 * // Dynamic actions from within a screen
 * useEffect(() => {
 *   navigation.setOptions({
 *     header: presentStackHeader({
 *       title: vehicle.name,
 *       description: `${vehicle.year} • ${vehicle.brand}`,
 *       rightActions: (
 *         <>
 *           <HeaderIconButton icon="Pencil" onPress={handleEdit} />
 *           <HeaderIconButton icon="Trash2" onPress={handleDelete} />
 *         </>
 *       ),
 *     }),
 *   });
 * }, [vehicle]);
 */
export function presentStackHeader(options: StackHeaderOptions) {
  const { title, description, rightActions } = options;

  return function StackHeader() {
    return (
      <AppHeader
        LeftSlot={<HeaderBackButton />}
        CenterSlot={<HeaderTitle title={title} subtitle={description} align="left" />}
        RightSlot={rightActions ?? undefined}
      />
    );
  };
}

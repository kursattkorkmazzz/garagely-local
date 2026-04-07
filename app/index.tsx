import { AppSelect } from "@/components/ui/app-select/app-select";
import { View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AppSelect
        options={[
          {
            type: "item",
            key: "i1",
            label: "Item 1",
          },
          {
            type: "item",
            key: "i2",
            label: "Item 2",
          },
          {
            type: "group",
            key: "g1",
            label: "Group 1",
            options: [
              {
                type: "item",
                key: "i3",
                label: "Item 3",
              },
              {
                type: "item",
                key: "i4",
                label: "Item 4",
              },
            ],
          },
        ]}
      />
    </View>
  );
}

import { AppFlatList } from "@/components/ui/app-flat-list";
import {
  AppListItem,
  ListItemContent,
  ListItemValueChevron,
} from "@/components/ui/app-list";
import { ListItemImage } from "@/components/ui/app-list/list-item-parts/list-item-image";
import { useState } from "react";

type VehicleListItem = {
  id: string;
  iconImage: string | undefined;
  brand: string;
  model: string;
  year: number;
  plate: string;
};

export default function VehicleList() {
  const [vehicleList, setVehicleList] = useState<VehicleListItem[]>([
    {
      id: "1",
      brand: "Mitsubishi",
      model: "Carisma Avence",
      year: 2002,
      plate: "06 DJR 415",
      iconImage: "https://picsum.photos/id/1036/100/100",
    },
  ]);

  const handleVehiclePress = (item: VehicleListItem) => {
    console.log("Clicked: ", item);
  };

  return (
    <AppFlatList
      data={vehicleList}
      renderItem={(item) => (
        <AppListItem
          LeftSlot={
            <ListItemImage
              source={{
                uri: item.iconImage,
              }}
            />
          }
          MiddleSlot={
            <ListItemContent
              title={`${item.brand} ${item.model}`}
              subtitle={`${item.year}`}
            />
          }
          RightSlot={<ListItemValueChevron value={item.plate} />}
          onPress={() => {
            handleVehiclePress(item);
          }}
        />
      )}
    />
  );
}

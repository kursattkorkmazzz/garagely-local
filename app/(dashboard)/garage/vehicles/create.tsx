import {
  VehicleForm,
  VehicleFormProvider,
  VehicleFormValues,
} from "@/components/vehicle/forms";
import { Timezones } from "@/constants";
import { VehicleService } from "@/features/vehicle";
import { useRouter } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

export default function CreateVehicleScreen() {
  const router = useRouter();

  const handleSubmit = async (values: VehicleFormValues) => {
    try {
      await VehicleService.addVehicle({
        brand: values.brand,
        model: values.model,
        year: values.year,
        plate: values.plate,
        color: values.color,
        vin: values.vin,
        coverImageId: values.coverImageId,
        fuelType: values.fuelType,
        bodyType: values.bodyType,
        transmissionType: values.transmissionType,
        purchaseDate: values.purchaseDate
          ? {
              date: values.purchaseDate,
              timezone: Timezones["Europe/Istanbul"],
            }
          : undefined,
        purchasePrice: values.purchasePrice
          ? {
              amount: values.purchasePrice,
              currency: values.purchaseCurrency || "USD",
            }
          : undefined,
        purchaseOdometer: values.purchaseOdometer
          ? {
              amount: values.purchaseOdometer,
              unit: values.purchaseOdometerUnit || "km",
            }
          : undefined,
      });

      Toast.show({
        type: "success",
        text1: "Vehicle added successfully",
      });

      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to add vehicle",
      });
    }
  };

  return (
    <VehicleFormProvider onSubmit={handleSubmit}>
      <VehicleForm />
    </VehicleFormProvider>
  );
}

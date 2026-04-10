import {
  VehicleForm,
  VehicleFormProvider,
  VehicleFormValues,
} from "@/components/vehicle/forms";
import { useRouter } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

export default function CreateVehicleScreen() {
  const router = useRouter();

  const handleSubmit = async (values: VehicleFormValues) => {
    try {
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

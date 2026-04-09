import { MoneyRecord, DateRecord, DistanceRecord } from "@/features/common";
import { BodyType, FuelType, TransmissionType } from "@/features/vehicle/constants";

export type VehicleEntity = {
  id: string;
  brand: string;
  model: string;
  year: number;
  plate: string;
  color: string | null;
  vin: string | null;

  coverImageId: string | null;

  fuelType: FuelType | null;
  bodyType: BodyType | null;
  transmissionType: TransmissionType | null;

  purchaseDateId: string | null;
  purchasePriceId: string | null;
  purchaseOdometerId: string | null;

  created_at: Date;
  updated_at: Date | null;
};

export type VehicleWithDetails = VehicleEntity & {
  purchaseDate: DateRecord | null;
  purchasePrice: MoneyRecord | null;
  purchaseOdometer: DistanceRecord | null;
};

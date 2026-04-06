import type { Currency, DistanceUnit } from "@/constants";

export type FuelType = "gasoline" | "diesel" | "electric" | "hybrid" | "lpg";

export type TransmissionType = "manual" | "automatic" | "cvt";

export type BodyType =
  | "sedan"
  | "hatchback"
  | "suv"
  | "coupe"
  | "pickup"
  | "van"
  | "wagon"
  | "convertible";

export interface Money {
  amount: number;
  currency: Currency;
}

export interface Distance {
  value: number;
  unit: DistanceUnit;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string | null;
  plate: string;
  vin: string | null;
  fuelType: FuelType | null;
  transmissionType: TransmissionType | null;
  bodyType: BodyType | null;
  purchaseDate: string | null;
  purchasePrice: Money | null;
  purchaseDistance: Distance | null;
  coverImageId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVehiclePayload {
  brand: string;
  model: string;
  year: number;
  color?: string | null;
  plate: string;
  vin?: string | null;
  fuelType?: FuelType | null;
  transmissionType?: TransmissionType | null;
  bodyType?: BodyType | null;
  purchaseDate?: string | null;
  purchasePrice?: Money | null;
  purchaseDistance?: Distance | null;
}

export interface UpdateVehiclePayload extends Partial<CreateVehiclePayload> {
  coverImageId?: string | null;
}

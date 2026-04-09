import { DateDto, DistanceDto, MoneyDto } from "@/constants";
import { BodyType, FuelType, TransmissionType } from "@/features/vehicle/constants";

export type CreateVehicleParams = {
  coverImageId?: string;

  brand: string;
  model: string;
  year: number;
  plate: string;
  color?: string;
  vin?: string;

  fuelType?: FuelType;
  bodyType?: BodyType;
  transmissionType?: TransmissionType;

  purchaseDate?: DateDto;
  purchasePrice?: MoneyDto;
  purchaseOdometer?: DistanceDto;
};

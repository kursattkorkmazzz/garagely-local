import {
  DateDtoValidator,
  DistanceDtoValidator,
  MoneyDtoValidator,
} from "@/constants";
import {
  BodyTypes,
  FuelTypes,
  TransmissionTypes,
} from "@/features/vehicle/constants";
import z from "zod";

export const CreateVehicleDtoValidator = z.object({
  coverImageId: z.string().optional(),

  brand: z.string().nonempty().max(30),
  model: z.string().nonempty().max(30),
  year: z
    .number()
    .int()
    .min(1886)
    .max(new Date().getFullYear() + 1),
  plate: z.string().nonempty(),
  color: z.string().optional(),
  vin: z.string().optional(),

  // Specifications
  fuelType: z.enum(FuelTypes).optional(),
  bodyType: z.enum(BodyTypes).optional(),
  transmissionType: z.enum(TransmissionTypes).optional(),

  // Purchase Information
  purchaseDate: DateDtoValidator.optional(),
  purchasePrice: MoneyDtoValidator.optional(),
  purchaseOdometer: DistanceDtoValidator.optional(),
});

export type CreateVehicleDto = z.infer<typeof CreateVehicleDtoValidator>;

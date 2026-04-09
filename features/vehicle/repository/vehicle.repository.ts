import { PaginatedResult, PaginationParams } from "@/features/common";
import { VehicleEntity } from "@/features/vehicle/entity/vehicle.entity";

import { CreateVehicleParams } from "./params";

export abstract class VehicleRepository {
  abstract save(data: CreateVehicleParams): Promise<VehicleEntity>;
  abstract findById(id: string): Promise<VehicleEntity | null>;
  abstract findAll(params?: PaginationParams): Promise<PaginatedResult<VehicleEntity>>;
  abstract delete(id: string): Promise<void>;
}

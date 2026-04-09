import { CreateVehicleDto } from "@/features/vehicle/dto/create-vehicle.dto";
import { VehicleEntity } from "@/features/vehicle/entity/vehicle.entity";

export abstract class VehicleRepository {
  abstract save(data: CreateVehicleDto): Promise<VehicleEntity>;
  abstract findById(id: string): Promise<VehicleEntity | null>;
  abstract findAll(): Promise<VehicleEntity[]>;
  abstract delete(id: string): Promise<void>;
}

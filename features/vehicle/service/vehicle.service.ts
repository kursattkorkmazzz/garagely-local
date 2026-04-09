import {
  CreateVehicleDto,
  CreateVehicleDtoValidator,
} from "@/features/vehicle/dto/create-vehicle.dto";
import { VehicleEntity } from "@/features/vehicle/entity/vehicle.entity";
import { SqliteVehicleRepository } from "@/features/vehicle/repository/sqlite-vehicle.repository";
import { VehicleRepository } from "@/features/vehicle/repository/vehicle.repository";

export class VehicleService {
  private static vehicleRepository: VehicleRepository =
    new SqliteVehicleRepository();

  static async addVehicle(data: CreateVehicleDto): Promise<VehicleEntity> {
    const validatedData = CreateVehicleDtoValidator.parse(data);
    return this.vehicleRepository.save(validatedData);
  }

  static async getVehicle(id: string): Promise<VehicleEntity | null> {
    return this.vehicleRepository.findById(id);
  }

  static async getAllVehicles(): Promise<VehicleEntity[]> {
    return this.vehicleRepository.findAll();
  }

  static async deleteVehicle(id: string): Promise<void> {
    return this.vehicleRepository.delete(id);
  }
}

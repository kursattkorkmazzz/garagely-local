import { AssetRepository } from "@/features/asset/repository/asset.repository";
import {
  CreateVehicleDto,
  CreateVehicleDtoValidator,
} from "@/features/vehicle/dto/create-vehicle.dto";

export class VehicleService {
  static assetRepository = new AssetRepository();

  static async addVehicle(data: CreateVehicleDto) {
    const validatedData = CreateVehicleDtoValidator.parse(data);
  }
}

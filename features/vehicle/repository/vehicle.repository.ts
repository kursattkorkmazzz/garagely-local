import { getGaragelyDatabase } from "@/db";
import { VehicleSchema } from "@/db/schemas/vehicle.schema";
import { AssetRepository } from "@/features/asset/repository/asset.repository";
import { CreateVehicleDto } from "@/features/vehicle/dto/create-vehicle.dto";
import { GeneralErrorCodes } from "@/utils/error/error-codes";
import { GaragelyError } from "@/utils/error/garagely-error";

export class VehicleRepository {
  static async addVehicle(data: CreateVehicleDto) {
    const createdVehicle = await getGaragelyDatabase().transaction(
      async (tx) => {
        // 1. Create Vehicle Object
        const vehicle = tx.insert(VehicleSchema).values({
          brand: data.brand,
          model: data.model,
          year: data.year,
          coverImageId: data.coverImageId,
          plate: data.plate,
        });

        // 2. Create Money Object

        // 3. Create Date Object

        // 4. Create Distance Object

        // 5. Check the Cover Image Asset exist in the storage, if yes, set the ImageId if not throw an error

        if (data.coverImageId) {
          const isAssetExist = await AssetRepository.isAssetExist(
            data.coverImageId,
          );
          if (!isAssetExist) {
            throw new GaragelyError(GeneralErrorCodes.UNKNOWN_ERROR);
          }
        }

        // 6. Save Vehicle Object to Database and Return it.
      },
    );
  }
}

import { getGaragelyDatabase } from "@/db";
import { DateSchema } from "@/db/schemas/commons/date.schema";
import { DistanceSchema } from "@/db/schemas/commons/distance.schema";
import { MoneySchema } from "@/db/schemas/commons/money.schema";
import { VehicleSchema } from "@/db/schemas/vehicle.schema";
import { AssetService } from "@/features/asset";
import { CreateVehicleDto } from "@/features/vehicle/dto/create-vehicle.dto";
import { VehicleEntity } from "@/features/vehicle/entity/vehicle.entity";
import { VehicleErrorCodes } from "@/utils/error/error-codes";
import { GaragelyError } from "@/utils/error/garagely-error";
import { eq } from "drizzle-orm";

import { VehicleRepository } from "./vehicle.repository";

export class SqliteVehicleRepository extends VehicleRepository {
  async save(data: CreateVehicleDto): Promise<VehicleEntity> {
    const db = getGaragelyDatabase();

    const result = await db.transaction(async (tx) => {
      let purchasePriceId: string | null = null;
      let purchaseDateId: string | null = null;
      let purchaseOdometerId: string | null = null;

      // 1. Create Money record if purchase price provided
      if (data.purchasePrice) {
        const moneyResult = await tx
          .insert(MoneySchema)
          .values({
            amount: data.purchasePrice.amount,
            currency: data.purchasePrice.currency,
          })
          .returning({ id: MoneySchema.id });
        purchasePriceId = moneyResult[0].id;
      }

      // 2. Create Date record if purchase date provided
      if (data.purchaseDate) {
        const dateResult = await tx
          .insert(DateSchema)
          .values({
            date: new Date(data.purchaseDate.date),
            timezone: data.purchaseDate.timezone,
          })
          .returning({ id: DateSchema.id });
        purchaseDateId = dateResult[0].id;
      }

      // 3. Create Distance record if purchase odometer provided
      if (data.purchaseOdometer) {
        const distanceResult = await tx
          .insert(DistanceSchema)
          .values({
            amount: data.purchaseOdometer.amount,
            unit: data.purchaseOdometer.unit,
          })
          .returning({ id: DistanceSchema.id });
        purchaseOdometerId = distanceResult[0].id;
      }

      // 4. Validate cover image exists if provided
      if (data.coverImageId) {
        const assetExists = await AssetService.assetExists(data.coverImageId);
        if (!assetExists) {
          throw new GaragelyError(VehicleErrorCodes.COVER_IMAGE_NOT_FOUND);
        }
      }

      // 5. Create Vehicle record
      const vehicleResult = await tx
        .insert(VehicleSchema)
        .values({
          brand: data.brand,
          model: data.model,
          year: data.year,
          plate: data.plate,
          color: data.color,
          vin: data.vin,
          coverImageId: data.coverImageId,
          fuelType: data.fuelType,
          bodyType: data.bodyType,
          transmissionType: data.transmissiontype,
          purchasePriceId,
          purchaseDateId,
          purchaseOdometerId,
        })
        .returning();

      return vehicleResult[0];
    });

    return this.mapToEntity(result);
  }

  async findById(id: string): Promise<VehicleEntity | null> {
    const db = getGaragelyDatabase();

    const result = await db
      .select()
      .from(VehicleSchema)
      .where(eq(VehicleSchema.id, id))
      .limit(1);

    if (result.length === 0) {
      return null;
    }

    return this.mapToEntity(result[0]);
  }

  async findAll(): Promise<VehicleEntity[]> {
    const db = getGaragelyDatabase();

    const result = await db.select().from(VehicleSchema);

    return result.map((row) => this.mapToEntity(row));
  }

  async delete(id: string): Promise<void> {
    const db = getGaragelyDatabase();

    await db.delete(VehicleSchema).where(eq(VehicleSchema.id, id));
  }

  private mapToEntity(row: typeof VehicleSchema.$inferSelect): VehicleEntity {
    return {
      id: row.id,
      brand: row.brand,
      model: row.model,
      year: row.year,
      plate: row.plate,
      color: row.color,
      vin: row.vin,
      coverImageId: row.coverImageId,
      fuelType: row.fuelType as VehicleEntity["fuelType"],
      bodyType: row.bodyType as VehicleEntity["bodyType"],
      transmissionType: row.transmissionType as VehicleEntity["transmissionType"],
      purchaseDateId: row.purchaseDateId,
      purchasePriceId: row.purchasePriceId,
      purchaseOdometerId: row.purchaseOdometerId,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }
}

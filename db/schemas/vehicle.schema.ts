import { BaseSchema } from "@/db/helpers/base.schema";
import { BodyTypes, FuelTypes, TransmissionTypes } from "@/features/vehicle";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const VehicleSchema = sqliteTable("vehicles", {
  ...BaseSchema,

  brand: text().notNull(),
  model: text().notNull(),
  year: integer().notNull(),
  plate: text().notNull(),
  color: text(),
  vin: text(),

  // Cover Image
  coverImageId: text(),

  // Specifications
  fuelType: text({
    enum: Object.values(FuelTypes) as [string, ...string[]],
  }),
  bodyType: text({
    enum: Object.values(BodyTypes) as [string, ...string[]],
  }),
  transmissionType: text({
    enum: Object.values(TransmissionTypes) as [string, ...string[]],
  }),

  // Purchase Information
  purchaseDateId: text(),
  purchasePriceId: text(),
  purchaseOdometerId: text(),
});

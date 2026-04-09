import { BaseSchema } from "@/db/helpers/base.schema";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Inline enums to avoid React Native imports in drizzle-kit
const FuelTypesEnum = ["gasoline", "diesel", "electric", "hybrid", "lpg"] as const;
const BodyTypesEnum = ["sedan", "hatchback", "suv", "coupe", "pickup", "van", "wagon", "convertible"] as const;
const TransmissionTypesEnum = ["manual", "automatic", "cvt"] as const;

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
    enum: FuelTypesEnum,
  }),
  bodyType: text({
    enum: BodyTypesEnum,
  }),
  transmissionType: text({
    enum: TransmissionTypesEnum,
  }),

  // Purchase Information
  purchaseDateId: text(),
  purchasePriceId: text(),
  purchaseOdometerId: text(),
});

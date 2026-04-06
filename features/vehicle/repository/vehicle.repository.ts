import { getDatabase } from "@/db";
import { v4 as uuid } from "uuid";
import type {
  CreateVehiclePayload,
  UpdateVehiclePayload,
  Vehicle,
} from "../types";

function rowToVehicle(row: Record<string, unknown>): Vehicle {
  return {
    id: row.id as string,
    brand: row.brand as string,
    model: row.model as string,
    year: row.year as number,
    color: row.color as string | null,
    plate: row.plate as string,
    vin: row.vin as string | null,
    fuelType: row.fuel_type as Vehicle["fuelType"],
    transmissionType: row.transmission_type as Vehicle["transmissionType"],
    bodyType: row.body_type as Vehicle["bodyType"],
    purchaseDate: row.purchase_date as string | null,
    purchasePrice:
      row.purchase_price_amount != null
        ? {
            amount: row.purchase_price_amount as number,
            currency:
              row.purchase_price_currency as Vehicle["purchasePrice"]["currency"],
          }
        : null,
    purchaseDistance:
      row.purchase_distance_value != null
        ? {
            value: row.purchase_distance_value as number,
            unit: row.purchase_distance_unit as Vehicle["purchaseDistance"]["unit"],
          }
        : null,
    coverImageId: row.cover_image_id as string | null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export const VehicleRepository = {
  async getAll(): Promise<Vehicle[]> {
    const db = await getDatabase();
    const rows = await db.getAllAsync(
      "SELECT * FROM vehicles ORDER BY created_at DESC",
    );
    return rows.map(rowToVehicle);
  },

  async getById(id: string): Promise<Vehicle | null> {
    const db = await getDatabase();
    const row = await db.getFirstAsync("SELECT * FROM vehicles WHERE id = ?", [
      id,
    ]);
    return row ? rowToVehicle(row as Record<string, unknown>) : null;
  },

  async create(payload: CreateVehiclePayload): Promise<Vehicle> {
    const db = await getDatabase();
    const id = uuid();
    const now = new Date().toISOString();

    await db.runAsync(
      `INSERT INTO vehicles (
        id, brand, model, year, color, plate, vin,
        fuel_type, transmission_type, body_type,
        purchase_date, purchase_price_amount, purchase_price_currency,
        purchase_distance_value, purchase_distance_unit,
        cover_image_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        payload.brand,
        payload.model,
        payload.year,
        payload.color ?? null,
        payload.plate,
        payload.vin ?? null,
        payload.fuelType ?? null,
        payload.transmissionType ?? null,
        payload.bodyType ?? null,
        payload.purchaseDate ?? null,
        payload.purchasePrice?.amount ?? null,
        payload.purchasePrice?.currency ?? null,
        payload.purchaseDistance?.value ?? null,
        payload.purchaseDistance?.unit ?? null,
        null,
        now,
        now,
      ],
    );

    return (await this.getById(id))!;
  },

  async update(id: string, payload: UpdateVehiclePayload): Promise<Vehicle> {
    const db = await getDatabase();
    const now = new Date().toISOString();
    const existing = await this.getById(id);
    if (!existing) throw new Error("Vehicle not found");

    const updates: string[] = [];
    const values: unknown[] = [];

    if (payload.brand !== undefined) {
      updates.push("brand = ?");
      values.push(payload.brand);
    }
    if (payload.model !== undefined) {
      updates.push("model = ?");
      values.push(payload.model);
    }
    if (payload.year !== undefined) {
      updates.push("year = ?");
      values.push(payload.year);
    }
    if (payload.color !== undefined) {
      updates.push("color = ?");
      values.push(payload.color);
    }
    if (payload.plate !== undefined) {
      updates.push("plate = ?");
      values.push(payload.plate);
    }
    if (payload.vin !== undefined) {
      updates.push("vin = ?");
      values.push(payload.vin);
    }
    if (payload.fuelType !== undefined) {
      updates.push("fuel_type = ?");
      values.push(payload.fuelType);
    }
    if (payload.transmissionType !== undefined) {
      updates.push("transmission_type = ?");
      values.push(payload.transmissionType);
    }
    if (payload.bodyType !== undefined) {
      updates.push("body_type = ?");
      values.push(payload.bodyType);
    }
    if (payload.purchaseDate !== undefined) {
      updates.push("purchase_date = ?");
      values.push(payload.purchaseDate);
    }
    if (payload.purchasePrice !== undefined) {
      updates.push("purchase_price_amount = ?");
      updates.push("purchase_price_currency = ?");
      values.push(payload.purchasePrice?.amount ?? null);
      values.push(payload.purchasePrice?.currency ?? null);
    }
    if (payload.purchaseDistance !== undefined) {
      updates.push("purchase_distance_value = ?");
      updates.push("purchase_distance_unit = ?");
      values.push(payload.purchaseDistance?.value ?? null);
      values.push(payload.purchaseDistance?.unit ?? null);
    }
    if (payload.coverImageId !== undefined) {
      updates.push("cover_image_id = ?");
      values.push(payload.coverImageId);
    }

    updates.push("updated_at = ?");
    values.push(now);
    values.push(id);

    await db.runAsync(
      `UPDATE vehicles SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );

    return (await this.getById(id))!;
  },

  async delete(id: string): Promise<void> {
    const db = await getDatabase();
    await db.runAsync("DELETE FROM vehicles WHERE id = ?", [id]);
  },
};

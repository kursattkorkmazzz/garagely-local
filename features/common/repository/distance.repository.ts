import { DistanceUnit } from "@/constants";

export type DistanceRecord = {
  id: string;
  amount: number;
  unit: DistanceUnit;
  created_at: Date;
  updated_at: Date | null;
};

export type CreateDistanceParams = {
  amount: number;
  unit: DistanceUnit;
};

export abstract class DistanceRepository {
  abstract save(params: CreateDistanceParams): Promise<DistanceRecord>;
  abstract findById(id: string): Promise<DistanceRecord | null>;
  abstract delete(id: string): Promise<void>;
}

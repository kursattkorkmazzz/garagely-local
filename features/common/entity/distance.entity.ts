import { DistanceUnit } from "@/constants";

export type DistanceEntity = {
  id: string;
  amount: number;
  unit: DistanceUnit;
  created_at: Date;
  updated_at: Date | null;
};

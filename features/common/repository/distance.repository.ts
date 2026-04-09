import { DistanceEntity } from "@/features/common/entity/distance.entity";

import { CreateDistanceParams } from "./params";

export abstract class DistanceRepository {
  abstract save(params: CreateDistanceParams): Promise<DistanceEntity>;
  abstract findById(id: string): Promise<DistanceEntity | null>;
  abstract delete(id: string): Promise<void>;
}

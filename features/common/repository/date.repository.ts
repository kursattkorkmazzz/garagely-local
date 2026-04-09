import { DateEntity } from "@/features/common/entity/date.entity";

import { CreateDateParams } from "./params";

export abstract class DateRepository {
  abstract save(params: CreateDateParams): Promise<DateEntity>;
  abstract findById(id: string): Promise<DateEntity | null>;
  abstract delete(id: string): Promise<void>;
}

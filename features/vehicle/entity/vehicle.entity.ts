import { BaseEntity } from "@/features/common/entity/base.entity";
import { Entity } from "typeorm";

@Entity({
  name: "vehicles",
})
export class VehicleEntity extends BaseEntity {}

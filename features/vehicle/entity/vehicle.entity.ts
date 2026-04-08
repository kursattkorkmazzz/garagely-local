import { BaseEntity } from "@/features/common/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
  name: "vehicles",
})
export class VehicleEntity extends BaseEntity {
  //TODO: Make it Relation!!
  @Column({
    nullable: true,
    default: null,
    type: "uuid",
  })
  coverImageAsset!: string | null;

  @Column("varchar", {
    nullable: false,
    length: 255,
  })
  brand!: string;
}

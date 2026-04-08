import { BaseEntity } from "@/features/common/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity("assets")
export class AssetEntity extends BaseEntity {
  @Column("string")
  path!: string;

  @Column("string")
  assetName!: string

  @Column({
    
  })
  assetType!:string
}

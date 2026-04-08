import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @CreateDateColumn({
    utc: true,
  })
  createdAt!: Date;

  @UpdateDateColumn({
    utc: true,
    nullable: true,
  })
  updatedAt!: Date | null;
}

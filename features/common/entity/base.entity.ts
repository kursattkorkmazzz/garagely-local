import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  abstract id: string;

  @CreateDateColumn({
    utc: true,
  })
  abstract createdAt: Date;

  @UpdateDateColumn({
    utc: true,
    nullable: true,
  })
  abstract updatedAt: Date | null;
}

import { luxonTransformer } from "@/database/transformers/luxon.transformer";
import { DateTime } from "luxon";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

@Entity("evaluation_systems")
export class EvaluationSystem {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({
    name: "system_name",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  systemName: string;

  @Column({ type: "boolean", nullable: false })
  qualitative: boolean;

  @Column({ name: "min_value", type: "int", nullable: false })
  minValue: number;

  @Column({ name: "max_value", type: "int", nullable: false })
  maxValue: number;

  @Column({
    name: "created_at",
    type: "timestamp",
    nullable: false,
    transformer: luxonTransformer,
  })
  createdAt: DateTime;

  @Column({
    name: "updated_at",
    type: "timestamp",
    nullable: false,
    transformer: luxonTransformer,
  })
  updatedAt: DateTime;

  @BeforeInsert()
  setCreationDate() {
    this.createdAt = DateTime.now();
    this.updatedAt = DateTime.now();
  }

  @BeforeUpdate()
  setUpdateDate() {
    this.updatedAt = DateTime.now();
  }
}

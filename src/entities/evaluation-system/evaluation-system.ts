import { luxonTransformer } from "@/database/transformers/luxon.transformer";
import { DateTime } from "luxon";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
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

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    transformer: luxonTransformer,
  })
  createdAt: DateTime;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    transformer: luxonTransformer,
  })
  updatedAt: DateTime;
}

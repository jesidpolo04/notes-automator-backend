import { luxonTransformer } from "@/database/transformers/luxon.transformer";
import { DateTime } from "luxon";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { EvaluationSystem } from "@/entities/evaluation-system/evaluation-system";

@Entity("qualitative_labels")
export class QualitativeLabel {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  label: string;

  @ManyToOne(() => EvaluationSystem)
  @JoinColumn({ name: "evaluation_system_id" })
  evaluationSystem: EvaluationSystem;

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

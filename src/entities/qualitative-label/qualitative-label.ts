import { luxonTransformer } from "@/database/transformers/luxon.transformer";
import { DateTime } from "luxon";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
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

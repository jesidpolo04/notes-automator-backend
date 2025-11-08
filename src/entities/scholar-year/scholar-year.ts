import { luxonTransformer } from "@/database/transformers/luxon.transformer";
import { DateTime } from "luxon";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";

@Entity("scholar_years")
export class ScholarYear {
  @PrimaryColumn({ type: "int" })
  id: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  year: string; // Can be represented as 2023, 2024, etc. or as "2023-2024"

  @Column({ type: "varchar", length: 255, nullable: false })
  description: string;

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

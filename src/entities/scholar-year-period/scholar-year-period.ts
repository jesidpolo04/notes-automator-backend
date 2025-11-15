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
import { ScholarYear } from "@/entities/scholar-year/scholar-year";

@Entity("scholar_year_periods")
export class ScholarYearPeriod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  description: string;

  @ManyToOne(() => ScholarYear)
  @JoinColumn({ name: "scholar_year" })
  scholarYear: ScholarYear;

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

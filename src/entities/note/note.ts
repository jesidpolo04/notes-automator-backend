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
import { Course } from "@/entities/course/course";
import { ScholarYearPeriod } from "@/entities/scholar-year-period/scholar-year-period";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  description: string;

  @ManyToOne(() => Course)
  @JoinColumn({ name: "course_id" })
  course: Course;

  @ManyToOne(() => ScholarYearPeriod)
  @JoinColumn({ name: "scholar_year_period_id" })
  scholarYearPeriod: ScholarYearPeriod;

  @Column({
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: false,
    default: 1,
  })
  weight: number;

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

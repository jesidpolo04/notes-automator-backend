import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Teacher } from "../teacher/teacher";
import { ScholarYear } from "../scholar-year/scholar-year";
import { luxonTransformer } from "@/database/transformers/luxon.transformer";
import { DateTime } from "luxon";

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ name: "course_name", type: "varchar", length: 255 })
  courseName: string;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: "teacher_id" })
  teacher: Teacher;

  @ManyToOne(() => ScholarYear)
  @JoinColumn({ name: "scholar_year" })
  scholarYear: ScholarYear;

  @CreateDateColumn({ name: "created_at", transformer: luxonTransformer })
  createdAt: DateTime;

  @UpdateDateColumn({ name: "updated_at", transformer: luxonTransformer })
  updatedAt: DateTime;
}

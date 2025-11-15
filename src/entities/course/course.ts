import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
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

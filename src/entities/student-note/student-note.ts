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
import { Student } from "@/entities/student/student";
import { Note } from "@/entities/note/note";
import { QualitativeLabel } from "@/entities/qualitative-label/qualitative-label";

@Entity("student_notes")
export class StudentNote {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @ManyToOne(() => Student)
  @JoinColumn({ name: "student_id" })
  student: Student;

  @ManyToOne(() => Note)
  @JoinColumn({ name: "note_id" })
  note: Note;

  @ManyToOne(() => QualitativeLabel, { nullable: true })
  @JoinColumn({ name: "qualitative_value_id" })
  qualitativeValue?: QualitativeLabel;

  @Column({ name: "numeric_value", type: "int", nullable: true })
  numericValue?: number;

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

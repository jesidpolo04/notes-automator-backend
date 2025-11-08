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
import { Course } from "@/entities/course/course";

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn({ type: "int", unsigned: true })
  id: number;

  @Column({ name: "first_name", type: "varchar", length: 100, nullable: false })
  firstName: string;

  @Column({
    name: "second_name",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  secondName: string | null;

  @Column({ name: "last_name", type: "varchar", length: 100, nullable: false })
  lastName: string;

  @Column({
    name: "second_last_name",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  secondLastName: string | null;

  @Column({
    name: "is_retired",
    type: "boolean",
    default: false,
    nullable: false,
  })
  isRetired: boolean;

  @ManyToOne(() => Course)
  @JoinColumn({ name: "course_id" })
  course: Course;

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

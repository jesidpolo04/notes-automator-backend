import { luxonTransformer } from "@/database/transformers/luxon.transformer";
import { DateTime } from "luxon";
import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

@Entity("teachers")
export class Teacher {
  @PrimaryColumn({ type: "varchar", length: 7 })
  id: string;

  @Column({ name: "first_name", type: "varchar", length: 100, nullable: false })
  firstName: string;

  @Column({ name: "last_name", type: "varchar", length: 100, nullable: false })
  lastName: string;

  @Column({
    name: "second_last_name",
    type: "varchar",
    length: 100,
    nullable: true,
  })
  secondLastName?: string;

  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string;

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

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user.schema";

@Entity("tbl_role")
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  permission: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

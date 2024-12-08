import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { User } from "./user.schema";

@Entity("tbl_role")
export class Role extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  permission: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

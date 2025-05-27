import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm';
import {User} from "./user.schema";

@Entity( 'tbl_role' )
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Name: string;

  @Column()
  Permission: string;

  @Column()
  RoleType: string;

  @OneToMany(() => User, user => user.Role)
  users: User[];
}
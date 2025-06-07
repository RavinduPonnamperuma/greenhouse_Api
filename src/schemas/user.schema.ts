import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm';
import {Role} from "../util/role.enum";
import {Polytunnel} from "./polytunnel.schema";


@Entity( 'tbl_user' )
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  status: string;

  @Column()
  contact: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;


  @OneToMany(() => Polytunnel, polytunnel => polytunnel.user)
  polytunnel: Polytunnel[];

}
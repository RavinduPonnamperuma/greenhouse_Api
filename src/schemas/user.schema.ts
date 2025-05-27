import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm';
import {Polytunnel} from "./polytunnel.schema";
import {Role} from "./role.schema";
import {Notification} from "./notification.schema";
import {Actuators} from "./actuator.schema";


@Entity( 'tbl_user' )
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  Name: string;

  @Column()
  Email: string;

  @Column()
  Password: string;

  @Column()
  Address: string;

  @Column()
  Contact: string;

  @ManyToOne(() => Role, role => role.users)
  Role: Role;

  @OneToMany(() => Polytunnel, polytunnel => polytunnel.User)
  Polytunnels: Polytunnel[];

  @OneToMany(() => Notification, notification => notification.User)
  Notifications: Notification[];

  @OneToMany(() => Actuators, actuator => actuator.User)
  Actuators: Actuators[];
}
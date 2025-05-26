import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm';
import {User} from "./user.schema";


@Entity({ name: 'tbl_notification' })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Message: string;

  @Column()
  Status: string;

  @ManyToOne(() => User, user => user.Notifications)
  User: User;
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { User } from "./user.schema";


@Entity("tbl_notification")
export class Notification  extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  status: string;

  @Column()
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}

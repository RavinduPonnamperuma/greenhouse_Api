import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Actuation } from "./actuation.schema";


@Entity("tbl_schedule")
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  schedulingType: string;

  @Column()
  schedulingName: string;

  @Column()
  schedulingDate: Date;

  @OneToMany(() => Actuation, (actuation) => actuation.schedule)
  actuations: Actuation[];
}

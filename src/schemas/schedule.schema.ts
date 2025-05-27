import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm';
import {Actuation} from "./actuation.schema";


@Entity( 'tbl_schedule' )
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  SchedulingName: string;

  @Column()
  SchedulingTime: Date;

  @Column()
  SchedulingData: string;

  @OneToMany(() => Actuation, actuation => actuation.Schedule)
  Actuations: Actuation[];
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Actuation } from "./actuation.schema";


@Entity("tbl_schedule")
export class Schedule extends BaseEntity {
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

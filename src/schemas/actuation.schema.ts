import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Device } from "./device.schema";
import { Schedule } from "./schedule.schema";


@Entity("tbl_actuations")
export class Actuation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Device, (device) => device.actuations)
  device: Device;

  @ManyToOne(() => Schedule, (schedule) => schedule.actuations)
  schedule: Schedule;
}

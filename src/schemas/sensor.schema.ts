import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Device } from "./device.schema";


@Entity("tbl_sensor")
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  location: string;

  @ManyToOne(() => Device, (device) => device.sensors)
  device: Device;
}
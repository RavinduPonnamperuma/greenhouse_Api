import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { Device } from "./device.schema";


@Entity("tbl_sensor")
export class Sensor extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  location: string;

  @ManyToOne(() => Device, (device) => device.sensors)
  device: Device;
}
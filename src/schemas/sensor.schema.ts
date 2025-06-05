import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm';
import {Device} from "./device.schema";


@Entity( 'tbl_sensors' )
export class Sensors extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  DataValue: string;

  @Column()
  Timestamp: Date;

  @ManyToOne(() => Device, device => device.sensors)
  Device: Device;
}
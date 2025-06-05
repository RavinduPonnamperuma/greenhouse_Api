import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm';
import {Device} from "./device.schema";


@Entity( 'tbl_device_configuration' )
export class DeviceConfiguration extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Configuration: string;

  @Column()
  ConfigTimestamp: Date;

  @ManyToOne(() => Device, device => device.configurations)
  Device: Device;
}
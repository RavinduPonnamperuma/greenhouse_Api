import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Device } from "./device.schema";


@Entity("tbl_device_config")
export class DeviceConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  configuration: string;

  @Column()
  configTimestamp: Date;

  @ManyToOne(() => Device, (device) => device.configurations)
  device: Device;
}

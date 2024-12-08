import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { Device } from "./device.schema";


@Entity("tbl_device_config")
export class DeviceConfiguration extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  configuration: string;

  @Column()
  configTimestamp: Date;

  @ManyToOne(() => Device, (device) => device.configurations)
  device: Device;
}

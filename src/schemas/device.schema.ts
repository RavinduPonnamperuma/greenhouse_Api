import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Polytunnel } from "./polytunnel.schema";
import { Sensor } from "./sensor.schema";
import { Actuation } from "./actuation.schema";
import { DeviceConfiguration } from "./device-config.schema";

@Entity("tbl_device")
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @ManyToOne(() => Polytunnel, (polytunnel) => polytunnel.id)
  polytunnel: Polytunnel;

  @OneToMany(() => Sensor, (sensor) => sensor.device)
  sensors: Sensor[];

  @OneToMany(() => Actuation, (actuation) => actuation.device)
  actuations: Actuation[];

  @OneToMany(() => DeviceConfiguration, (config) => config.device)
  configurations: DeviceConfiguration[];
}

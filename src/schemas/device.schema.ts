import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm';
import {Polytunnel} from "./polytunnel.schema";
import {Sensors} from "./sensor.schema";
import {DeviceConfiguration} from "./device-config.schema";


@Entity( 'tbl_device' )
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Status: string;

  @Column()
  Type: string;

  @ManyToOne(() => Polytunnel, polytunnel => polytunnel.Devices)
  PolyTunnel: Polytunnel;

  @OneToMany(() => Sensors, sensors => sensors.Device)
  Sensors: Sensors[];

  @OneToMany(() => DeviceConfiguration, config => config.Device)
  Configurations: DeviceConfiguration[];
}
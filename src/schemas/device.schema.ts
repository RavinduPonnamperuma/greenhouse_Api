import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  BaseEntity
} from 'typeorm';
import { Polytunnel } from './polytunnel.schema';
import { Sensors } from './sensor.schema';
import { DeviceConfiguration } from './device-config.schema';

@Entity('tbl_device')
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  type: string;

  @OneToOne(() => Polytunnel, polytunnel => polytunnel.device)
  polyTunnel: Polytunnel;

  @OneToMany(() => Sensors, sensors => sensors.Device)
  sensors: Sensors[];

  @OneToMany(() => DeviceConfiguration, config => config.Device)
  configurations: DeviceConfiguration[];
}

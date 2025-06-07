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

@Entity('tbl_device')
export class Device extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  code: string;

  @OneToOne(() => Polytunnel, polytunnel => polytunnel.device)
  polyTunnel: Polytunnel;

  @OneToMany(() => Sensors, sensors => sensors.device)
  sensors: Sensors[];
}

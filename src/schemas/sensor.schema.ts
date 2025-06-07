import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Device} from './device.schema';
import {SensorData} from "./sensor-data.schema";


@Entity('tbl_sensors')
export class Sensors extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  type: string;

  @Column()
  timestamp: Date;

  @ManyToOne(() => Device, device => device.sensors)
  device: Device;

  @OneToMany(() => SensorData, sensorData => sensorData.sensor)
  sensorData: SensorData[];
}

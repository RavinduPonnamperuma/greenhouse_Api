import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity
} from 'typeorm';
import { Sensors } from './sensor.schema';

@Entity('tbl_sensor_data')
export class SensorData extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  @Column('float')
  value: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Sensors, sensor => sensor.sensorData)
  sensor: Sensors;
}

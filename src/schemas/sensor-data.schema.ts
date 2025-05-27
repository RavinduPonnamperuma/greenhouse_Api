import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

@Entity( 'tbl_sensor_data' )
export class SensorData extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  @Column('json')
  data: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Timestamp for when the data was received
}

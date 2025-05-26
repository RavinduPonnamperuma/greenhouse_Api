import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  @Column('json')
  data: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Timestamp for when the data was received
}

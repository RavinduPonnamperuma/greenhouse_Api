import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Plant} from './plant.schema';
import {Irrigation} from './irrigration.schema';

@Entity('tbl_irrigation_schedule')
export class PlantSchedule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Plant, plant => plant.id)
    plant: Plant;

    @ManyToOne(() => Irrigation, irrigation => irrigation.id, { nullable: true, onDelete: 'SET NULL' })
    irrigation: Irrigation;

    @Column()
    scheduledDate: string;

    @Column()
    scheduledTime: string;

    @Column()
    taskType: string;

    @Column('int')
    duration: number;

    @Column({ default: false })
    isCompleted: boolean;
}

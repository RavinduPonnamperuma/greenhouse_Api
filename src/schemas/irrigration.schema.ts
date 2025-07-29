import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Plant} from './plant.schema';
import {PlantSchedule} from "./schedule.schema";

@Entity('tbl_irrigation')
export class Irrigation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    waterPerDay: number;

    @Column('decimal', { precision: 10, scale: 2 })
    fertilizerPerDay: number;

    @Column()
    timesPerDay: number;

    @Column({ default: false })
    isMorning: boolean;

    @Column({ nullable: true })
    morningTime: string;

    @Column({ default: false })
    isEvening: boolean;

    @Column({ nullable: true })
    eveningTime: string;

    @Column('int')
    duration: number;

    @ManyToOne(() => Plant, plant => plant.irrigations)
    plant: Plant;

    @OneToMany(() => PlantSchedule, schedule => schedule.irrigation)
    schedules: PlantSchedule[];
}

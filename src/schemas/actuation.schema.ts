import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm';
import {Actuators} from "./actuator.schema";
import {Schedule} from "./schedule.schema";
import {ActuationHistory} from "./actuation_history.schema";


@Entity( 'tbl_actuation' )
export class Actuation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Timestamp: Date;

    @ManyToOne(() => Actuators, actuator => actuator.Actuations)
    Actuator: Actuators;

    @ManyToOne(() => Schedule, schedule => schedule.Actuations)
    Schedule: Schedule;

    @OneToMany(() => ActuationHistory, history => history.Actuation)
    Histories: ActuationHistory[];
}
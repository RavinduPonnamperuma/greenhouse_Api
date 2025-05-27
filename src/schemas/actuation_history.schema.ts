import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm';
import {Actuation} from "./actuation.schema";


@Entity('tbl_actuation_history')
export class ActuationHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    AnalysisOutcome: string;

    @Column()
    AnalysisTimestamp: Date;

    @ManyToOne(() => Actuation, actuation => actuation.Histories)
    Actuation: Actuation;
}
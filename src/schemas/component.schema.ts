// src/entities/greenhouse-component.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Polytunnel } from './polytunnel.schema';

@Entity('tbl_greenhouse_component')
export class GreenhouseComponent {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @Column({ type: 'enum', enum: ['on', 'off'], default: 'off' })
    status: 'on' | 'off';


    @ManyToOne(() => Polytunnel, (polytunnel) => polytunnel.components, { onDelete: 'CASCADE' })
    polytunnel: Polytunnel;




}

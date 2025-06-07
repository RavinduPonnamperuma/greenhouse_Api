import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {WaterTank} from "./water-tank.schema";


@Entity('tbl_water_tank_history')
export class WaterTankHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    outDate: string;

    @Column('decimal', { precision: 10, scale: 2 })
    outCapacity: number;

    @Column({ nullable: true })
    note: string;

    @ManyToOne(() => WaterTank, waterTank => waterTank.history)
    waterTank: WaterTank;
}

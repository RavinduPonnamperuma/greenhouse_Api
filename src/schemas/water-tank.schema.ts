import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Polytunnel} from "./polytunnel.schema";
import {WaterTankHistory} from "./water-tank-history.schema";

@Entity('tbl_water_tank')
export class WaterTank extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tankNumber: string;

    @Column()
    capacity: number;

    @Column()
    status: string;

    @ManyToOne(() => Polytunnel, polytunnel => polytunnel.waterTanks)
    polytunnel: Polytunnel;

    @OneToMany(() => WaterTankHistory, history => history.waterTank) // add this
    history: WaterTankHistory[];

}

import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {User} from './user.schema';
import {Device} from './device.schema';
import {Plant} from './plant.schema';
import {WaterTank} from "./water-tank.schema";

@Entity('tbl_polytunnel')
export class Polytunnel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    // @BeforeInsert()
    // async generateCode() {
    //     const repo = getRepository(Polytunnel);
    //     const lastRecord = await repo
    //         .createQueryBuilder('entity')
    //         .orderBy('entity.id', 'DESC')
    //         .getOne();
    //
    //     let nextNumber = 1;
    //     if (lastRecord?.code) {
    //         const match = lastRecord.code.match(/GH-(\d+)/);
    //         if (match) {
    //             nextNumber = parseInt(match[1], 10) + 1;
    //         }
    //     }
    //     this.code = `GH-${nextNumber.toString().padStart(4, '0')}`;
    // }
    @Column()
    status: string;

    @Column()
    location: string;

    @Column()
    size: string;

    @Column()
    length: number;

    @Column()
    width: number;

    @Column()
    numberOfPlants: string;

    @ManyToOne(() => User, user => user.polytunnel)
    user: User;

    @OneToOne(() => Device, device => device.polyTunnel)
    @JoinColumn()
    device: Device;

    @OneToMany(() => Plant, plant => plant.polytunnel) // note lowercase 'polytunnel'
    plants: Plant[];


    @OneToMany(() => WaterTank, waterTank => waterTank.polytunnel)
    waterTanks: WaterTank[];
}

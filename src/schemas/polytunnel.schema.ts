import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    BaseEntity,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import {User} from './user.schema';
import {Device} from './device.schema';
import {Plant} from './plant.schema';

@Entity('tbl_polytunnel')
export class Polytunnel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location: string;

    @ManyToOne(() => User, user => user.Polytunnels)
    user: User;

    @OneToOne(() => Device, device => device.polyTunnel)
    @JoinColumn()
    device: Device;

    @OneToMany(() => Plant, plant => plant.polytunnel) // note lowercase 'polytunnel'
    plants: Plant[];
}

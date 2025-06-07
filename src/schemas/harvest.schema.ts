import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity,
} from 'typeorm';
import { Plant } from './plant.schema';

@Entity('tbl_harvest')
export class Harvest extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    harvestDate: string;

    @Column('decimal', { precision: 10, scale: 2 })
    sellingPrice: number;

    @Column('decimal', { precision: 10, scale: 2 })
    quantity: number;

    @Column()
    variety: string;

    @ManyToOne(() => Plant, plant => plant.harvests)
    plant: Plant;
}

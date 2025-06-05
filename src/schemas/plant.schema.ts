import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Polytunnel } from './polytunnel.schema';

@Entity('tbl_plant')
export class Plant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  PlantName: string;

  @Column()
  Status: string;

  @ManyToOne(() => Polytunnel, polytunnel => polytunnel.plants)
  polytunnel: Polytunnel;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity, OneToMany,
} from 'typeorm';
import { Polytunnel } from './polytunnel.schema';
import {Harvest} from "./harvest.schema";
import {Irrigation} from "./irrigration.schema";
import {PlantSchedule} from "./schedule.schema";

@Entity('tbl_plant')
export class Plant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plantName: string;

  @Column()
  status: string;

  @Column()
  cost: number;

  @Column()
  harvestTime: number;

  @Column()
  startDate : string;

  @Column()
  endTime : string;

  @ManyToOne(() => Polytunnel, polytunnel => polytunnel.plants)
  polytunnel: Polytunnel;

  @OneToMany(() => Harvest, harvest => harvest.plant) // add this
  harvests: Harvest[];

  @OneToMany(() => Irrigation, irrigation => irrigation.plant) // add this
  irrigations: Irrigation[];

  @OneToMany(() => PlantSchedule, schedule => schedule.plant) // CORRECTED THIS LINE
  schedules: PlantSchedule[];
}

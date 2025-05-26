import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm';
import {Polytunnel} from "./polytunnel.schema";


@Entity('tbl_plant' )
export class Plant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  PlantName: string;

  @Column()
  Status: string;

  @OneToMany(() => Polytunnel, polytunnel => polytunnel.Plant)
  Polytunnels: Polytunnel[];
}
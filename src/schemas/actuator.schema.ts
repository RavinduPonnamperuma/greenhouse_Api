import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from 'typeorm';
import {User} from "./user.schema";
import {Plant} from "./plant.schema";
import {Actuation} from "./actuation.schema";


@Entity( 'tbl_actuators' )
export class Actuators extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ActuatorName: string;

  @Column()
  ActuatorStatus: string;

  @ManyToOne(() => User, user => user.Actuators)
  User: User;

  @ManyToOne(() => Plant, plant => plant.Polytunnels)
  Plant: Plant;

  @OneToMany(() => Actuation, actuation => actuation.Actuator)
  Actuations: Actuation[];
}
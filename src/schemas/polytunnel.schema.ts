import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Plant } from "./plant.schema";
import { Device } from "./device.schema";

@Entity("tbl_polytunnel")
export class Polytunnel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Plant, (plant) => plant.plantName)
  plant: Plant;

  @OneToMany(() => Device, (device) => device.polytunnel)
  devices: Device[];
}

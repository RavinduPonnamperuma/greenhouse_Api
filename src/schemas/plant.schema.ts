import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Device } from "./device.schema";

@Entity("tbl_plant")
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plantName: string;

  @Column()
  status: string;

  @OneToMany(() => Device, (device) => device.polytunnel)
  devices: Device[];
}

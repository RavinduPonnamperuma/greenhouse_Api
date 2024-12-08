import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Device } from "./device.schema";

@Entity("tbl_plant")
export class Plant extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plantName: string;

  @Column()
  status: string;

  @OneToMany(() => Device, (device) => device.polytunnel)
  devices: Device[];
}

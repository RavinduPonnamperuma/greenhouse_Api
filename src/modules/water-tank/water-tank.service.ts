import { Injectable,NotFoundException} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {WaterTank} from "../../schemas/water-tank.schema";
import {Repository} from "typeorm";
import {Polytunnel} from "../../schemas/polytunnel.schema";
import {CreateWaterTankDto} from "./water-tank.entity";
import {UpdateWaterTankDto} from "./water-tank.entity";

@Injectable()
export class WaterTankService {
constructor(
  @InjectRepository(WaterTank)
  private waterTankRepository: Repository<WaterTank>,
  @InjectRepository(Polytunnel)

private polytunnelRepository: Repository<Polytunnel>, ) {}
  async create(dto: CreateWaterTankDto): Promise<WaterTank> {
    const waterTank = new WaterTank();
    waterTank.tankNumber = dto.tankNumber;
    waterTank.capacity = dto.capacity;
    waterTank.status = dto.status;

    if (dto.polytunnelId) {
      const polytunnel = await this.polytunnelRepository.findOne({ where: { id: dto.polytunnelId } });
      if (!polytunnel) {
        throw new NotFoundException('Polytunnel not found');
      }
      waterTank.polytunnel = polytunnel;
    }

    return this.waterTankRepository.save(waterTank);
  }

  findAll(): Promise<WaterTank[]> {
    return this.waterTankRepository.find({ relations: ['polytunnel'] });
  }

  async findOne(id: number): Promise<WaterTank> {
    const tank = await this.waterTankRepository.findOne({ where: { id }, relations: ['polytunnel'] });
    if (!tank) throw new NotFoundException('WaterTank not found');
    return tank;
  }

  async update(id: number, dto: UpdateWaterTankDto): Promise<WaterTank> {
    const tank = await this.findOne(id);

    Object.assign(tank, dto);

    if (dto.polytunnelId !== undefined) {
      if (dto.polytunnelId === null) {
        tank.polytunnel = null;
      } else {
        const poly = await this.polytunnelRepository.findOneBy({ id: dto.polytunnelId });
        if (!poly) throw new NotFoundException('Polytunnel not found');
        tank.polytunnel = poly;
      }
    }

    return this.waterTankRepository.save(tank);
  }

  async remove(id: number): Promise<{ message: string }> {
    const tank = await this.findOne(id);
    await this.waterTankRepository.remove(tank);
    return { message: 'WaterTank deleted successfully' };
  }


}

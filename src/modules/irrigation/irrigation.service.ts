import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Irrigation } from "../../schemas/irrigration.schema";
import { Repository } from "typeorm";
import { Plant } from "../../schemas/plant.schema";
import { CreateIrrigationDto } from "./irrigation.entity";


@Injectable()
export class IrrigationService {
  constructor(
    @InjectRepository(Irrigation)
    private irrigationRepo: Repository<Irrigation>,

    @InjectRepository(Plant)
    private plantRepo: Repository<Plant>,
  ) {}

  async create(dto: CreateIrrigationDto): Promise<Irrigation> {
    const irrigation = new Irrigation();
    irrigation.waterPerDay = dto.waterPerDay;
    irrigation.fertilizerPerDay = dto.fertilizerPerDay;
    irrigation.timesPerDay = dto.timesPerDay;
    //irrigation.isMorning = dto.isMorning ?? 1;
    irrigation.morningTime = dto.morningTime;
    //irrigation.isEvening = dto.isEvening ?? 0;
    irrigation.eveningTime = dto.eveningTime;
    irrigation.duration = dto.duration;

    if (dto.plantId) {
      const plant = await this.plantRepo.findOneBy({ id: dto.plantId });
      if (plant) {
        irrigation.plant = plant;
      } else {
        throw new Error(`Plant with ID ${dto.plantId} not found`);
      }
    }
    return this.irrigationRepo.save(irrigation);
  }

  findAll(): Promise<Irrigation[]> {
    return this.irrigationRepo.find({ relations: ['plant'] });
  }

  async findOne(id: number): Promise<Irrigation> {
    const record = await this.irrigationRepo.findOne({ where: { id }, relations: ['plant'] });
    if (!record) throw new NotFoundException(`Irrigation with ID ${id} not found`);
    return record;
  }

  // update(id: number, updateIrrigationDto: UpdateIrrigationDto) {
  //   return `This action updates a #${id} irrigation`;
  // }

  remove(id: number) {
    return `This action removes a #${id} irrigation`;
  }
}

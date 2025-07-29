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

  create(createDto: CreateIrrigationDto): Promise<Irrigation> {
    const irrigation = this.irrigationRepo.create(createDto);
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

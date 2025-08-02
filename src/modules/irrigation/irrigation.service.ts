import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Irrigation } from "../../schemas/irrigration.schema";
import { Repository } from "typeorm";
import { Plant } from "../../schemas/plant.schema";
import { CreateIrrigationDto, UpdateIrrigationDto } from "./irrigation.entity";


@Injectable()
export class IrrigationService {
  constructor(
    @InjectRepository(Irrigation)
    private irrigationRepo: Repository<Irrigation>,

    @InjectRepository(Plant)
    private plantRepo: Repository<Plant>,
  ) {}

  create(createDto: CreateIrrigationDto) {
    const irrigation = this.irrigationRepo.create({
      ...createDto,
      plant: createDto.plantId ? { id: createDto.plantId } : undefined,
    });
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

  async update(id: number, updateDto: UpdateIrrigationDto): Promise<Irrigation> {
    const irrigation = await this.irrigationRepo.findOne({ where: { id } });

    if (!irrigation) {
      throw new NotFoundException(`Irrigation with ID ${id} not found`);
    }

    // If plantId is passed, validate it and assign it
    if (updateDto.plantId) {
      const plant = await this.plantRepo.findOne({ where: { id: updateDto.plantId } });
      if (!plant) {
        throw new NotFoundException(`Plant with ID ${updateDto.plantId} not found`);
      }
      irrigation.plant = plant;
    }

    // Update other fields
    Object.assign(irrigation, updateDto);

    return await this.irrigationRepo.save(irrigation);
  }


  remove(id: number) {
    const result = this.irrigationRepo.delete(id);
    if (!result) throw new NotFoundException(`Irrigation with ID ${id} not found`);
    return `This action removes a #${id} irrigation`;
  }
}

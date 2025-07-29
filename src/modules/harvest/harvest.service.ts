import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { Harvest } from "../../schemas/harvest.schema";
import {Repository} from "typeorm";
import { Plant } from "../../schemas/plant.schema";
import { CreateHarvestDto, UpdateHarvestDto } from "./harvest.entity";

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,

    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>
  ) {}

  async create(dto: CreateHarvestDto): Promise<Harvest> {
    const harvest = new Harvest();
    harvest.harvestDate = dto.harvestDate;
    harvest.sellingPrice = dto.sellingPrice;
    harvest.quantity = dto.quantity;
    harvest.variety = dto.variety;

    if (dto.plantId) {
      const plant = await this.plantRepository.findOneBy({ id: dto.plantId });
      harvest.plant = plant;
    }

    return this.harvestRepository.save(harvest);
  }

  findAll(): Promise<Harvest[]> {
    return this.harvestRepository.find({ relations: ['plant'] });
  }


  findOne(id: number): Promise<Harvest> {
    return this.harvestRepository.findOne({
      where: { id },
      relations: ['plant'],
    });
  }
  async update(id: number, dto: UpdateHarvestDto): Promise<Harvest> {
    const harvest = await this.harvestRepository.findOneBy({ id });
    if (!harvest) {
      throw new Error(`Harvest with id ${id} not found`);
    }

    // Update fields only if provided
    if (dto.harvestDate !== undefined) harvest.harvestDate = dto.harvestDate;
    if (dto.sellingPrice !== undefined) harvest.sellingPrice = dto.sellingPrice;
    if (dto.quantity !== undefined) harvest.quantity = dto.quantity;
    if (dto.variety !== undefined) harvest.variety = dto.variety;

    if (dto.plantId !== undefined) {
      const plant = await this.plantRepository.findOneBy({ id: dto.plantId });
      harvest.plant = plant;
    }

    return this.harvestRepository.save(harvest);
  }

  remove(id: number) {
    return `This action removes a #${id} harvest`;
  }
}

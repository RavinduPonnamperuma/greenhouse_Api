import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlantSchedule, } from "../../schemas/schedule.schema";
import { Repository } from "typeorm";
import { Plant } from "../../schemas/plant.schema";
import { Irrigation } from "../../schemas/irrigration.schema";
import { CreateScheduleDto, UpdateScheduleDto } from "./schedule.entity";


@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(PlantSchedule)
    private scheduleRepository:Repository <PlantSchedule>,
    @InjectRepository(Plant)
    private plantRepository:Repository<Plant>,
    @InjectRepository(Irrigation)
    private irrigationRepository:Repository<Irrigation>,
  ) {}

  //create schedule
  async create(dto: CreateScheduleDto): Promise<PlantSchedule> {
    const schedule = this.scheduleRepository.create({ ...dto });

    if (dto.plantId) {
      const plant = await this.plantRepository.findOneBy({ id: dto.plantId });
      if (!plant) throw new NotFoundException(`Plant ID ${dto.plantId} not found`);
      schedule.plant = plant;
    }

    if (dto.irrigationId) {
      const irrigation = await this.irrigationRepository.findOneBy({ id: dto.irrigationId });
      if (!irrigation) throw new NotFoundException(`Irrigation ID ${dto.irrigationId} not found`);
      schedule.irrigation = irrigation;
    }

    return this.scheduleRepository.save(schedule);
  }

  // Get All
  async findAll(): Promise<PlantSchedule[]> {
    return this.scheduleRepository.find({
      relations: ['plant', 'irrigation'],
    });
  }

  //find by id
  async findOne(id: number): Promise<PlantSchedule> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['plant', 'irrigation'],
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    return schedule;
  }



  // Update
  async update(id: number, dto: UpdateScheduleDto): Promise<PlantSchedule> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['plant', 'irrigation'],
    });

    if (!schedule) throw new NotFoundException(`Schedule ID ${id} not found`);

    if (dto.plantId) {
      const plant = await this.plantRepository.findOneBy({ id: dto.plantId });
      if (!plant) throw new NotFoundException(`Plant ID ${dto.plantId} not found`);
      schedule.plant = plant;
    }

    if (dto.irrigationId) {
      const irrigation = await this.irrigationRepository.findOneBy({ id: dto.irrigationId });
      if (!irrigation) throw new NotFoundException(`Irrigation ID ${dto.irrigationId} not found`);
      schedule.irrigation = irrigation;
    }

    Object.assign(schedule, dto);

    return this.scheduleRepository.save(schedule);
  }

  //remove
  async remove(id: number): Promise<string> {
    const result = await this.scheduleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    return `Schedule ID ${id} deleted successfully.`;
  }




}

import {Injectable} from '@nestjs/common';
import {Plant} from "../../schemas/plant.schema";
import {Polytunnel} from "../../schemas/polytunnel.schema";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreatePlantDto, UpdatePlantDto} from "./plant.entity";
import { format } from 'date-fns';


export class CreatePlantDTO{
    plantName: string;
    status: string;
    polytunnelId: number;
}

@Injectable()
export class PlantService {constructor(
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,

    @InjectRepository(Polytunnel)
    private polytunnelRepository: Repository<Polytunnel>,
) {}

    async savePlant(dto: CreatePlantDto): Promise<Plant> {
        const plant = new Plant();

        plant.plantName = dto.plantName;
        plant.status = dto.status;
        plant.cost = dto.cost;
        plant.harvestTime = dto.harvestTime;
        plant.startDate = dto.startDate;
        plant.endTime = dto.endTime;

        if (dto.polytunnelId) {
            plant.polytunnel = { id: dto.polytunnelId } as Polytunnel;
        } else {
            plant.polytunnel = null;
        }

        return await this.plantRepository.save(plant);
    }
    async findAll(): Promise<any[]> {
        const plants = await this.plantRepository.find({ relations: ['polytunnel'] });

        return plants.map(plant => ({
            ...plant,
            startDate: plant.startDate ? format(new Date(plant.startDate), 'yyyy-MM-dd') : null,
            endTime: plant.endTime ? format(new Date(`1970-01-01T${plant.endTime}`), 'HH:mm') : null,
            // or combine if you want
            startEnd: plant.startDate && plant.endTime
                ? `${format(new Date(plant.startDate), 'yyyy-MM-dd')} ${format(new Date(`1970-01-01T${plant.endTime}`), 'HH:mm')}`
                : null,
        }));
    }


    async updatePlant(id: number, dto: UpdatePlantDto): Promise<Plant> {
        const plant = await this.plantRepository.findOne({ where: { id } });

        if (!plant) {
            throw new Error(`Plant with ID ${id} not found`);
        }

        plant.plantName = dto.plantName;
        plant.status = dto.status;
        plant.cost = dto.cost;
        plant.harvestTime = dto.harvestTime;
        plant.startDate = dto.startDate;
        plant.endTime = dto.endTime;

        if (dto.polytunnelId) {
            plant.polytunnel = { id: dto.polytunnelId } as Polytunnel;
        } else {
            plant.polytunnel = null;
        }

        return await this.plantRepository.save(plant);
    }


}

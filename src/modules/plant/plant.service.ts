import { Injectable } from '@nestjs/common';
import {Plant} from "../../schemas/plant.schema";
import {Polytunnel} from "../../schemas/polytunnel.schema";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";


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

    async createPlant(dto: CreatePlantDTO) {
        const polytunnel = await this.polytunnelRepository.findOne({ where: { id: dto.polytunnelId } });
        if (!polytunnel) {
            throw new Error('Polytunnel not found');
        }
        const plant = this.plantRepository.create({
            PlantName: dto.plantName,
            Status: dto.status,
            polytunnel: polytunnel,
        });

        return await this.plantRepository.save(plant);
    }

}

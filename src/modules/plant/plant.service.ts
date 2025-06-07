import {Injectable} from '@nestjs/common';
import {Plant} from "../../schemas/plant.schema";
import {Polytunnel} from "../../schemas/polytunnel.schema";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreatePlantDto} from "./plant.entity";


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

}

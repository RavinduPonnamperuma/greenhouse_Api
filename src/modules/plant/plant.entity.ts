//import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreatePlantDto {

    plantName: string;
    status: string;
    cost: number;
    harvestTime: number;
    startDate: string;
    endTime: string;
    polytunnelId?: number;
}
export class UpdatePlantDto extends CreatePlantDto{}

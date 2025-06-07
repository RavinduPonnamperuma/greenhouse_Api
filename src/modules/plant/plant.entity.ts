import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreatePlantDto {
    @IsString()
    @IsNotEmpty()
    plantName: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNumber()
    cost: number;

    @IsNumber()
    harvestTime: number;

    @IsString()
    @IsNotEmpty()
    startDate: string;

    @IsString()
    @IsNotEmpty()
    endTime: string;

    @IsOptional()
    @IsNumber()
    polytunnelId?: number;
}

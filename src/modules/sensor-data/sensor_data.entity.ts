import { IsString, IsNotEmpty, IsNumber, IsOptional, IsInt } from 'class-validator';

export class CreateSensorDataDTO {
    @IsString()
    @IsNotEmpty()
    topic: string;

    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsOptional()
    @IsInt()
    sensorId?: number;
}

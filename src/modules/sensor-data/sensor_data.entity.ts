import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class SensorDataDTO {
    @IsString()
    @IsNotEmpty()
    topic: string;

    @IsObject()
    @IsNotEmpty()
    data: Record<string, any>;
}
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePolytunnelDTO {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  length: number;

  @IsNumber()
  width: number;

  @IsString()
  @IsNotEmpty()
  numberOfPlants: string;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsNumber()
  deviceId?: number;
}

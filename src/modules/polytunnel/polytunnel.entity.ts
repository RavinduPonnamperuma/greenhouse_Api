// import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreatePolytunnelDTO {

  code: string;
  status: string;
  location: string;
  size: string;
  length: number;
  width: number;
  numberOfPlants: string;
  userId?: number;
  deviceId?: number;
  waterTank?: number;
}

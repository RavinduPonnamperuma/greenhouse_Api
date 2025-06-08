export class CreateWaterTankDto {
  tankNumber: string;
  capacity: number;
  status: string;
  polytunnelId?: number;
}
export class UpdateWaterTankDto extends CreateWaterTankDto{}

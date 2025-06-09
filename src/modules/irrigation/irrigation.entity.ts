export class CreateIrrigationDto {
  waterPerDay: number;
  fertilizerPerDay: number;
  timesPerDay: number;
  isMorning?: boolean;
  morningTime?: string;
  isEvening?: boolean;
  eveningTime?: string;
  duration: number;
  plantId?: number;
}
export class UpdateIrrigationDto extends CreateIrrigationDto {}

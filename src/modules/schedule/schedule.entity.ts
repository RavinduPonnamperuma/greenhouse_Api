export class ScheduleDTO {
  scheduledDate: string;
  scheduledTime: string;
  taskType: string;
  duration: number;
  isCompleted?: boolean;
  plantId?: number;
  irrigationId?: number;
}
export class CreateScheduleDto extends ScheduleDTO {}
export class UpdateScheduleDto extends ScheduleDTO {}

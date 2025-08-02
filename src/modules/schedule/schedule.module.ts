import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlantSchedule } from "../../schemas/schedule.schema";
import { Plant } from "../../schemas/plant.schema";
import { Irrigation } from "../../schemas/irrigration.schema";

@Module({
  imports:[TypeOrmModule.forFeature([PlantSchedule,Plant,Irrigation])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}

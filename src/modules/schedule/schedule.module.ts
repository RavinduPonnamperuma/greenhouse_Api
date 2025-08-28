import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlantSchedule } from "../../schemas/schedule.schema";
import { Plant } from "../../schemas/plant.schema";
import { Irrigation } from "../../schemas/irrigration.schema";
import {MqttService} from "../mqtt/mqtt.service";
import {SensorDataModule} from "../sensor-data/sensor-data.module";

@Module({
  imports:[TypeOrmModule.forFeature([PlantSchedule,Plant,Irrigation]),SensorDataModule],
  controllers: [ScheduleController],
  providers: [ScheduleService,MqttService],
})
export class ScheduleModule {}

import { Module } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { SensorDataController } from './sensor-data.controller';
import {SensorData} from "../../schemas/sensor-data.schema";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MqttService} from "../mqtt/mqtt.service";

@Module({
  imports: [TypeOrmModule.forFeature([SensorData])],
  controllers: [SensorDataController],
  providers: [SensorDataService,MqttService],
})
export class SensorDataModule {}

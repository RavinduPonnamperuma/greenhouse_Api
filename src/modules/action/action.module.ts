import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import {MqttService} from "../mqtt/mqtt.service";
import {SensorDataService} from "../sensor-data/sensor-data.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SensorData} from "../../schemas/sensor-data.schema";

@Module({
  // imports: [TypeOrmModule.forFeature([SensorData])],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}

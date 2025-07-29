import {Module} from '@nestjs/common';
import {ActionService} from './action.service';
import {ActionController} from './action.controller';
import {SensorData} from "../../schemas/sensor-data.schema";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MqttService} from "../mqtt/mqtt.service";
import {Sensors} from "../../schemas/sensor.schema";
import {SensorDataModule} from "../sensor-data/sensor-data.module";

@Module({
  imports: [SensorDataModule],
  // imports: [TypeOrmModule.forFeature([SensorData])],
  controllers: [ActionController],
  providers: [ActionService,MqttService],
  exports: [ActionService],
})
export class ActionModule {}

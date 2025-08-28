import {Module} from '@nestjs/common';
import {ActionService} from './action.service';
import {ActionController} from './action.controller';
import {SensorData} from "../../schemas/sensor-data.schema";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MqttService} from "../mqtt/mqtt.service";
import {Sensors} from "../../schemas/sensor.schema";
import {SensorDataModule} from "../sensor-data/sensor-data.module";
import {PlantSchedule} from "../../schemas/schedule.schema";
import {Plant} from "../../schemas/plant.schema";
import {Irrigation} from "../../schemas/irrigration.schema";
import {DataSource} from "typeorm";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
  imports: [SensorDataModule,TypeOrmModule.forFeature([DataSource]),ScheduleModule.forRoot()],
  controllers: [ActionController],
  providers: [ActionService,MqttService],
  exports: [ActionService],
})
export class ActionModule {}

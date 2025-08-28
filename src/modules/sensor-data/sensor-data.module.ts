import {Module} from '@nestjs/common';
import {SensorDataService} from './sensor-data.service';
import {SensorDataController} from './sensor-data.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Sensors} from "../../schemas/sensor.schema";
import {SensorData} from "../../schemas/sensor-data.schema";
import {MqttService} from "../mqtt/mqtt.service";
import {WaterTank} from "../../schemas/water-tank.schema";
import {WaterTankHistory} from "../../schemas/water-tank-history.schema";
import {DataSource} from "typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([SensorData, Sensors,WaterTank,WaterTankHistory,DataSource])],
  providers: [SensorDataService,MqttService],
  controllers: [SensorDataController],
  exports: [SensorDataService],
})
export class SensorDataModule {}
import { Module } from "@nestjs/common";
import { SensorController } from "./sensor-data.controller";
import { SensorDataService } from "./sensor-data.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SensorData } from "../schemas/sensor-data.schema";

@Module({
  imports: [TypeOrmModule.forFeature([SensorData])],
  controllers:[SensorController],
  providers: [SensorDataService],
})
export class SensorDataModule {}
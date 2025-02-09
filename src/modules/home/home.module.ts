import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController,  } from "./home.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SensorData } from "../../schemas/sensor-data.schema";
import { SensorDataService } from "../../sensor-data/sensor-data.service";

@Module({
  imports: [],
  controllers: [HomeController,],
  providers: [HomeService,],
})
export class HomeModule {}

import { Controller, Get } from '@nestjs/common';

import { SensorData } from "../schemas/sensor-data.schema";
import { SensorDataService } from "./sensor-data.service";

@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Get('all-descending')
  async getAllSensorsInDescendingOrder(): Promise<SensorData[]> {
    return this.sensorDataService.getAllSensorsInDescendingOrder();
  }

  // Endpoint to get all sensor data without any sorting
  @Get()
  async getAll(): Promise<SensorData[]> {
    return this.sensorDataService.getAll();
  }

  @Get('last')
  async getLastSensorData(): Promise<SensorData> {
    return this.sensorDataService.getLastSensorData();
  }


}

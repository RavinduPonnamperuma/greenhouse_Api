import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import {SensorData} from "../schemas/sensor-data.schema";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SensorDataService {

  constructor(
    @InjectRepository(SensorData)
    private readonly sensorDataRepository: Repository<SensorData>
  ) {}


//sent sensor data to db
  async saveSensorData(topic: string, data: any): Promise<SensorData> {
    const sensorData = this.sensorDataRepository.create({ topic, data });
    return await this.sensorDataRepository.save(sensorData);

  }

  async getAllSensorsInDescendingOrder(): Promise<SensorData[]> {
    console.log('Fetching all sensor data in descending order')
    return this.sensorDataRepository.find({
      order: {
        id: 'DESC', // Sort by sensorId in descending order
      },
    });
  }

  async getAll(): Promise<SensorData[]> {
    return this.sensorDataRepository.find();
  }

  async getLastSensorData(): Promise<SensorData> {
    const [lastSensorData] = await this.sensorDataRepository.find({
      order: {
        id: 'DESC', // Sort by sensorId in descending order
      },
      take: 1, // Limit the result to only one record
    });
    return lastSensorData; // Return the first (and only) record
  }



}

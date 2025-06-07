import {Injectable} from '@nestjs/common';
import {SensorData} from "../../schemas/sensor-data.schema";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {SensorDataDTO} from "./sensor_data.entity";

@Injectable()
export class SensorDataService {

    constructor(
        @InjectRepository(SensorData)
        private sensorDataRepository: Repository<SensorData>,
    ) {
    }

    async save(sensorData: SensorDataDTO) {
        // const {topic, data} = sensorData;
        // const newRecord = this.sensorDataRepository.create({
        //     topic,
        //     data,
        // });
        // await this.sensorDataRepository.save(newRecord);
        // return {message: 'Sensor data saved successfully'};
    }

    async getAllSensorData(){
        const results = await this.sensorDataRepository
            .createQueryBuilder('sensor')
            .select('sensor.data', 'data')
            .getRawMany();
        return results.map(row => row.data);
    }




}

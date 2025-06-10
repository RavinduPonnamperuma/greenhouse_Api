import {Injectable, NotFoundException} from '@nestjs/common';
import {SensorData} from "../../schemas/sensor-data.schema";
import {Between, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Sensors} from "../../schemas/sensor.schema";
import {CreateSensorDataDTO} from "./sensor_data.entity";
import * as moment from 'moment';


@Injectable()
export class SensorDataService {

    constructor(
        @InjectRepository(SensorData)
        private sensorDataRepository: Repository<SensorData>,
        @InjectRepository(Sensors)
        private sensorsRepository: Repository<Sensors>,
    ) {
    }

    async saveSensorData(dto: CreateSensorDataDTO) {
        let sensor = null;
        if (dto.sensorId) {
            sensor = await this.sensorsRepository.findOne({where: {id: dto.sensorId}});
            if (!sensor) {
                throw new NotFoundException(`Sensor with ID ${dto.sensorId} not found`);
            }
        }
        const sensorData = this.sensorDataRepository.create({
            topic: dto.topic,
            value: dto.value,
            sensor: sensor || null,
        });
        return await this.sensorDataRepository.save(sensorData);
    }

    async getAllSensorData(topic:string) {
        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();
        return await this.sensorDataRepository.find({
            where: {
                // topic,
                createdAt: Between(startOfDay, endOfDay),
            },
            order: { createdAt: 'DESC' },
        });
    }

}

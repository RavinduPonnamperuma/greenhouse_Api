import {Injectable, NotFoundException} from '@nestjs/common';
import {SensorData} from "../../schemas/sensor-data.schema";
import {Between, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Sensors} from "../../schemas/sensor.schema";
import {CreateSensorDataDTO} from "./sensor_data.entity";
import * as moment from 'moment';
import {WaterTank} from "../../schemas/water-tank.schema";
import {WaterTankHistory} from "../../schemas/water-tank-history.schema";


@Injectable()
export class SensorDataService {

    constructor(
        @InjectRepository(SensorData)
        private sensorDataRepository: Repository<SensorData>,
        @InjectRepository(Sensors)
        private sensorsRepository: Repository<Sensors>,
        @InjectRepository(WaterTank)
        private waterTankRepository: Repository<WaterTank>,
        @InjectRepository(WaterTankHistory)
        private waterTankHistoryRepository: Repository<WaterTankHistory>,
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

    async getWaterTankLevel(id: number) {
        const result = await this.waterTankRepository
            .createQueryBuilder('wt')
            .leftJoin('wt.history', 'wth')
            .select('wt.id', 'waterTankId')
            .addSelect('wt.tankNumber', 'tankNumber')
            .addSelect('wt.capacity', 'totalCapacity')
            .addSelect('COALESCE(SUM(wth.outCapacity), 0)', 'totalOut')
            .addSelect('wt.capacity - COALESCE(SUM(wth.outCapacity), 0)', 'currentWaterLevel')
            .where('wt.id = :id', { id })
            .groupBy('wt.id')
            .addGroupBy('wt.tankNumber')
            .addGroupBy('wt.capacity')
            .getRawOne();

        return result;
    }


}

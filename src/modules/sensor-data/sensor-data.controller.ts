import {Controller, Get, Query} from '@nestjs/common';
import {SensorDataService} from './sensor-data.service';

@Controller()
export class SensorDataController {
    constructor(private readonly sensorDataService: SensorDataService) {
    }

    @Get()
    async findAll(
        @Query('topic')topic: string,
    ) {
        return await this.sensorDataService.getAllSensorData(topic)
    }
}

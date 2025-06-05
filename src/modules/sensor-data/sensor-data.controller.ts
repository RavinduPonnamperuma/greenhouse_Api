import {Controller, Get} from '@nestjs/common';
import {SensorDataService} from './sensor-data.service';

@Controller()
export class SensorDataController {
    constructor(private readonly sensorDataService: SensorDataService) {
    }

    @Get()
    async findAll() {
        return await this.sensorDataService.getAllSensorData()
    }
}

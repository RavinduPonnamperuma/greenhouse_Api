import {BadRequestException, Controller, Get, Query} from '@nestjs/common';
import {ReportsService} from './reports.service';

@Controller()
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {
    }

    @Get('polytunnel')
    async getPolytunnelReport(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('polytunnel') polytunnel?: string,
    ) {
        if (!startDate || !endDate) {
            throw new BadRequestException('startDate and endDate are required');
        }
        return this.reportsService.getPolytunnelReport(startDate, endDate, polytunnel);
    }

    @Get('plant')
    async getPlantReport(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('plant') plant?: string,
    ) {
        if (!startDate || !endDate) {
            throw new BadRequestException('startDate and endDate are required');
        }
        return this.reportsService.getPlantReport(startDate, endDate, plant);
    }


    @Get('irrigation')
    async getIrrigationReport(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('polytunnel') polytunnel?: string,
    ) {
        if (!startDate || !endDate) {
            throw new BadRequestException('startDate and endDate are required');
        }
        return this.reportsService.getIrrigationReport(startDate, endDate, polytunnel);
    }

    @Get('financial')
    async getFinancialReport(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
        @Query('polytunnel') polytunnel?: string,
    ) {
        if (!startDate || !endDate) {
            throw new BadRequestException('startDate and endDate are required');
        }
        return this.reportsService.getFinancialReport(startDate, endDate, polytunnel);
    }
}

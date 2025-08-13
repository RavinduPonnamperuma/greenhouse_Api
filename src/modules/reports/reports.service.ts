import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class ReportsService {

    constructor(
        @InjectRepository(DataSource)
        private dataSource: Repository<DataSource>,
    ) {
    }


    async getPolytunnelReport(startDate: string, endDate: string, polytunnel?: string) {
        const result = await this.dataSource.query(
            `CALL sp_polytunnel_performance(?, ?, ?)`,
            [startDate, endDate, polytunnel || null]
        );
        return result[0];
    }

    async getPlantReport(startDate: string, endDate: string, plant?: string) {
        const result = await this.dataSource.query(
            `CALL sp_plant_growth(?, ?, ?)`,
            [startDate, endDate, plant || null]
        );
        return result[0];
    }

    async getIrrigationReport(startDate: string, endDate: string, polytunnel?: string) {
        const result = await this.dataSource.query(
            `CALL sp_irrigation_efficiency(?, ?, ?)`,
            [startDate, endDate, polytunnel || null]
        );
        return result[0];
    }

    async getFinancialReport(startDate: string, endDate: string, polytunnel?: string) {
        const result = await this.dataSource.query(
            `CALL sp_financial_performance(?, ?, ?)`,
            [startDate, endDate, polytunnel || null]
        );
        return result[0];
    }


}

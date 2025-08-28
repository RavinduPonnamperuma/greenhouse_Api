import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {WaterTank} from "../../schemas/water-tank.schema";
import {Polytunnel} from "../../schemas/polytunnel.schema";
import {DataSource} from "typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([DataSource])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}

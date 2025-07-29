import { Module } from '@nestjs/common';
import { IrrigationService } from './irrigation.service';
import { IrrigationController } from './irrigation.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Irrigation } from "../../schemas/irrigration.schema";
import { Plant } from "../../schemas/plant.schema";

@Module({
  imports: [TypeOrmModule.forFeature([Irrigation, Plant])],
  controllers: [IrrigationController],
  providers: [IrrigationService],
})
export class IrrigationModule {}

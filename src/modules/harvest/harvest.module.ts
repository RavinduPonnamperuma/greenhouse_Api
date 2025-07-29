import { Module } from '@nestjs/common';
import { HarvestService } from './harvest.service';
import { HarvestController } from './harvest.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Harvest } from "../../schemas/harvest.schema";
import { Plant } from "../../schemas/plant.schema";

@Module({
  imports: [TypeOrmModule.forFeature([Harvest, Plant])],
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}

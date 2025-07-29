import { Module } from '@nestjs/common';
import { WaterTankService } from './water-tank.service';
import { WaterTankController } from './water-tank.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {WaterTank} from "../../schemas/water-tank.schema";
import {Polytunnel} from "../../schemas/polytunnel.schema";

@Module({
  imports: [TypeOrmModule.forFeature([WaterTank, Polytunnel])],
  controllers: [WaterTankController],
  providers: [WaterTankService],
})
export class WaterTankModule {}

import { Module } from '@nestjs/common';
import { WaterTankService } from './water-tank.service';
import { WaterTankController } from './water-tank.controller';

@Module({
  controllers: [WaterTankController],
  providers: [WaterTankService],
})
export class WaterTankModule {}

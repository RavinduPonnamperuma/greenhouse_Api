import { Controller } from '@nestjs/common';
import { WaterTankService } from './water-tank.service';

@Controller('water-tank')
export class WaterTankController {
  constructor(private readonly waterTankService: WaterTankService) {}
}

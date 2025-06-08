import { Controller,Body } from '@nestjs/common';
import {WaterTankService} from "./water-tank.service";
import {CreateWaterTankDto} from "./water-tank.entity";
import {WaterTank} from "../../schemas/water-tank.schema";
import {Post,Get,Param,ParseIntPipe,Put,Delete} from "@nestjs/common";
import {UpdateWaterTankDto} from "./water-tank.entity";

@Controller()
export class WaterTankController {
  constructor(private readonly waterTankService: WaterTankService) {}
  @Post()
  async create(@Body() dto: CreateWaterTankDto): Promise<WaterTank> {
    return this.waterTankService.create(dto);
  }

  @Get()
  findAll() {
    return this.waterTankService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.waterTankService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWaterTankDto) {
    return this.waterTankService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.waterTankService.remove(id);
  }

}

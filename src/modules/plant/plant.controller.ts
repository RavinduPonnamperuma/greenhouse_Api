import {Body, Controller, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {PlantService} from './plant.service';
import {CreatePlantDto} from "./plant.entity";

@Controller()
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post()
  async save(@Body() plant: CreatePlantDto) {
    return this.plantService.savePlant(plant)
  }
  @Get()
  findAll() {
    return this.plantService.findAll();
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() dto: CreatePlantDto) {
    return this.plantService.updatePlant(id, dto);
  }

}

import {Body, Controller, Get, Post} from '@nestjs/common';
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

}

import {Body, Controller, Post} from '@nestjs/common';
import {CreatePlantDTO, PlantService} from './plant.service';

@Controller()
export class PlantController {
  constructor(private readonly plantService: PlantService) {}



  @Post()
  async save(@Body() plant: CreatePlantDTO) {
    return this.plantService.createPlant(plant)
  }

}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IrrigationService } from './irrigation.service';
import { CreateIrrigationDto } from "./irrigation.entity";

@Controller()
export class IrrigationController {
  constructor(private readonly irrigationService: IrrigationService) {}

  @Post()
  create(@Body() createDto: CreateIrrigationDto) {
    return this.irrigationService.create(createDto);
  }

  @Get()
  findAll() {
    return this.irrigationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.irrigationService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateIrrigationDto: UpdateIrrigationDto) {
  //   return this.irrigationService.update(+id, updateIrrigationDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.irrigationService.remove(+id);
  }
}

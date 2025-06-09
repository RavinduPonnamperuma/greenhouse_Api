import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from "@nestjs/common";
import { HarvestService } from './harvest.service';
import { CreateHarvestDto, UpdateHarvestDto } from "./harvest.entity";
import { Harvest } from "../../schemas/harvest.schema";

@Controller('harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @Post()
  create(@Body() dto: CreateHarvestDto): Promise<Harvest> {
    return this.harvestService.create(dto);
  }

  @Get()
  findAll(): Promise<Harvest[]> {
    return this.harvestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Harvest> {
    return this.harvestService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateHarvestDto,
  ): Promise<Harvest> {
    return this.harvestService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.harvestService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PolytunnelService } from './polytunnel.service';
import {CreatePolytunnelDTO} from "./polytunnel.entity";



@Controller()
export class PolytunnelController {
  constructor(private readonly polytunnelService: PolytunnelService) {}

  @Post()
  create(@Body() createPolytunnelDto: CreatePolytunnelDTO) {
    return this.polytunnelService.createPolytunnel(createPolytunnelDto);
  }

  @Get()
  findAll() {
    return this.polytunnelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.polytunnelService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePolytunnelDto: UpdatePolytunnelDto) {
  //   return this.polytunnelService.update(+id, updatePolytunnelDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.polytunnelService.remove(+id);
  }
}

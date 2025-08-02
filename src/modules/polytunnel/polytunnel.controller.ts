import { Body, Controller, Post, HttpCode, HttpStatus, Get, Param, ParseIntPipe, Patch, Delete } from "@nestjs/common";
import {PolytunnelService} from './polytunnel.service';
import {CreatePolytunnelDTO} from "./polytunnel.entity";
import {Polytunnel} from "../../schemas/polytunnel.schema";
import {UpdatePolytunnelDTO} from "./polytunnel.entity";


@Controller()
export class PolytunnelController {
  constructor(private readonly polytunnelService: PolytunnelService) {}

  @Post()
  async create(@Body() createPolytunnelDto: CreatePolytunnelDTO) {
    return this.polytunnelService.savePolytunnel(createPolytunnelDto);
  }
  //
  @Get()
  findAll() {
    return this.polytunnelService.getAllPolytunnels();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.polytunnelService.getPolytunnelById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolytunnelDto: UpdatePolytunnelDTO) {
    return this.polytunnelService.updatePolytunnel(+id, updatePolytunnelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.polytunnelService.deletePolytunnel(+id);
  }
}

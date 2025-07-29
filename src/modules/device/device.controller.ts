import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { DeviceService } from './device.service';
import {CreateDeviceDto} from "./device.entity";


@Controller()
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}


  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.create(createDeviceDto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body() updateDeviceDto: UpdateDeviceDto,
  // ) {
  //   return this.deviceService.update(id, updateDeviceDto);
  // }

  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id);
  }

  @Get()
  findAll() {
    return this.deviceService.findAll();
  }

}

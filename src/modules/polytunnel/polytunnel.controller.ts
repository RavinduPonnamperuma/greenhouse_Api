import {Body, Controller, Post} from '@nestjs/common';
import {PolytunnelService} from './polytunnel.service';
import {CreatePolytunnelDTO} from "./polytunnel.entity";


@Controller()
export class PolytunnelController {
  constructor(private readonly polytunnelService: PolytunnelService) {}

  @Post()
  async savePolytunnel(@Body() body: CreatePolytunnelDTO) {
    return await this.polytunnelService.savePolytunnel(body);
  }

  // @Get()
  // findAll() {
  //   return this.polytunnelService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.polytunnelService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePolytunnelDto: UpdatePolytunnelDto) {
  //   return this.polytunnelService.update(+id, updatePolytunnelDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.polytunnelService.remove(+id);
  // }
}

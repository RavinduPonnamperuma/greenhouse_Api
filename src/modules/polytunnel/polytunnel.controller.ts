import {Body, Controller, Post,HttpCode,HttpStatus} from '@nestjs/common';
import {PolytunnelService} from './polytunnel.service';
import {CreatePolytunnelDTO} from "./polytunnel.entity";
import {Polytunnel} from "../../schemas/polytunnel.schema";


@Controller()
export class PolytunnelController {
  constructor(private readonly polytunnelService: PolytunnelService) {}
  @Post()

  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPolytunnelDto: CreatePolytunnelDTO): Promise<Polytunnel> {
    return await this.polytunnelService.savePolytunnel(createPolytunnelDto);
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

import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Device} from "../../schemas/device.schema";
import {Polytunnel} from "../../schemas/polytunnel.schema";

@Module({
  imports: [TypeOrmModule.forFeature([Device,Polytunnel])],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}

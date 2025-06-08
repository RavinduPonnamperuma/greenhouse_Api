import {Module} from '@nestjs/common';
import {PolytunnelService} from './polytunnel.service';
import {PolytunnelController} from './polytunnel.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Polytunnel} from "../../schemas/polytunnel.schema";
import {Device} from "../../schemas/device.schema";
import { User } from "../../schemas/user.schema";

@Module({
  controllers: [PolytunnelController],
  providers: [PolytunnelService],
  imports: [TypeOrmModule.forFeature([Polytunnel,Device,User])],
})
export class PolytunnelModule {}

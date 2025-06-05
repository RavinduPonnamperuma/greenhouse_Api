import { Module } from '@nestjs/common';
import { PolytunnelService } from './polytunnel.service';
import { PolytunnelController } from './polytunnel.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Polytunnel } from "../../schemas/polytunnel.schema";

@Module({
  controllers: [PolytunnelController],
  providers: [PolytunnelService],
  imports: [TypeOrmModule.forFeature([Polytunnel])],
})
export class PolytunnelModule {}

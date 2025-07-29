import {Module} from '@nestjs/common';
import {PlantService} from './plant.service';
import {PlantController} from './plant.controller';
import {Plant} from "../../schemas/plant.schema";
import {Polytunnel} from "../../schemas/polytunnel.schema";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Plant, Polytunnel])],
  controllers: [PlantController],
  providers: [PlantService],
})
export class PlantModule {}

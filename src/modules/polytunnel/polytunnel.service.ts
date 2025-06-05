import { Injectable } from '@nestjs/common';
import { CreatePolytunnelDto } from "./polytunnel.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Polytunnel } from "../../schemas/polytunnel.schema";
import { Repository } from "typeorm";

@Injectable()
export class PolytunnelService {
  constructor(
    @InjectRepository(Polytunnel)
    private readonly polytunnelRepository: Repository<Polytunnel>,
  ) {}
  async create(createPolytunnelDto: CreatePolytunnelDto) {
    const polytunnel = this.polytunnelRepository.create({
      Name: createPolytunnelDto.name,
      Location: createPolytunnelDto.location,
      User: { id: createPolytunnelDto.userId } as any,
      Plant: { id: createPolytunnelDto.plantId } as any,
    });
    console.log(polytunnel);
    return this.polytunnelRepository.save(polytunnel);

  }

  findAll() {
    return `This action returns all polytunnel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} polytunnel`;
  }

  // update(id: number, updatePolytunnelDto: UpdatePolytunnelDto) {
  //   return `This action updates a #${id} polytunnel`;
  // }

  remove(id: number) {
    return `This action removes a #${id} polytunnel`;
  }
}

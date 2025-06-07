import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Polytunnel} from "../../schemas/polytunnel.schema";
import {Repository} from "typeorm";
import {User} from "../../schemas/user.schema";
import {Device} from "../../schemas/device.schema";
import {CreatePolytunnelDTO} from "./polytunnel.entity";

@Injectable()
export class PolytunnelService {
    constructor(
        @InjectRepository(Polytunnel)
        private polytunnelRepository: Repository<Polytunnel>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Device)
        private deviceRepository: Repository<Device>,
    ) {
    }

    async createPolytunnel(dto: CreatePolytunnelDTO) {
        const user = await this.userRepository.findOne({where: {id: dto.userId}});
        if (!user) {
            throw new Error('User not found');
        }
        const device = await this.deviceRepository.findOne({where: {id: dto.deviceId}});
        if (!device) {
            throw new Error('Device not found');
        }
        // const polytunnel = this.polytunnelRepository.create({
        //     name: dto.name,
        //     location: dto.location,
        //     user,
        //     device,
        // });
        // return await this.polytunnelRepository.save(polytunnel);
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

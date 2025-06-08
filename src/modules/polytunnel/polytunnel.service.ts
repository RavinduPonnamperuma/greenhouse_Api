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
        @InjectRepository(Device)
        private deviceRepository: Repository<Device>,
    ) {
    }

    async savePolytunnel(dto: CreatePolytunnelDTO) {
        const polytunnel = new Polytunnel();
        polytunnel.code = dto.code;
        polytunnel.status = dto.status;
        polytunnel.location = dto.location;
        polytunnel.size = dto.size;
        polytunnel.length = dto.length;
        polytunnel.width = dto.width;
        polytunnel.numberOfPlants = dto.numberOfPlants;
        polytunnel.user = { id: dto.userId } as User;
        polytunnel.device = { id: dto.deviceId } as Device;

        // if (dto.userId) {
        //     polytunnel.user = { id: dto.userId } as User;
        // } else {
        //     polytunnel.user = null;
        // }

        // if (dto.deviceId) {
        //     polytunnel.device = { id: dto.deviceId } as Device;
        // } else {
        //     polytunnel.device = null;
        // }

        return await this.polytunnelRepository.save(polytunnel);
    }

}

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Polytunnel} from "../../schemas/polytunnel.schema";
import {Repository} from "typeorm";
import {User} from "../../schemas/user.schema";
import {Device} from "../../schemas/device.schema";
import {CreatePolytunnelDTO} from "./polytunnel.entity";
import {UpdatePolytunnelDTO} from "./polytunnel.entity";

@Injectable()
export class PolytunnelService {
    constructor(
        @InjectRepository(Polytunnel)
        private polytunnelRepository: Repository<Polytunnel>,
        @InjectRepository(Device)
        private deviceRepository: Repository<Device>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    //create pollytunnel
    async savePolytunnel(dto: CreatePolytunnelDTO): Promise<Polytunnel> {
        const polytunnel = this.polytunnelRepository.create({
            ...dto,
        });
        if (dto.userId) {
            const user = await this.userRepository.findOne({ where: { id: dto.userId } });
            if (!user) throw new NotFoundException('User not found');
            polytunnel.user = user;
        }
        if (dto.deviceId) {
            const device = await this.deviceRepository.findOne({ where: { id: dto.deviceId } });
            if (!device) throw new NotFoundException('Device not found');
            polytunnel.device = device;
        }

        return this.polytunnelRepository.save(polytunnel);
    }

    //all polytunnel
    async getAllPolytunnels(): Promise<Polytunnel[]> {
        return this.polytunnelRepository.find({ relations: ['user', 'device', 'waterTanks', 'plants'] });
    }

    //find by ID
    async getPolytunnelById(id: number): Promise<Polytunnel> {
        const tunnel = await this.polytunnelRepository.findOne({ where: { id }, relations: ['user', 'device'] });
        if (!tunnel) throw new NotFoundException('Polytunnel not found');
        return tunnel;
    }

    //update polytunnel
    async updatePolytunnel(id: number, dto: UpdatePolytunnelDTO): Promise<Polytunnel> {
        const tunnel = await this.getPolytunnelById(id);

        Object.assign(tunnel, dto);

        if (dto.userId) {
            const user = await this.userRepository.findOneBy({ id: dto.userId });
            if (!user) throw new NotFoundException('User not found');
            tunnel.user = user;
        }

        if (dto.deviceId) {
            const device = await this.deviceRepository.findOneBy({ id: dto.deviceId });
            if (!device) throw new NotFoundException('Device not found');
            tunnel.device = device;
        }

        return this.polytunnelRepository.save(tunnel);
    }

    //delete pollytunnel
    async deletePolytunnel(id: number): Promise<{ message: string }> {
        const result = await this.polytunnelRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Polytunnel not found');
        }
        return { message: 'Polytunnel deleted successfully' };
    }


}

import {Injectable,NotFoundException,InternalServerErrorException} from '@nestjs/common';
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
        private readonly userRepository: Repository<User>,

        @InjectRepository(Device)
        private deviceRepository: Repository<Device>,
    ) {}

    async create(createDto: CreatePolytunnelDTO):Promise<Polytunnel>{
        try {
            const polytunnel = new Polytunnel();
            polytunnel.code = createDto.code;
            polytunnel.status = createDto.status;
            polytunnel.location = createDto.location;
            polytunnel.size = createDto.size;
            polytunnel.length = createDto.length;
            polytunnel.width = createDto.width;
            polytunnel.numberOfPlants = createDto.numberOfPlants;

            if (createDto.userId) {
                const user = await this.userRepository.findOneBy({ id: createDto.userId });
                if (!user) throw new NotFoundException(`User with ID ${createDto.userId} not found`);
                polytunnel.user = user;
            } else {
                polytunnel.user = null;
            }

            if (createDto.deviceId) {
                const device = await this.deviceRepository.findOneBy({ id: createDto.deviceId });
                if (!device) throw new NotFoundException(`Device with ID ${createDto.deviceId} not found`);
                polytunnel.device = device;
            } else {
                polytunnel.device = null;
            }

            return await this.polytunnelRepository.save(polytunnel);
        } catch (error) {
            console.error('Error saving polytunnel:', error);
            throw new InternalServerErrorException('Failed to create polytunnel');
        }
    }


}

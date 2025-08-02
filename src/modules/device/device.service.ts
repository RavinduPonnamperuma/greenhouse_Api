import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Device} from "../../schemas/device.schema";
import {Repository} from "typeorm";
import {CreateDeviceDto, UpdateDeviceDto} from "./device.entity";


@Injectable()
export class DeviceService {
  constructor(
      @InjectRepository(Device)
      private deviceRepository: Repository<Device>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const newDevice = this.deviceRepository.create(createDeviceDto);
    return await this.deviceRepository.save(newDevice);
  }


  async findAll(): Promise<Device[]> {
    return this.deviceRepository.find();
  }

  async findOne(id: number): Promise<Device> {
    const device = await this.deviceRepository.findOne({ where: { id } });
    if (!device) throw new NotFoundException(`Device with ID ${id} not found`);
    return device;
  }
  // async update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
  //   const device = await this.findOne(id);
  //   Object.assign(device, updateDeviceDto);
  //   return this.deviceRepository.save(device);
  // }

 async remove(id: number) {
    const result = this.deviceRepository.delete(id);
    if (!result) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }
    else {
      console.log(`Device ${id} deleted`);
    }
  }
}

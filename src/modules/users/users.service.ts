import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Repository} from "typeorm";
import { CreateUserDTO,  } from "./user.entity";
import { User } from "../../schemas/user.schema";
import {UpdateUserDTO} from "./user.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async createUser(UserDto: CreateUserDTO) {
        const {userName, name, email, address,password, contact, role,} = UserDto;
       const user = this.userRepository.create({
           userName,
           name,
           email,
           password,
           address,
           contact,
           status:'active',


       })
        console.log(user);
        return await this.userRepository.save(user);
    }


    async getAll() {
         return await this.userRepository.find();
    }

    async get(id: number) {
        return await this.userRepository.findOneBy({id});
    }

    async update(id: number, updateUserDto: UpdateUserDTO): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        if (updateUserDto.userName) user.userName = updateUserDto.userName;
        if (updateUserDto.name) user.name = updateUserDto.name;
        if (updateUserDto.email) user.email = updateUserDto.email;
        if (updateUserDto.address) user.address = updateUserDto.address;
        if (updateUserDto.contact) user.contact = updateUserDto.contact;
        // if (updateUserDto.role) user.role = updateUserDto.role;
        if (updateUserDto.status) user.status = updateUserDto.status;

        return await this.userRepository.save(user);
    }

    // async find(
    //     firstName: string,
    //     lastName: string,
    //     pageNumber: number,
    //     itemsPerPage: number
    // ) {
    //     const searchConditions: Record<string, any> = {};
    //
    //     if (firstName) {
    //         searchConditions.firstName = firstName;
    //     }
    //     if (lastName) {
    //         searchConditions.lastName = lastName;
    //     }
    //
    //     const queryOptions: FindManyOptions<User> = {
    //         where: searchConditions,
    //         take: itemsPerPage,
    //         skip: (pageNumber - 1) * itemsPerPage
    //     };
    //
    //     const [employees, total] = await this.userRepository.findAndCount(queryOptions);
    //
    //     if (!employees || employees.length === 0) {
    //         return {
    //             page: pageNumber,
    //             itemsPerPage: itemsPerPage,
    //             totalItems: total,
    //             data: []
    //         };
    //     }
    //
    //     return {
    //         page: pageNumber,
    //         itemsPerPage: itemsPerPage,
    //         totalItems: total,
    //         data: employees
    //     };
    // }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid user');
        }
        const isPasswordValid = await this.userRepository.findOne({where:{password}});
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        return {
                email: user.email,
                userName: user.userName,
                userId: user.id,
        };
    }

}

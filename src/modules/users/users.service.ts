import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, Repository} from "typeorm";
import {CreateUserDTO, UpdateUserDTO} from "./user.entity";
import {User} from "../../schemas/user.schema";
import {Role} from "../../schemas/role.schema";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>
    ) {
    }

    async createUser(createUserDto: CreateUserDTO): Promise<User> {
        const {firstName, lastName, email, password, address, contact, roleId} = createUserDto;

        const role = await this.roleRepository.findOne({where: {id: roleId}});
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        const user = this.userRepository.create({
            FirstName: firstName,
            LastName: lastName,
            Name: `${firstName} ${lastName}`,
            Email: email,
            Password: password,
            Address: address,
            Contact: contact,
            Role: role
        });
        return await this.userRepository.save(user);
    }


    async getAll() {
        return await this.userRepository.find();
    }

    async get(id: number) {
        return await this.userRepository.findOneBy({id});
    }

    async update(id: number, updateUserDTO: UpdateUserDTO) {
        // await this.userRepository.update(id, updateUserDTO);
        // return this.userRepository.findOneBy({ id });
    }

    async find(
        firstName: string,
        lastName: string,
        pageNumber: number,
        itemsPerPage: number
    ) {
        const searchConditions: Record<string, any> = {};

        if (firstName) {
            searchConditions.firstName = firstName;
        }
        if (lastName) {
            searchConditions.lastName = lastName;
        }

        const queryOptions: FindManyOptions<User> = {
            where: searchConditions,
            take: itemsPerPage,
            skip: (pageNumber - 1) * itemsPerPage
        };

        const [employees, total] = await this.userRepository.findAndCount(queryOptions);

        if (!employees || employees.length === 0) {
            return {
                page: pageNumber,
                itemsPerPage: itemsPerPage,
                totalItems: total,
                data: []
            };
        }

        return {
            page: pageNumber,
            itemsPerPage: itemsPerPage,
            totalItems: total,
            data: employees
        };
    }

    async login(email: string, password: string): Promise<User> {
        console.log("Login attempt with email:", email, password);
        const user = await this.userRepository.findOne({where: {Email: email}});
        console.log(user);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return user;
    }

}

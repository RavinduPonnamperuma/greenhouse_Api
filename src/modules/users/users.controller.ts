import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO, UpdateUserDTO } from "./user.entity";

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }
// Search for users by firstName and lastName with pagination
  @Get('find')
  async find(
    @Query("firstName") firstName: string,
    @Query("lastName") lastName: string,
    @Query("pageNumber") pageNumber: number = 1,
    @Query("itemsPerPage") itemsPerPage: number = 10
  ) {
    return this.userService.find(firstName, lastName, pageNumber, itemsPerPage);
  }

  // Get a single user by ID
  @Get(":id")
  async get(@Param("id") id: number) {
    return await this.userService.get(id);
  }

  // Create a new user
  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  // Get all users with relations
  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  // Update a user by ID
  @Put(":id")
  async update(@Param("id") id: number, @Body() updateUserDTO: UpdateUserDTO) {
    return this.userService.update(id, updateUserDTO);
  }



}

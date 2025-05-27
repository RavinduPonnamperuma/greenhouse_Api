import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../schemas/user.schema";
import {Role} from "../../schemas/role.schema";

@Module({
  imports: [TypeOrmModule.forFeature([User,Role])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {

}

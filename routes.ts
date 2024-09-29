import { Routes } from '@nestjs/core';
import { UsersModule } from "./src/modules/users/users.module";

export const routes: Routes = [
  {
    path: 'user',
    module: UsersModule,
  },

];

import { Routes } from '@nestjs/core';
import {ActionModule} from "./src/modules/action/action.module";
import {UsersModule} from "./src/modules/users/users.module";


export const routes: Routes = [
  {
    path: 'action',
    module: ActionModule,
  },  {
    path: 'user',
    module: UsersModule,
  },

];

import { Routes } from '@nestjs/core';
import {ActionModule} from "./src/modules/action/action.module";
import {UsersModule} from "./src/modules/users/users.module";
import { PolytunnelModule } from "./src/modules/polytunnel/polytunnel.module";


export const routes: Routes = [
  {
    path: 'action',
    module: ActionModule,
  },  {
    path: 'user',
    module: UsersModule,
  },  {
    path: 'polytunnel',
    module: PolytunnelModule,
  },

];

import { Routes } from '@nestjs/core';
import {ActionModule} from "./src/modules/action/action.module";


export const routes: Routes = [
  {
    path: 'action',
    module: ActionModule,
  },

];

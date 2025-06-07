import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {ConfigModule} from "@nestjs/config";
import {RouterModule} from "@nestjs/core";
import {TypeOrmModule} from "@nestjs/typeorm";
import {routes} from "../routes";
import {dataSourceOptions} from "./config/typeorm.config";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {MqttService} from "./modules/mqtt/mqtt.service";
import {SensorDataService} from "./modules/sensor-data/sensor-data.service";
import {ActionModule} from "./modules/action/action.module";
import {UsersModule} from "./modules/users/users.module";
import { PolytunnelModule } from "./modules/polytunnel/polytunnel.module";
import {SensorDataModule} from "./modules/sensor-data/sensor-data.module";
import {PlantModule} from "./modules/plant/plant.module";



@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(dataSourceOptions),
        RouterModule.register(routes),
        EventEmitterModule.forRoot(),
        ActionModule,
        UsersModule,
        PolytunnelModule,
        SensorDataModule,
        PlantModule
    ],
    controllers: [AppController,],
    providers: [AppService,
        MqttService
    ],
})
export class AppModule {
}

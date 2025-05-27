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
import {SensorData} from "./schemas/sensor-data.schema";
import {SensorDataService} from "./modules/sensor-data/sensor-data.service";
import {ActionModule} from "./modules/action/action.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(dataSourceOptions),
        RouterModule.register(routes),
        EventEmitterModule.forRoot(),
        TypeOrmModule.forFeature([SensorData]),
        ActionModule

    ],
    controllers: [AppController,],
    providers: [AppService,
        MqttService,
        SensorDataService,
    ],
})
export class AppModule {
}

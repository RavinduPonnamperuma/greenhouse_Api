import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { RouterModule } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { routes } from "../routes";
import { dataSourceOptions } from "./database-connection/typeorm.config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MqttService } from "./modules/mqtt/mqtt.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    RouterModule.register(routes),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService,
  MqttService],
})
export class AppModule {}

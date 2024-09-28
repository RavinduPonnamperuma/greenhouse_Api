import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  private readonly logger;
  getHello(): string {
    this.logger.log("Initializing module and connecting to broker");
    return "Hello World!";
  }
}

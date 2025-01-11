// import { Injectable } from "@nestjs/common";
//
// @Injectable()
// export class AppService {
//   private readonly logger;
//   getHello(): string {
//     this.logger.log("Initializing module and connecting to broker");
//     return "Hello World!";
//   }
// }
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  // private readonly logger = new Logger(AppService.name); // Initialize Logger

  getHello(): string {
    // this.logger.log('Initializing module and connecting to broker'); // Now this works
    return 'Hello Ravindu!';
  }
}

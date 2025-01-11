// // import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
// // import * as mqtt from 'mqtt'
// //
// // @Injectable()
// // export class MqttService implements OnModuleInit {
// //   private client: mqtt.MqttClient
// //   private readonly logger = new Logger(MqttService.name)
// //
// //   constructor() {
// //     this.logger.log('MqttService instantiated')
// //   }
// //
// //   onModuleInit() {
// //     this.logger.log('Initializing module and connecting to broker')
// //     this.connectToBroker()
// //   }
// //
// //   private connectToBroker() {
// //     const options: mqtt.IClientOptions = {
// //       host: '15.235.192.41',
// //       port: 1883,
// //       username: 'sadee',
// //       password: 'qwerty',
// //     }
// //
// //     this.client = mqtt.connect(options)
// //     this.logger.log(`Attempting to connect to MQTT broker at ${options.host}:${options.port}`)
// //
// //     const topics = ['esp/output1', 'esp/1/adxl345', 'esp/sensor', 'esp/1/accident']
// //
// //     this.client.on('connect', () => {
// //       this.logger.log('Successfully connected to MQTT broker')
// //       this.client.subscribe('esp/output1', {}, (error, granted) => {
// //         if (error) {
// //           this.logger.error('Subscription error:', error)
// //         } else {
// //           granted.forEach(grant => {
// //             this.logger.log(`Successfully subscribed to topic ${grant.topic} with QoS ${grant.qos}`)
// //           })
// //         }
// //       })
// //     })
// //
// //     this.client.on('message', (topic, message) => {
// //       this.handleMessage('esp/output1', message.toString())
// //     })
// //
// //   }
// //
// //   private handleMessage(topic: string, message: string) {
// //     const sensorData = JSON.parse(message)
// //      console.log(sensorData,topic)
// //   }
// // }




// import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
// import * as mqtt from 'mqtt';
// import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Server } from 'socket.io';
//
// @Injectable()
// @WebSocketGateway({ cors: true }) // Enable CORS for WebSocket
// export class MqttService implements OnModuleInit {
//   private client: mqtt.MqttClient;
//   private readonly logger = new Logger(MqttService.name);
//
//   @WebSocketServer()
//   private server: Server; // WebSocket server
//
//   constructor() {
//     this.logger.log('MqttService instantiated');
//   }
//
//   onModuleInit() {
//     this.logger.log('Initializing module and connecting to broker');
//     this.connectToBroker();
//   }
//
//   private connectToBroker() {
//     const options: mqtt.IClientOptions = {
//       host: '15.235.192.41',
//       port: 1883,
//       username: 'sadee',
//       password: 'qwerty',
//     };
//
//     this.client = mqtt.connect(options);
//     this.logger.log(`Attempting to connect to MQTT broker at ${options.host}:${options.port}`);
//
//     this.client.on('connect', () => {
//       this.logger.log('Successfully connected to MQTT broker');
//       this.client.subscribe('esp/output1', {}, (error, granted) => {
//         if (error) {
//           this.logger.error('Subscription error:', error);
//         } else {
//           granted.forEach((grant) => {
//             this.logger.log(`Successfully subscribed to topic ${grant.topic} with QoS ${grant.qos}`);
//           });
//         }
//       });
//     });
//
//     this.client.on('message', (topic, message) => {
//       this.handleMessage(topic, message.toString());
//     });
//   }
//
//   private handleMessage(topic: string, message: string) {
//     try {
//       const sensorData = JSON.parse(message);
//       this.logger.log(`Received message on topic ${topic}: ${JSON.stringify(sensorData)}`);
//       this.emitSensorData(topic, sensorData); // Emit data to WebSocket
//     } catch (error) {
//       this.logger.error('Error parsing MQTT message:', error);
//     }
//   }
//
//   private emitSensorData(topic: string, sensorData: any) {
//     this.server.emit('sensorData', { topic, sensorData });
//     this.logger.log('Sensor data emitted to WebSocket');
//   }
// }


import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import {SensorDataService} from "../../sensor-data/sensor-data.service";// Import the service

@Injectable()
@WebSocketGateway({ cors: true })
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;
  private readonly logger = new Logger(MqttService.name);

  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly sensorDataService: SensorDataService,  // Inject SensorDataService
  ) {
    this.logger.log('MqttService instantiated');
  }

  onModuleInit() {
    this.logger.log('Initializing module and connecting to broker');
    this.connectToBroker();
  }

  private connectToBroker() {
    const options: mqtt.IClientOptions = {
      host: '15.235.192.41',
      port: 1883,
      username: 'sadee',
      password: 'qwerty',
    };

    this.client = mqtt.connect(options);
    this.logger.log(`Attempting to connect to MQTT broker at ${options.host}:${options.port}`);

    this.client.on('connect', () => {
      this.logger.log('Successfully connected to MQTT broker');
      const topics = ['esp/output1', 'esp/1/adxl345', 'esp/sensor', 'esp/1/accident'];
      this.client.subscribe(topics, {}, (error, granted) => {
        if (error) {
          this.logger.error('Subscription error:', error);
        } else {
          granted.forEach((grant) => {
            this.logger.log(`Successfully subscribed to topic ${grant.topic} with QoS ${grant.qos}`);
          });
        }
      });
    });

    this.client.on('message', (topic, message) => {
      this.handleMessage(topic, message.toString());
    });
  }

  private async handleMessage(topic: string, message: string) {
    try {
      const sensorData = JSON.parse(message);
      this.logger.log(`Received message on topic ${topic}: ${JSON.stringify(sensorData)}`);
      await this.saveSensorDataToDatabase(topic, sensorData);  // Save data to DB
      this.emitSensorData(topic, sensorData);
    } catch (error) {
      this.logger.error('Error parsing MQTT message:', error);
    }
  }

  private async saveSensorDataToDatabase(topic: string, sensorData: any) {
    try {
      await this.sensorDataService.saveSensorData(topic, sensorData);
      this.logger.log('Sensor data saved to database');
    } catch (error) {
      this.logger.error('Error saving sensor data to database:', error);
    }
  }

  private emitSensorData(topic: string, sensorData: any) {
    this.server.emit('sensorData', { topic, sensorData });
    this.logger.log('Sensor data emitted to WebSocket');
  }
}



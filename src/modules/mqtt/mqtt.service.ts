import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import * as mqtt from 'mqtt';
import {SensorDataService} from "../sensor-data/sensor-data.service";

@Injectable()
export class MqttService implements OnModuleInit {
    private client: mqtt.MqttClient;
    private readonly logger = new Logger(MqttService.name);

     sensorMapping = {
        humidity: 1,
        moisture: 2,
        temperature: 3
    };

    constructor(
        private sensorDataService: SensorDataService
    ) {
        this.logger.log('MqttService instantiated');

    }

    onModuleInit() {
        this.logger.log('Initializing module and connecting to broker');
        this.connectToBroker();
    }

    private connectToBroker() {
        const options: mqtt.IClientOptions = {
            host: '84.247.164.45',
            port: 1883,
            username: 'sdeelz',
            password: 'Qwerty',
        };

        this.client = mqtt.connect('mqtt://84.247.164.45:1883', options);
        this.logger.log(`Attempting to connect to MQTT broker at ${options.host}:${options.port}`);

        this.client.on('connect', () => {
            this.logger.log('Successfully connected to MQTT broker');

            this.client.subscribe('esp/output1', {qos: 1}, (error, granted) => {
                if (error) {
                    this.logger.error('Subscription error for esp/output1:', error.message);
                } else {
                    granted.forEach((grant) => {
                        this.logger.log(`Successfully subscribed to topic ${grant.topic} with QoS ${grant.qos}`);
                    });
                }
            });
            this.client.subscribe('esp/1/accident', {qos: 1}, (error, granted) => {
                if (error) {
                    this.logger.error('Subscription error for esp/1/accident:', error.message);
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

        this.client.on('error', (error) => {
            this.logger.error('MQTT client error:', error.message);
        });

        this.client.on('close', () => {
            this.logger.warn('Disconnected from MQTT broker');
        });
    }

    private async handleMessage(topic: string, message: string) {
        try {
            const sensorData = JSON.parse(message);
            const data = {
                topic,
                data: sensorData,
            };

            //save line
            await this.saveSensorData(topic, sensorData);
        } catch (error) {
            this.logger.error(`Failed to parse message on topic ${message}`);
        }
    }

    async saveSensorData(topic: string, data: any) {

        for (const key of Object.keys(data)) {
            const sensorId = this.sensorMapping[key];
            if (sensorId !== undefined) {
                const sensorData = {
                    topic: key,
                    sensorId,
                    value: data[key]
                };
                await this.sensorDataService.saveSensorData(sensorData);
            } else {
                console.warn(`Unknown sensor key: ${key}`);
            }
        }
    }


    private publish(topic: string, message: string) {
        if (this.client?.connected) {
            this.client.publish(topic, message, { qos: 1 }, (err) => {
                if (err) {
                    this.logger.error(`Failed to publish to ${topic}: ${err.message}`);
                } else {
                    this.logger.log(`Message "${message}" sent to ${topic}`);
                }
            });
        } else {
            this.logger.warn(`MQTT client not connected. Cannot send to ${topic}`);
        }
    }

    turnOnLed(ledNumber: number) {
        const topic = `esp/1/led${ledNumber}`;
        this.publish(topic, 'ON');
    }

    turnOffLed(ledNumber: number) {
        const topic = `esp/1/led${ledNumber}`;
        this.publish(topic, 'OFF');
    }

}
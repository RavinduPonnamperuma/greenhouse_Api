import {Injectable, OnModuleInit, Logger} from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
    private client: mqtt.MqttClient;
    private readonly logger = new Logger(MqttService.name);

    constructor() {
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
            this.logger.log(`Received message on topic ${topic}: ${JSON.stringify(sensorData)}`);

            console.log(`Received topic ${topic}: ${JSON.stringify(sensorData)}`);

        } catch (error) {
            this.logger.error(`Failed to parse message on topic ${topic}: ${message}`, error);
        }
    }

}
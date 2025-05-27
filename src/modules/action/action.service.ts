import {Injectable} from '@nestjs/common';
import {MqttService} from "../mqtt/mqtt.service";

@Injectable()
export class ActionService {
    constructor(private readonly mqttService: MqttService) {
    }

    async turnOn(ledNumber: number) {
        this.mqttService.turnOnLed(ledNumber);
        return {message: `LED ${ledNumber} turned ON`};
    }

    async turnOff(ledNumber: number) {
        this.mqttService.turnOffLed(ledNumber);
        return {message: `LED ${ledNumber} turned OFF`};
    }
}

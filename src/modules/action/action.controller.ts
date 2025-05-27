import {Controller, Get} from '@nestjs/common';
import {ActionService} from './action.service';

@Controller()
export class ActionController {
    constructor(private readonly actionService: ActionService) {
    }

    @Get('off')
    async turnOff() {
        return  await this.actionService.turnOff(2)
    }

    @Get()
    async turnOn() {
       return  await this.actionService.turnOn(3)
    }
}

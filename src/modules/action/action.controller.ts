import {Controller, Get, Param} from '@nestjs/common';
import {ActionService} from './action.service';

@Controller()
export class ActionController {
    constructor(private readonly actionService: ActionService) {
    }

    @Get('off/:id')
    async turnOff(
        @Param('id') id: number,
    ) {
        return  await this.actionService.turnOff(id)
    }

    @Get(':id')
    async turnOn(
        @Param('id') id: number,
    ) {
       return  await this.actionService.turnOn(id)
    }
}

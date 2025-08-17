import {Injectable, OnModuleInit} from '@nestjs/common';
import {MqttService} from "../mqtt/mqtt.service";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {Cron} from "@nestjs/schedule";


@Injectable()
export class ActionService implements OnModuleInit {

    sensorMapping = {
        Water: 1,
        Fan: 2,
        Fertilizer: 3
    };


    constructor(private readonly mqttService: MqttService, @InjectRepository(DataSource)
    private dataSourceRepository: Repository<DataSource>,) {
    }

    async turnOn(componentNumber: number) {
        console.log(componentNumber)
        if (componentNumber == 1) {
            await this.waterOut(componentNumber);
        }
        await this.componentOn(componentNumber);
        this.mqttService.turnOnLed(componentNumber);
        return {message: `COMPONENT ${componentNumber} turned ON`};
    }

    async turnOff(componentNumber: number) {
        await this.componentOff(componentNumber);
        this.mqttService.turnOffLed(componentNumber);
        return {message: `COMPONENT ${componentNumber} turned OFF`};
    }


    async waterOut(tankId: number) {
        console.log(tankId)
        const result = await this.dataSourceRepository.query(`CALL use_water_fixed(?)`,[
            tankId
        ]);
        console.log(result)
        return result[0];
    }

    async componentOn(tankId: number) {
        const result = await this.dataSourceRepository.query(`CALL set_component_status(?,?)`, [
            tankId,
            'on'
        ]);
        return result[0];
    }

    async componentOff(tankId: number) {
        const result = await this.dataSourceRepository.query(`CALL set_component_status(?,?)`, [
            tankId,
            'off'
        ]);
        return result[0];
    }

    async getPolytunnelReport() {
        const result = await this.dataSourceRepository.query(`CALL set_component_status()`);
        return result[0];
    }

    // Cron for morning tasks at 7:00 AM
    @Cron('0 7 * * *')
    async runMorningTasks() {
        await this.checkAndRunTasks('morning');
    }

    // Cron for evening tasks at 4:00 PM
    @Cron('0 16 * * *')
    async runEveningTasks() {
        await this.checkAndRunTasks('evening');
    }

    // Common function to check tasks
    private async checkAndRunTasks(type: 'morning' | 'evening') {
        const report = await this.getPolytunnelReport();
        for (const task of report) {
            if (type === 'morning' && task.isMorning === 1) {
                await this.runTask(task);
            } else if (type === 'evening' && task.isEvening === 1) {
                await this.runTask(task);
            }
        }
    }

    async runTask(task: any) {
        if (!task.components || task.components.length === 0) return;

        for (const comp of task.components) {
            // Match component with task type
            if (
                (task.taskType === 'watering' && comp.componentName.toLowerCase() === 'water') ||
                (task.taskType === 'fertilizing' && comp.componentName.toLowerCase() === 'fertilizer') ||
                (task.taskType === 'ventilation' && comp.componentName.toLowerCase() === 'fan')
            ) {
                // Turn on the component
                await this.turnOn(comp.componentId);
                console.log(`Component ${comp.componentName} turned ON for ${task.plantName}`);

                // Turn off after duration
                setTimeout(async () => {
                    await this.turnOff(comp.componentId);
                    console.log(`Component ${comp.componentName} turned OFF for ${task.plantName}`);
                }, task.duration * 60 * 1000); // duration in minutes
            }
        }
    }


    async onModuleInit() {
        // const report = await this.getPolytunnelReport();
        // console.log('Polytunnel report:', report); // shows array of tasks
        //
        // // Access components of each task
        // for (const task of report) {
        //     // console.log(`Components for task :`, task.components);
        // }
        //
        // // Run every 2 minutes
        // setInterval(async () => {
        //     await this.runPolytunnelTasks();
        // }, 2 * 60 * 1000); // 2 minutes
    }


    private async runPolytunnelTasks() {
        const report = await this.getPolytunnelReport();
        console.log('Polytunnel report:', report.components);

        for (const task of report) {
            if (task.isMorning === 1) {
                await this.runTask(task);
            }
            if (task.isEvening === 1) {
                await this.runTask(task);
            }
        }
    }

}
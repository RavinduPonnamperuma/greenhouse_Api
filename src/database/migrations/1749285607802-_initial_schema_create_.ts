import {MigrationInterface, QueryRunner} from "typeorm";

export class _initialSchemaCreate_1749285607802 implements MigrationInterface {
    name = '_initialSchemaCreate_1749285607802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userName\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`contact\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_sensor_data\` (\`id\` int NOT NULL AUTO_INCREMENT, \`topic\` varchar(255) NOT NULL, \`value\` float NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`sensorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_sensors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`timestamp\` datetime NOT NULL, \`deviceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_harvest\` (\`id\` int NOT NULL AUTO_INCREMENT, \`harvestDate\` varchar(255) NOT NULL, \`sellingPrice\` decimal(10,2) NOT NULL, \`quantity\` decimal(10,2) NOT NULL, \`variety\` varchar(255) NOT NULL, \`plantId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_irrigation_schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`scheduledDate\` varchar(255) NOT NULL, \`scheduledTime\` varchar(255) NOT NULL, \`taskType\` varchar(255) NOT NULL, \`duration\` int NOT NULL, \`isCompleted\` tinyint NOT NULL DEFAULT 0, \`plantId\` int NULL, \`irrigationId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_irrigation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`waterPerDay\` decimal(10,2) NOT NULL, \`fertilizerPerDay\` decimal(10,2) NOT NULL, \`timesPerDay\` int NOT NULL, \`isMorning\` tinyint NOT NULL DEFAULT 0, \`morningTime\` varchar(255) NULL, \`isEvening\` tinyint NOT NULL DEFAULT 0, \`eveningTime\` varchar(255) NULL, \`duration\` int NOT NULL, \`plantId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_plant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`plantName\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`cost\` int NOT NULL, \`harvestTime\` int NOT NULL, \`startDate\` varchar(255) NOT NULL, \`endTime\` varchar(255) NOT NULL, \`polytunnelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_polytunnel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`size\` varchar(255) NOT NULL, \`length\` int NOT NULL, \`width\` int NOT NULL, \`numberOfPlants\` varchar(255) NOT NULL, \`userId\` int NULL, \`deviceId\` int NULL, UNIQUE INDEX \`REL_6fc728dbc33e119f1400d0a783\` (\`deviceId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_water_tank_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`outDate\` varchar(255) NOT NULL, \`outCapacity\` decimal(10,2) NOT NULL, \`note\` varchar(255) NULL, \`waterTankId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_water_tank\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tankNumber\` varchar(255) NOT NULL, \`capacity\` int NOT NULL, \`status\` varchar(255) NOT NULL, \`polytunnelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_sensor_data\` ADD CONSTRAINT \`FK_6f0af0cc2bb410913a159b515c0\` FOREIGN KEY (\`sensorId\`) REFERENCES \`tbl_sensors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_sensors\` ADD CONSTRAINT \`FK_20f17507e1ef1c1f0f2301c07da\` FOREIGN KEY (\`deviceId\`) REFERENCES \`tbl_device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_harvest\` ADD CONSTRAINT \`FK_9b789faa6c5dd1b2733aa2da9ef\` FOREIGN KEY (\`plantId\`) REFERENCES \`tbl_plant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_irrigation_schedule\` ADD CONSTRAINT \`FK_79bef0435eb9c09095353fcacae\` FOREIGN KEY (\`plantId\`) REFERENCES \`tbl_plant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_irrigation_schedule\` ADD CONSTRAINT \`FK_3eb082ec34c978cbdcad97de98a\` FOREIGN KEY (\`irrigationId\`) REFERENCES \`tbl_irrigation\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_irrigation\` ADD CONSTRAINT \`FK_4303b85258191b03c9336b1294e\` FOREIGN KEY (\`plantId\`) REFERENCES \`tbl_plant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_plant\` ADD CONSTRAINT \`FK_43e433d056dc4195058801f8b1a\` FOREIGN KEY (\`polytunnelId\`) REFERENCES \`tbl_polytunnel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_polytunnel\` ADD CONSTRAINT \`FK_159e3333c8069e3de96a047ab4e\` FOREIGN KEY (\`userId\`) REFERENCES \`tbl_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_polytunnel\` ADD CONSTRAINT \`FK_6fc728dbc33e119f1400d0a783b\` FOREIGN KEY (\`deviceId\`) REFERENCES \`tbl_device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_water_tank_history\` ADD CONSTRAINT \`FK_01142787deec609bc739b3488b8\` FOREIGN KEY (\`waterTankId\`) REFERENCES \`tbl_water_tank\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_water_tank\` ADD CONSTRAINT \`FK_73a7930e843c37b7ad29aeb49a9\` FOREIGN KEY (\`polytunnelId\`) REFERENCES \`tbl_polytunnel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_water_tank\` DROP FOREIGN KEY \`FK_73a7930e843c37b7ad29aeb49a9\``);
        await queryRunner.query(`ALTER TABLE \`tbl_water_tank_history\` DROP FOREIGN KEY \`FK_01142787deec609bc739b3488b8\``);
        await queryRunner.query(`ALTER TABLE \`tbl_polytunnel\` DROP FOREIGN KEY \`FK_6fc728dbc33e119f1400d0a783b\``);
        await queryRunner.query(`ALTER TABLE \`tbl_polytunnel\` DROP FOREIGN KEY \`FK_159e3333c8069e3de96a047ab4e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_plant\` DROP FOREIGN KEY \`FK_43e433d056dc4195058801f8b1a\``);
        await queryRunner.query(`ALTER TABLE \`tbl_irrigation\` DROP FOREIGN KEY \`FK_4303b85258191b03c9336b1294e\``);
        await queryRunner.query(`ALTER TABLE \`tbl_irrigation_schedule\` DROP FOREIGN KEY \`FK_3eb082ec34c978cbdcad97de98a\``);
        await queryRunner.query(`ALTER TABLE \`tbl_irrigation_schedule\` DROP FOREIGN KEY \`FK_79bef0435eb9c09095353fcacae\``);
        await queryRunner.query(`ALTER TABLE \`tbl_harvest\` DROP FOREIGN KEY \`FK_9b789faa6c5dd1b2733aa2da9ef\``);
        await queryRunner.query(`ALTER TABLE \`tbl_sensors\` DROP FOREIGN KEY \`FK_20f17507e1ef1c1f0f2301c07da\``);
        await queryRunner.query(`ALTER TABLE \`tbl_sensor_data\` DROP FOREIGN KEY \`FK_6f0af0cc2bb410913a159b515c0\``);
        await queryRunner.query(`DROP TABLE \`tbl_water_tank\``);
        await queryRunner.query(`DROP TABLE \`tbl_water_tank_history\``);
        await queryRunner.query(`DROP INDEX \`REL_6fc728dbc33e119f1400d0a783\` ON \`tbl_polytunnel\``);
        await queryRunner.query(`DROP TABLE \`tbl_polytunnel\``);
        await queryRunner.query(`DROP TABLE \`tbl_plant\``);
        await queryRunner.query(`DROP TABLE \`tbl_irrigation\``);
        await queryRunner.query(`DROP TABLE \`tbl_irrigation_schedule\``);
        await queryRunner.query(`DROP TABLE \`tbl_harvest\``);
        await queryRunner.query(`DROP TABLE \`tbl_device\``);
        await queryRunner.query(`DROP TABLE \`tbl_sensors\``);
        await queryRunner.query(`DROP TABLE \`tbl_sensor_data\``);
        await queryRunner.query(`DROP TABLE \`tbl_user\``);
    }

}

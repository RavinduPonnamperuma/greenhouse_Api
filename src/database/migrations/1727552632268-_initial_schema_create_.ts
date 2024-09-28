import { MigrationInterface, QueryRunner } from "typeorm";

export class _initialSchemaCreate_1727552632268 implements MigrationInterface {
    name = '_initialSchemaCreate_1727552632268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_plant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`plantName\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_polytunnel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`plantId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_schedule\` (\`schedulingId\` int NOT NULL AUTO_INCREMENT, \`schedulingType\` varchar(255) NOT NULL, \`schedulingName\` varchar(255) NOT NULL, \`schedulingDate\` datetime NOT NULL, PRIMARY KEY (\`schedulingId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_actuations\` (\`actuationId\` int NOT NULL AUTO_INCREMENT, \`deviceDeviceId\` int NULL, \`scheduleSchedulingId\` int NULL, PRIMARY KEY (\`actuationId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_device_config\` (\`configId\` int NOT NULL AUTO_INCREMENT, \`configuration\` varchar(255) NOT NULL, \`configTimestamp\` datetime NOT NULL, \`deviceDeviceId\` int NULL, PRIMARY KEY (\`configId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_device\` (\`deviceId\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`polytunnelId\` int NULL, PRIMARY KEY (\`deviceId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_sensor\` (\`sensorId\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`deviceDeviceId\` int NULL, PRIMARY KEY (\`sensorId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`permission\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_notification\` (\`notificationId\` int NOT NULL AUTO_INCREMENT, \`message\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`timestamp\` datetime NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`notificationId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_polytunnel\` ADD CONSTRAINT \`FK_a93abc4d20675271806b2e36f37\` FOREIGN KEY (\`plantId\`) REFERENCES \`tbl_plant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_actuations\` ADD CONSTRAINT \`FK_9c7faded491ec2b7f83783cabf6\` FOREIGN KEY (\`deviceDeviceId\`) REFERENCES \`tbl_device\`(\`deviceId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_actuations\` ADD CONSTRAINT \`FK_8ecb8daa2ca8de6473521e1e31f\` FOREIGN KEY (\`scheduleSchedulingId\`) REFERENCES \`tbl_schedule\`(\`schedulingId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_device_config\` ADD CONSTRAINT \`FK_de40b15b656f3b2f1134b50dd34\` FOREIGN KEY (\`deviceDeviceId\`) REFERENCES \`tbl_device\`(\`deviceId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_device\` ADD CONSTRAINT \`FK_8e0067a098b595be82134d937a2\` FOREIGN KEY (\`polytunnelId\`) REFERENCES \`tbl_polytunnel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_sensor\` ADD CONSTRAINT \`FK_6c37d979ff5b4914549f30fcbbb\` FOREIGN KEY (\`deviceDeviceId\`) REFERENCES \`tbl_device\`(\`deviceId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_notification\` ADD CONSTRAINT \`FK_327b0220f78f6e4842dafadf17b\` FOREIGN KEY (\`userId\`) REFERENCES \`tbl_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD CONSTRAINT \`FK_689ff45769d838316dd4e43b7c8\` FOREIGN KEY (\`roleId\`) REFERENCES \`tbl_role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP FOREIGN KEY \`FK_689ff45769d838316dd4e43b7c8\``);
        await queryRunner.query(`ALTER TABLE \`tbl_notification\` DROP FOREIGN KEY \`FK_327b0220f78f6e4842dafadf17b\``);
        await queryRunner.query(`ALTER TABLE \`tbl_sensor\` DROP FOREIGN KEY \`FK_6c37d979ff5b4914549f30fcbbb\``);
        await queryRunner.query(`ALTER TABLE \`tbl_device\` DROP FOREIGN KEY \`FK_8e0067a098b595be82134d937a2\``);
        await queryRunner.query(`ALTER TABLE \`tbl_device_config\` DROP FOREIGN KEY \`FK_de40b15b656f3b2f1134b50dd34\``);
        await queryRunner.query(`ALTER TABLE \`tbl_actuations\` DROP FOREIGN KEY \`FK_8ecb8daa2ca8de6473521e1e31f\``);
        await queryRunner.query(`ALTER TABLE \`tbl_actuations\` DROP FOREIGN KEY \`FK_9c7faded491ec2b7f83783cabf6\``);
        await queryRunner.query(`ALTER TABLE \`tbl_polytunnel\` DROP FOREIGN KEY \`FK_a93abc4d20675271806b2e36f37\``);
        await queryRunner.query(`DROP TABLE \`tbl_user\``);
        await queryRunner.query(`DROP TABLE \`tbl_notification\``);
        await queryRunner.query(`DROP TABLE \`tbl_role\``);
        await queryRunner.query(`DROP TABLE \`tbl_sensor\``);
        await queryRunner.query(`DROP TABLE \`tbl_device\``);
        await queryRunner.query(`DROP TABLE \`tbl_device_config\``);
        await queryRunner.query(`DROP TABLE \`tbl_actuations\``);
        await queryRunner.query(`DROP TABLE \`tbl_schedule\``);
        await queryRunner.query(`DROP TABLE \`tbl_polytunnel\``);
        await queryRunner.query(`DROP TABLE \`tbl_plant\``);
    }

}

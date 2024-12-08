import { MigrationInterface, QueryRunner } from "typeorm";

export class _initialSchemaUpdate_1733632845583 implements MigrationInterface {
    name = '_initialSchemaUpdate_1733632845583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`permission\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_notification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`message\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`timestamp\` datetime NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`confirmPassword\` varchar(255) NOT NULL, \`mobileNumber\` int NOT NULL, \`address\` varchar(255) NOT NULL, \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_plant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`plantName\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_polytunnel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`plantId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_sensor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`deviceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_device_config\` (\`id\` int NOT NULL AUTO_INCREMENT, \`configuration\` varchar(255) NOT NULL, \`configTimestamp\` datetime NOT NULL, \`deviceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_device\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`polytunnelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_actuations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deviceId\` int NULL, \`scheduleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`schedulingType\` varchar(255) NOT NULL, \`schedulingName\` varchar(255) NOT NULL, \`schedulingDate\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_notification\` ADD CONSTRAINT \`FK_327b0220f78f6e4842dafadf17b\` FOREIGN KEY (\`userId\`) REFERENCES \`tbl_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` ADD CONSTRAINT \`FK_689ff45769d838316dd4e43b7c8\` FOREIGN KEY (\`roleId\`) REFERENCES \`tbl_role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_polytunnel\` ADD CONSTRAINT \`FK_a93abc4d20675271806b2e36f37\` FOREIGN KEY (\`plantId\`) REFERENCES \`tbl_plant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_sensor\` ADD CONSTRAINT \`FK_275590bb068d4339597f2b06495\` FOREIGN KEY (\`deviceId\`) REFERENCES \`tbl_device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_device_config\` ADD CONSTRAINT \`FK_f0134289c79e850afc2759639a8\` FOREIGN KEY (\`deviceId\`) REFERENCES \`tbl_device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_device\` ADD CONSTRAINT \`FK_8e0067a098b595be82134d937a2\` FOREIGN KEY (\`polytunnelId\`) REFERENCES \`tbl_polytunnel\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_actuations\` ADD CONSTRAINT \`FK_1749898f21e786576ccca22b3bc\` FOREIGN KEY (\`deviceId\`) REFERENCES \`tbl_device\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_actuations\` ADD CONSTRAINT \`FK_ad06722393e6f423ddcb0f0bdcb\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`tbl_schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_actuations\` DROP FOREIGN KEY \`FK_ad06722393e6f423ddcb0f0bdcb\``);
        await queryRunner.query(`ALTER TABLE \`tbl_actuations\` DROP FOREIGN KEY \`FK_1749898f21e786576ccca22b3bc\``);
        await queryRunner.query(`ALTER TABLE \`tbl_device\` DROP FOREIGN KEY \`FK_8e0067a098b595be82134d937a2\``);
        await queryRunner.query(`ALTER TABLE \`tbl_device_config\` DROP FOREIGN KEY \`FK_f0134289c79e850afc2759639a8\``);
        await queryRunner.query(`ALTER TABLE \`tbl_sensor\` DROP FOREIGN KEY \`FK_275590bb068d4339597f2b06495\``);
        await queryRunner.query(`ALTER TABLE \`tbl_polytunnel\` DROP FOREIGN KEY \`FK_a93abc4d20675271806b2e36f37\``);
        await queryRunner.query(`ALTER TABLE \`tbl_user\` DROP FOREIGN KEY \`FK_689ff45769d838316dd4e43b7c8\``);
        await queryRunner.query(`ALTER TABLE \`tbl_notification\` DROP FOREIGN KEY \`FK_327b0220f78f6e4842dafadf17b\``);
        await queryRunner.query(`DROP TABLE \`tbl_schedule\``);
        await queryRunner.query(`DROP TABLE \`tbl_actuations\``);
        await queryRunner.query(`DROP TABLE \`tbl_device\``);
        await queryRunner.query(`DROP TABLE \`tbl_device_config\``);
        await queryRunner.query(`DROP TABLE \`tbl_sensor\``);
        await queryRunner.query(`DROP TABLE \`tbl_polytunnel\``);
        await queryRunner.query(`DROP TABLE \`tbl_plant\``);
        await queryRunner.query(`DROP TABLE \`tbl_user\``);
        await queryRunner.query(`DROP TABLE \`tbl_notification\``);
        await queryRunner.query(`DROP TABLE \`tbl_role\``);
    }

}

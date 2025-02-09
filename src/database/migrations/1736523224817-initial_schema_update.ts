import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchemaUpdate1736523224817 implements MigrationInterface {
    name = 'InitialSchemaUpdate1736523224817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sensor_data\` (\`id\` int NOT NULL AUTO_INCREMENT, \`topic\` varchar(255) NOT NULL, \`data\` json NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`sensor_data\``);
    }

}

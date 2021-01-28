import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCategory1610489112346 implements MigrationInterface {
    name = 'updateCategory1610489112346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "label"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "label" nvarchar(33) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "slug" varchar(32) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "slug" varchar(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "label"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "label" nvarchar(30) NOT NULL`);
    }

}

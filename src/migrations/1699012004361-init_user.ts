import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUser1699012004361 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //create user table
    await queryRunner.query(
      `CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "login" VARCHAR(255) NOT NULL,
                "password" VARCHAR(255) NOT NULL
            );`,
    );
    //add constraint on login
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "unique_login_user" UNIQUE ("login");`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

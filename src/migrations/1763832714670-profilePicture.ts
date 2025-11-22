import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfilePicture1763832714670 implements MigrationInterface {
  name = 'ProfilePicture1763832714670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "character" ADD "imageId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "character" ADD CONSTRAINT "UQ_9646bf9c82816109b77ce6fc30f" UNIQUE ("imageId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "character" ADD CONSTRAINT "FK_9646bf9c82816109b77ce6fc30f" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "character" DROP CONSTRAINT "FK_9646bf9c82816109b77ce6fc30f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "character" DROP CONSTRAINT "UQ_9646bf9c82816109b77ce6fc30f"`,
    );
    await queryRunner.query(`ALTER TABLE "character" DROP COLUMN "imageId"`);
  }
}

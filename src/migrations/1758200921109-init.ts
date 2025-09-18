import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1758200921109 implements MigrationInterface {
    name = 'Init1758200921109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "maxValue" integer, "dynamic" boolean, "color" character varying, "statsPointCost" double precision DEFAULT '1', "gameId" uuid NOT NULL, CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "mimeType" character varying NOT NULL, "file" bytea NOT NULL, "sizeInBytes" integer NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "startingStatsPoints" integer DEFAULT '0', "startingMoney" double precision DEFAULT '0', "imageId" uuid, "gameMasterId" uuid NOT NULL, CONSTRAINT "REL_39b973b2f959cd6a68daa6f381" UNIQUE ("imageId"), CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "effect" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "duration" integer NOT NULL, "attributeModifiers" jsonb, "gameId" uuid NOT NULL, CONSTRAINT "PK_d9f2bcb19b53f7f26e0b7c484e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."item_type_enum" AS ENUM('consumable', 'equipment', 'misc')`);
        await queryRunner.query(`CREATE TYPE "public"."item_effecttarget_enum" AS ENUM('self', 'target', 'area')`);
        await queryRunner.query(`CREATE TYPE "public"."item_slot_enum" AS ENUM('head', 'body', 'legs', 'feet', 'hands', 'weapon', 'shield', 'ring', 'amulet', 'earing')`);
        await queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "rarity" integer NOT NULL, "type" "public"."item_type_enum" NOT NULL, "marketValue" integer NOT NULL, "attributeModifiers" jsonb, "effectTarget" "public"."item_effecttarget_enum" NOT NULL, "slot" "public"."item_slot_enum" NOT NULL, "gameId" uuid NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "character" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "gameId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_6c4aec48c564968be15078b8ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "characterId" uuid NOT NULL, "itemId" uuid NOT NULL, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "character_effect" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "turnsRemaining" integer NOT NULL, "characterId" uuid NOT NULL, "effectId" uuid NOT NULL, CONSTRAINT "PK_4fabba72f75951da75ace73c5bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "character_attribute" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "investedStatPoints" integer NOT NULL DEFAULT '0', "dynamicValue" double precision DEFAULT '0', "characterId" uuid NOT NULL, "attributeId" uuid NOT NULL, CONSTRAINT "PK_c645dabb88cad8b7bb2d5b843d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attribute" ADD CONSTRAINT "FK_4507193efa032ddc75e94c0d9b6" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_d78db2699a410032564d132074f" FOREIGN KEY ("gameMasterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_39b973b2f959cd6a68daa6f3814" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "effect" ADD CONSTRAINT "FK_cc1f8c468299e8d91bcd7e31fb2" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item" ADD CONSTRAINT "FK_188ad4a77600892026bff4823f4" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_deaa8cb01bd0a343e8b649d32ce" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_04c2fb52adfa5265763de8c4464" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_d17886753b1e97f07b62af39aab" FOREIGN KEY ("characterId") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_6227c61eff466680f9bb9933305" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character_effect" ADD CONSTRAINT "FK_6f8d32646cd388c667b27e5135d" FOREIGN KEY ("characterId") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character_effect" ADD CONSTRAINT "FK_48a77c068e931409ab7312a46ca" FOREIGN KEY ("effectId") REFERENCES "effect"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character_attribute" ADD CONSTRAINT "FK_2ad63bddf4362457c649b91d4ae" FOREIGN KEY ("characterId") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "character_attribute" ADD CONSTRAINT "FK_d2b97cd736a283c7e46bf02020b" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "character_attribute" DROP CONSTRAINT "FK_d2b97cd736a283c7e46bf02020b"`);
        await queryRunner.query(`ALTER TABLE "character_attribute" DROP CONSTRAINT "FK_2ad63bddf4362457c649b91d4ae"`);
        await queryRunner.query(`ALTER TABLE "character_effect" DROP CONSTRAINT "FK_48a77c068e931409ab7312a46ca"`);
        await queryRunner.query(`ALTER TABLE "character_effect" DROP CONSTRAINT "FK_6f8d32646cd388c667b27e5135d"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_6227c61eff466680f9bb9933305"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_d17886753b1e97f07b62af39aab"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_04c2fb52adfa5265763de8c4464"`);
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_deaa8cb01bd0a343e8b649d32ce"`);
        await queryRunner.query(`ALTER TABLE "item" DROP CONSTRAINT "FK_188ad4a77600892026bff4823f4"`);
        await queryRunner.query(`ALTER TABLE "effect" DROP CONSTRAINT "FK_cc1f8c468299e8d91bcd7e31fb2"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_39b973b2f959cd6a68daa6f3814"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_d78db2699a410032564d132074f"`);
        await queryRunner.query(`ALTER TABLE "attribute" DROP CONSTRAINT "FK_4507193efa032ddc75e94c0d9b6"`);
        await queryRunner.query(`DROP TABLE "character_attribute"`);
        await queryRunner.query(`DROP TABLE "character_effect"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "character"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TYPE "public"."item_slot_enum"`);
        await queryRunner.query(`DROP TYPE "public"."item_effecttarget_enum"`);
        await queryRunner.query(`DROP TYPE "public"."item_type_enum"`);
        await queryRunner.query(`DROP TABLE "effect"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "attribute"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

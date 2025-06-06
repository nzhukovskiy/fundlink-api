import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedProposalFinishedNotificationType1744284207072 implements MigrationInterface {
    name = 'AddedProposalFinishedNotificationType1744284207072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."notification_type_enum" RENAME TO "notification_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."notification_type_enum" AS ENUM('MESSAGE', 'INVESTMENT', 'FUNDING_ROUND_DEADLINE', 'FUNDING_ROUND_CHANGE_PROPOSAL', 'FUNDING_ROUND_CHANGE_PROPOSAL_FINISHED')`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "type" TYPE "public"."notification_type_enum" USING "type"::"text"::"public"."notification_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notification_type_enum_old" AS ENUM('MESSAGE', 'INVESTMENT', 'FUNDING_ROUND_DEADLINE', 'FUNDING_ROUND_CHANGE_PROPOSAL')`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "type" TYPE "public"."notification_type_enum_old" USING "type"::"text"::"public"."notification_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."notification_type_enum_old" RENAME TO "notification_type_enum"`);
    }

}

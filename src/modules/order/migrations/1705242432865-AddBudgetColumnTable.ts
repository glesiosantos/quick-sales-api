import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddBudgetColumnTable1705242432865 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        ALTER TABLE orders ADD COLUMN is_budget BOOLEAN NOT NULL DEFAULT 'true';
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        ALTER TABLE orders DROP COLUMN is_budget;
      `)
    }
}

import { MigrationInterface, QueryRunner } from 'typeorm'

export class CustomerTable1704576566415 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS customers(
          id VARCHAR(150) PRIMARY KEY DEFAULT REPLACE(uuid_generate_v4()::TEXT,'-',''),
          name VARCHAR(150) NOT NULL,
          phone VARCHAR(11) NOT NULL UNIQUE,
          created_at TIMESTAMP NOT NULL DEFAULT 'now()',
          updated_at TIMESTAMP
        );
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('customers')
    }
}

import { MigrationInterface, QueryRunner } from 'typeorm'

export class AccountTokenTable1703918588781 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS tokens(
          id VARCHAR(150) PRIMARY KEY DEFAULT REPLACE(uuid_generate_v4()::TEXT,'-',''),
          account_id VARCHAR(150) NOT NULL,
          token VARCHAR(150) NOT NULL DEFAULT REPLACE(uuid_generate_v4()::TEXT,'-',''),
          created_at TIMESTAMP NOT NULL DEFAULT 'now()',
          updated_at TIMESTAMP DEFAULT 'now()',
          CONSTRAINT FK_ACCOUNT_TOKEN FOREIGN KEY(account_id) REFERENCES accounts(id) ON UPDATE NO ACTION
          ON DELETE CASCADE
      );
  `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('tokens')
    }
}

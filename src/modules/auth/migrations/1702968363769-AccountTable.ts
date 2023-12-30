import { MigrationInterface, QueryRunner } from 'typeorm'

export class AccountTable1702968363769 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS accounts(
                id VARCHAR(150) PRIMARY KEY DEFAULT REPLACE(uuid_generate_v4()::TEXT,'-',''),
                name VARCHAR(150) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                password VARCHAR(150) NOT NULL,
                is_admin BOOLEAN NOT NULL DEFAULT 'false',
                created_at TIMESTAMP NOT NULL DEFAULT 'now()',
                updated_at TIMESTAMP DEFAULT 'now()'
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('accounts')
    }
}

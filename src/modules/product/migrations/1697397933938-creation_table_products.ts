import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreationTableProducts1697397933938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS products(
        id VARCHAR(150) PRIMARY KEY DEFAULT REPLACE(uuid_generate_v4()::TEXT,'-',''),
        name VARCHAR(150) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL DEFAULT '0.00',
        quantity INT NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT 'now()',
        updated_at TIMESTAMP
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }
}

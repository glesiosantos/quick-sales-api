import { MigrationInterface, QueryRunner } from 'typeorm'

export class OrderTable1704578712577 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS orders(
          id VARCHAR(150) PRIMARY KEY DEFAULT REPLACE(uuid_generate_v4()::TEXT,'-',''),
          customer_id VARCHAR NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT 'now()',
          CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON UPDATE NO ACTION ON DELETE CASCADE
        );
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('orders')
    }
}

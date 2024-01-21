import { MigrationInterface, QueryRunner } from 'typeorm'

export class OrderItemTable1705040899555 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS order_itens(
          id VARCHAR(150) PRIMARY KEY DEFAULT REPLACE(uuid_generate_v4()::TEXT,'-',''),
          order_id VARCHAR NOT NULL,
          product_id VARCHAR NOT NULL,
          quantity INT NOT NULL,
          CONSTRAINT fk_order_item FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE NO ACTION ON DELETE CASCADE,
          CONSTRAINT fk_product_item FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE NO ACTION ON DELETE CASCADE
        );
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('order_itens')
    }
}

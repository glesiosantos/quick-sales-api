import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddPriceColumnOrderItemTable1705245752907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE order_itens ADD COLUMN price DECIMAL(10,2) NOT NULL DEFAULT '0.0';
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE order_itens DROP COLUMN price;
    `)
  }
}

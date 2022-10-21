import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrdersProducts1665994292221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name: 'orders_products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'quantity',
                    type: 'int',
                },
                {
                    name: 'created_at',
                    type: 'timeStamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timeStamp',
                    default: 'now()'
                }
            ]
        }))
    }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders_products')
    }

}

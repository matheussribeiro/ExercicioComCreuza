import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCategoryIdToTransaction1621641913087 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
        'transaction',
        new TableColumn({
            name:'category_id',
            type:'uuid',
            isNullable:true,
        }),
    );

    await queryRunner.createForeignKey(
        'transaction',
        new TableForeignKey({
            columnNames:['category_id'],
            referencedColumnNames:['id'],
            referencedTableName:'category',
            name:'TransactionCategory',
            onUpdate:'CASCADE',
            onDelete:'SET NULL',
        }),
    )
}

public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('transaction','TransactionCategory');
    await queryRunner.dropColumn('transaction','category_id');
}
}

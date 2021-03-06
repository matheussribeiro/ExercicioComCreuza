import {MigrationInterface, QueryRunner , Table} from "typeorm";

export class CreateCategory1621641809152 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
        new Table({
            name:'category',
            columns:[
                {
                    name:'id',
                    type:'uuid',
                    isPrimary:true,
                    generationStrategy:'uuid',
                    default:'uuid_generate_v4()',
                },
                {
                    name:'title',
                    type:'varchar',
                },
                {
                    name:'created_at',
                    type:'timestamp',
                    default:'now()',
                },
                {
                    name:'updated_at',
                    type:'timestamp',
                    default:'now()',
                }
            ]

        })
    )
 }

 public async down(queryRunner: QueryRunner): Promise<any> {
     await queryRunner.dropTable('category');

 }
}

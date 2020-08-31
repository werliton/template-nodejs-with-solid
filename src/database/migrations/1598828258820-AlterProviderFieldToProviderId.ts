/* eslint-disable class-methods-use-this */
import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';
import { query } from 'express';

export default class AlterProviderFieldToProviderId1598828258820 implements MigrationInterface {
    private tableName = 'appointments'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn(this.tableName, 'provider');

      await queryRunner.addColumn(this.tableName,
        new TableColumn(
          {
            name: 'provider_id',
            type: 'uuid',
            isNullable: true,
          },
        ));

      await queryRunner.createForeignKey(this.tableName,
        new TableForeignKey(
          {
            name: 'AppointmentProvider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    // Desfazer tudo na ordem oposta
      await queryRunner.dropForeignKey(this.tableName, 'AppointmentProvider');

      await queryRunner.dropColumn(this.tableName, 'provider_id');

      await queryRunner.addColumn(this.tableName,
        new TableColumn(
          {
            name: 'provider',
            type: 'varchar',
          },
        ));
    }
}

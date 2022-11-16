import { QueryTypes, Sequelize } from 'sequelize';

export class CustomSequelize extends Sequelize {
  async getDatabases() {
    const databases = [];
    const data = await this.query<{ Database: string }>('SHOW DATABASES', { type: QueryTypes.SELECT });

    if (data) {
      for (const database of data) {
        databases.push(database.Database);
      }
    }

    return databases;
  }

  async getTables(database: string) {
    const tables = [];
    const data = await this.query<{ [key: string]: string }>('SHOW TABLES FROM ' + database, {
      type: QueryTypes.SELECT,
    });

    if (data) {
      for (const table of data) {
        tables.push(table['Tables_in_' + database]);
      }
    }

    return tables;
  }
}

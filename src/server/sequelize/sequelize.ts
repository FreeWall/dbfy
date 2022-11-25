import { SqlQuery } from '@/models/sql/query';
import { QueryTypes, Sequelize } from 'sequelize';

export class CustomSequelize extends Sequelize {
  public queryWrapper(query: string, type: QueryTypes): Promise<{ data: unknown[]; query: SqlQuery }>;
  public queryWrapper<T>(query: string, type: QueryTypes.SELECT): Promise<{ data: T[]; query: SqlQuery }>;

  async queryWrapper(query: string, type: QueryTypes) {
    const _query: SqlQuery = {
      value: query,
    };

    const data = await this.query(query, {
      type: type,
      logging: (sql, timing) => {
        _query.timing = timing;
      },
    });

    return { data, query: _query };
  }

  async getDatabases() {
    const databases = [];
    const data = await this.query<{ Database: string }>('SHOW DATABASES', {
      type: QueryTypes.SELECT,
    });

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

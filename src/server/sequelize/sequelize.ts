import { Credentials } from '@/types/credentials';
import { QueryTypes, Sequelize } from 'sequelize';

export async function getSequelize(credentials: Credentials) {
  const sequelize = new CustomSequelize({
    dialect: 'mysql',
    host: credentials.host,
    port: credentials.port,
    username: credentials.username,
    password: credentials.password,
  });

  await sequelize.authenticate();

  return sequelize;
}

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

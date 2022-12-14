import { Credentials } from '@/types/credentials';
import { CustomSequelize } from './sequelize';

export async function initSequelize(credentials: Credentials) {
  const sequelize = new CustomSequelize({
    host: credentials.host,
    port: credentials.port,
    username: credentials.user,
    password: credentials.pass,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    dialectOptions: {
      connectTimeout: 3000,
    },
  });

  await sequelize.authenticate();

  return sequelize;
}

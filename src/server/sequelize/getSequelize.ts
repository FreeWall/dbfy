import { Credentials } from '@/types/credentials';
import { CustomSequelize } from './sequelize';

export async function getSequelize(credentials: Credentials) {
  const sequelize = new CustomSequelize({
    host: credentials.host,
    port: credentials.port,
    username: credentials.user,
    password: credentials.pass,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 3000,
    },
  });

  await sequelize.authenticate();

  return sequelize;
}

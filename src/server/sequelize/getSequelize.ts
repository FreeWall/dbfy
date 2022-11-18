import { Credentials } from '@/types/credentials';
import { CustomSequelize } from './sequelize';

export async function getSequelize(credentials: Credentials) {
  const sequelize = new CustomSequelize({
    host: credentials.h,
    port: credentials.p,
    username: credentials.u,
    password: credentials.pw,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 3000,
    },
  });

  await sequelize.authenticate();

  return sequelize;
}

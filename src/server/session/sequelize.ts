import { IronSession } from 'iron-session';
import { Sequelize } from 'sequelize';

export async function getSequelize(session: IronSession) {
  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: session.credentials.host,
    port: session.credentials.port,
    username: session.credentials.username,
    password: session.credentials.password,
  });

  try {
    await sequelize.authenticate();
  } catch (error) {
    session.destroy();
  }

  return sequelize;
}

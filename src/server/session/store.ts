import { IronSession } from 'iron-session';
import { Sequelize } from 'sequelize';

const sessionStores: { [key: string]: SessionStore } = {};

export function getSessionStore(session: IronSession): SessionStore {
  if (!sessionStores.hasOwnProperty(session.uniqueId)) {
    sessionStores[session.uniqueId] = {};
  }

  return sessionStores[session.uniqueId] as SessionStore;
}
export interface SessionStore {
  sequelize?: Sequelize;
}

import { IronSession } from 'iron-session';
import { CustomSequelize } from '../sequelize/sequelize';

const sessionStores: { [key: string]: SessionStore } = {};

export function getSessionStore(session: IronSession): SessionStore {
  if (!sessionStores.hasOwnProperty(session.id)) {
    sessionStores[session.id] = {};
  }

  return sessionStores[session.id] as SessionStore;
}

export interface SessionStore {
  sequelize?: CustomSequelize;
}

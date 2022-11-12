import { z } from 'zod';

export interface Credentials {
  host: string;
  port: number;
  username: string;
  password: string;
}

export const CredentialsZod = z.object({
  host: z.string(),
  port: z.number().default(3306),
  username: z.string(),
  password: z.string(),
});

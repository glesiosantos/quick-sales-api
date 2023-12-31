import { DataSource } from 'typeorm'
import env from './env'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.hostDb,
  port: env.portDb,
  username: env.usernameDb,
  password: env.passwdDb,
  database: env.dbName,
  entities: ['./src/modules/**/models/*.{ts,js}'],
  // subscribers: [],
  migrations: ['./src/modules/**/migrations/*.{ts,js}']
})

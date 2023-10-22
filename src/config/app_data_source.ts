import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '102030',
  database: 'quicksalesdb',
  entities: ['./src/modules/**/models/*.{ts,js}'],
  // subscribers: [],
  migrations: ['./src/modules/**/migrations/*.{ts,js}']
})

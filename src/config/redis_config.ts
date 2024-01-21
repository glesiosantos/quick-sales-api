import { RedisOptions } from 'ioredis'
import env from './env'

interface RedisConfig {
  config: {
    redis: RedisOptions
  }
  drive: string
}

export default {
  config: {
    redis: {
      host: env.redisHost,
      port: env.redisPort,
      password: env.redisPass
    }
  },
  driver: 'redis'
} as unknown as RedisConfig

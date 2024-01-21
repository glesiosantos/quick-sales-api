import Redis, { Redis as RedisClient } from 'ioredis'
import cacheConfig from '@config/redis_config'

export default class RedisCache {
  private readonly client: RedisClient

  constructor() {
    this.client = new Redis(cacheConfig.config.redis)
  }

  public async saveCache(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value)) // convertendo o valor de objeto para string
  }

  public async recoverCache<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)

    if (!data) {
      return null
    }

    return JSON.parse(data) as T // convertendo para  objeto
  }

  public async removeCache(key: string): Promise<void> { // invalid cache
    await this.client.del(key)
  }
}

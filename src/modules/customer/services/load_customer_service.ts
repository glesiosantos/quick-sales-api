import { AppDataSource } from '@config/app_data_source'
import { Customer } from '../models/customer'
import RedisCache from '@shared/cache/redis_cache'

export class LoadCustomerService {
  async load(): Promise<Customer[]> {
    const customerRepository = AppDataSource.getRepository(Customer)
    // const customers = await customerRepository.find({})

    const redisCacheProduct = new RedisCache()
    let customers = await redisCacheProduct.recoverCache<Customer[]>('API_QS_CUSTOMERS')

    if (!customers) {
      customers = await customerRepository.createQueryBuilder('customers').take(20).getMany()
      await redisCacheProduct.saveCache('API_QS_CUSTOMERS', customers)
    }

    return customers ?? null
  }
}

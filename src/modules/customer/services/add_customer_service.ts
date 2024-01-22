import { AppDataSource } from '@config/app_data_source'
import { Customer } from '../models/customer'
import RedisCache from '@shared/cache/redis_cache'

type AddCustomerModel = {
  name: string
  phone: string
}

export class AddCustomerService {
  async add(data: AddCustomerModel): Promise<void> {
    const customerRepository = AppDataSource.getRepository(Customer)
    const redisCacheProduct = new RedisCache()
    await redisCacheProduct.removeCache('API_QS_CUSTOMERS')
    const customer = customerRepository.create({ name: data.name, phone: data.phone })
    await customerRepository.save(customer)
  }
}

import { AppDataSource } from '@config/app_data_source'
import { Customer } from '../models/customer'

export class LoadCustomerByPhoneService {
  async load(phone: string): Promise<Customer | null> {
    const customerRepository = AppDataSource.getRepository(Customer)
    const customer = await customerRepository.findOneBy({ phone })
    return customer ?? null
  }
}

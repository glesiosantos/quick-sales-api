import { AppDataSource } from '@config/app_data_source'
import { Customer } from '../models/customer'

export class LoadCustomerService {
  async load(): Promise<Customer[]> {
    const customerRepository = AppDataSource.getRepository(Customer)
    const customers = await customerRepository.find({})
    return customers ?? null
  }
}

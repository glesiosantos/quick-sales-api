import { AppDataSource } from '@config/app_data_source'
import { Customer } from '../models/customer'

export class LoadCustomerService {
  async load(): Promise<Customer[]> {
    const customerRepository = AppDataSource.getRepository(Customer)
    // const customers = await customerRepository.find({})
    const customers = await customerRepository.createQueryBuilder('customers').take(20).getMany()
    return customers ?? null
  }
}

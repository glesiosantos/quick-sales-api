import { AppDataSource } from '@config/app_data_source'
import { Customer } from '../models/customer'

type AddCustomerModel = {
  name: string
  phone: string
}

export class AddCustomerService {
  async add(data: AddCustomerModel): Promise<void> {
    const customerRepository = AppDataSource.getRepository(Customer)
    const customer = customerRepository.create({ name: data.name, phone: data.phone })
    await customerRepository.save(customer)
  }
}

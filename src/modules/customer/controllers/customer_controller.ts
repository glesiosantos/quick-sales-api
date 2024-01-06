import { Request, Response } from 'express'
import { AddCustomerService } from '../services/add_customer_service'
import { LoadCustomerService } from '../services/load_customer_service'
import { LoadCustomerByPhoneService } from '../services/load_customer_by_phone_service'

export class CustomerController {
  async addCustomer(request: Request, response: Response): Promise<Response> {
    const addCustomerService = new AddCustomerService()
    await addCustomerService.add(request.body)
    return response.status(201).end()
  }

  async loadCustomer(request: Request, response: Response): Promise<Response> {
    const loadCustomerService = new LoadCustomerService()
    const customers = await loadCustomerService.load()
    return response.json(customers)
  }

  async loadCustomerByPhone(request: Request, response: Response): Promise<Response> {
    const loadCustomerService = new LoadCustomerByPhoneService()
    const customer = await loadCustomerService.load(request.params.phone)
    return response.json(customer)
  }
}

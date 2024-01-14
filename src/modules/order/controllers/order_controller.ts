import { Request, Response } from 'express'
import { AddOrderService } from '../service/add_order_service'
import { LoadAllOrderService } from '../service/load_all_order_service'
import { LoadOrderByCustomerService } from '../service/load_order_by_customer'
import { RemoveOrderService } from '../service/remove_order_service'

export class OrderController {
  async saveOrder(request: Request, response: Response): Promise<Response> {
    const addOrderService = new AddOrderService()
    await addOrderService.add(request.body)
    return response.status(201).end()
  }

  async deleteOrders(request: Request, response: Response): Promise<Response> {
    const removeOrderService = new RemoveOrderService()
    console.log(request.params.id)
    await removeOrderService.removeOrder(request.params.id)
    return response.status(204).end()
  }

  async loadAllOrders(request: Request, response: Response): Promise<Response> {
    const loadAllOrderService = new LoadAllOrderService()
    const orders = await loadAllOrderService.loadAll()
    return response.json(orders)
  }

  async loadOrderByCustomer(request: Request, response: Response): Promise<Response> {
    const loadOrderByCustomerService = new LoadOrderByCustomerService()
    const customerOrder = await loadOrderByCustomerService.show(request.params.customer)
    return response.json(customerOrder)
  }
}

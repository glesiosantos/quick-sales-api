import { Request, Response } from 'express'
import { AddOrderService } from '../service/add_order_service'

export class OrderController {
  async saveOrder(request: Request, response: Response): Promise<Response> {
    const addOrderService = new AddOrderService()
    await addOrderService.add(request.body)
    return response.status(201).end()
  }
}

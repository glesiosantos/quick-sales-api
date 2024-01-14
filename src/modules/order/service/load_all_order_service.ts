import { AppDataSource } from '@config/app_data_source'
import { Order } from '../models/order'

export class LoadAllOrderService {
  async loadAll(): Promise<Order[]> {
    const orderRepository = AppDataSource.getRepository(Order)
    const orders = await orderRepository.find({
      relations: {
        customer: true,
        itens: true
      }
    })
    return orders ?? null
  }
}

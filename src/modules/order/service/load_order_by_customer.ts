import { AppDataSource } from '@config/app_data_source'
import { Order } from '../models/order'

export class LoadOrderByCustomerService {
  async show(idCustomer: string): Promise<Order[]> {
    const orderRepository = AppDataSource.getRepository(Order)
    const orders = await orderRepository.find({
      relations: {
        customer: true,
        itens: true
      },
      where: {
        id: idCustomer
      }
    })
    return orders ?? null
  }
}

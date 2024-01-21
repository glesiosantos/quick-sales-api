import { AppDataSource } from '@config/app_data_source'
import { Order } from '../models/order'
import AppError from '@shared/errors/app_error'
import { In } from 'typeorm'
import ProductModel from '@modules/product/models/product'

export class ConvertBudgetInOrderService {
  async closeOrder(idOrder: string): Promise<Order | null> {
    const orderRepository = AppDataSource.getRepository(Order)
    const productRepository = AppDataSource.getRepository(ProductModel)
    const order = await orderRepository.findOne({
      where: { id: idOrder },
      relations: {
        itens: {
          item: true
        }
      }
    })

    if (!order) {
      throw new AppError('Order Not found')
    }

    const productIds = order.itens.map(item => item.item.id)
    const products = await productRepository.find({ where: { id: In(productIds) } })
    order.itens.map(async item => {
      const currencyStoque = products.filter(p => p.id === item.item.id)[0].quantity - item.quantity
      await productRepository.createQueryBuilder().update(ProductModel)
      .where({ id: item.item.id })
      .set({ quantity: currencyStoque }).execute()
    })

    await orderRepository.createQueryBuilder()
    .update(Order)
    .where({ id: order.id })
    .set({ isBudget: false }).execute()

    const result = await orderRepository.findOne({
      where: { id: idOrder },
      relations: {
        itens: {
          item: true
        }
      }
    })

    return result ?? null
  }
}

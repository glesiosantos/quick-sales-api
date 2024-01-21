import { In } from 'typeorm'
import { AppDataSource } from '@config/app_data_source'
import { Order } from '../models/order'
import AppError from '@shared/errors/app_error'
import ProductModel from '@modules/product/models/product'

export class RemoveOrderService {
  async removeOrder(idOrder: string): Promise<void> {
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
    const productIds = order.itens.map(i => i.item.id)

    if (!productIds) {
      throw new AppError('Not products')
    }

    const products = await productRepository.find({ where: { id: In(productIds) } })
    // retornar a quantidade para o estoque
    products.map(async p => {
      const newQuantity = order.itens.filter(i => i.item.id === p.id)[0].quantity + p.quantity
      console.log('new ', newQuantity)
      await productRepository.createQueryBuilder().update(ProductModel)
      .where({ id: p.id })
      .set({
        quantity: newQuantity
      }).execute()
    })

    await orderRepository.createQueryBuilder().delete().from(Order).where({ id: order.id }).execute()
  }
}

import { AppDataSource } from '@config/app_data_source'
import { Customer } from '@modules/customer/models/customer'
import { In } from 'typeorm'
import AppError from '@shared/errors/app_error'
import ProductModel from '@modules/product/models/product'
import { Order } from '../models/order'
import { OrderItem } from '../models/order_item'

type ItemModel = {
  productId: string
  quantity: number
}

type AddOrderModel = {
  customerId: string
  isBudget: boolean
  items: ItemModel[]
}

export class AddOrderService {
  async add(data: AddOrderModel): Promise<void> {
    const orderRepository = AppDataSource.getRepository(Order)
    const productRepository = AppDataSource.getRepository(ProductModel)
    const itemRepository = AppDataSource.getRepository(OrderItem)
    const customerRepository = AppDataSource.getRepository(Customer)

    const customer = await customerRepository.findOneBy({ id: data.customerId })

    if (!customer) { throw new AppError('Customer not found') }

    if (data.items.length < 0) { throw new AppError('There are not items in the order') }

    // busca os productos no banco
    const productIds = data.items.map(p => p.productId)
    const products = await productRepository.find({ where: { id: In(productIds) } })

    // se não for um orçamento - não debitar no banco, so registra a ordem
    if (!data.isBudget) {
      // atualizar estoque
      data.items.map(async item => {
        const currencyStoque = products.filter(p => p.id === item.productId)[0].quantity - item.quantity
        await productRepository.createQueryBuilder().update(ProductModel).where({ id: item.productId }).set({ quantity: currencyStoque }).execute()
      })
    }

    // registar a ordem
    const order = await orderRepository.save({ customer, itens: products })
    products.map(async p => await itemRepository.save({
      item: p,
      quantity: data.items.filter(i => i.productId === p.id)[0].quantity,
      price: p.price,
      order
    }))
  }
}

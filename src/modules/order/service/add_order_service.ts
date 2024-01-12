import { AppDataSource } from '@config/app_data_source'
import { Customer } from '@modules/customer/models/customer'
import AppError from '@shared/errors/app_error'
import ProductModel from '@modules/product/models/product'
import { In } from 'typeorm'
import { Order } from '../models/order'

type ItemModel = {
  productId: string
  quantity: number
}

type AddOrderModel = {
  customerId: string
  items: ItemModel[]
}

export class AddOrderService {
  async add(data: AddOrderModel): Promise<void> {
    const orderRepository = AppDataSource.getRepository(Order)
    const productRepository = AppDataSource.getRepository(ProductModel)
    // const itemRepository = AppDataSource.getRepository(OrderItem)
    const customerRepository = AppDataSource.getRepository(Customer)

    const customer = await customerRepository.findOneBy({ id: data.customerId })

    console.log(customer)

    if (!customer) { throw new AppError('Customer not found') }

    if (data.items.length < 0) { throw new AppError('There are not items in the order') }

    // busca os productos no banco
    const productIds = data.items.map(p => p.productId)
    const products = await productRepository.find({ where: { id: In(productIds) } })

    // se for um orçamento - não debitar no banco, so registra a ordem

    // registar a ordem
    const order = orderRepository.create({ customer, itens: products })

    // const products = data.items.forEach(async product => productRepository.findOneBy({ id: product.productId }))
    console.log(order)
  }
}
